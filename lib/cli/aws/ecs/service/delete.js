import path from 'path'
import AwsCredentials from '../../../aws/credentials'
import Logger from '../../../../logger'
import validateService from '../service/validate'

export default (program, ecs, options) => {
  program
    .command('aws:ecs:service:delete <serviceName>')
    .description('Delete the specified service.')
    .action(serviceName => {
      if(validateService(serviceName, options.LOCALLY_DEFINED_SERVICES)) {
        AwsCredentials();
        const serviceDefinitionFilePath = path.join(options.APP_DIR, serviceName, options.SERVICE_DEFINITION_FILENAME)
        const serviceDefinition = require(serviceDefinitionFilePath)
        const params = {
          cluster: serviceDefinition.cluster,
          service: serviceName
        }

        ecs
          .deleteService(params)
          .then(data => {
            Logger.info('DeleteService', data)
          })
          .catch(e => {
            Logger.error('DeleteService', e)
            process.exit(1)
          })
      } else {
        Logger.error('DeleteService', 'Please provide a valid service name.')
        process.exit(1)
      }
    });
}
