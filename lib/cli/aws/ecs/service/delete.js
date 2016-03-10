import path from 'path'
import AwsCredentials from '../../../aws/credentials'
import Logger from '../../../../logger'
import existsInList from '../../../../exists-in-list'

const COMMAND_NAME = 'DeleteService'

export default (program, ecs, options) => {
  program
    .command('aws:ecs:service:delete <serviceName>')
    .description('Delete the specified service.')
    .action(serviceName => {
      if(existsInList(serviceName, options.LOCALLY_DEFINED_SERVICES)) {
        AwsCredentials();
        const serviceDefinitionFilePath = path.join(options.SERVICE_DIR, serviceName, options.SERVICE_DEFINITION_FILENAME)
        const serviceDefinition = require(serviceDefinitionFilePath)
        const params = {
          cluster: serviceDefinition.cluster,
          service: serviceName
        }

        ecs
          .deleteService(params)
          .then(data => {
            Logger.info(COMMAND_NAME, data)
          })
          .catch(e => {
            Logger.error(COMMAND_NAME, e)
            process.exit(1)
          })
      } else {
        Logger.error(COMMAND_NAME, 'Please provide a valid service name.')
        process.exit(1)
      }
    });
}
