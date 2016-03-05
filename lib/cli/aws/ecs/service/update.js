import path from 'path'
import AwsCredentials from '../../../aws/credentials'
import Logger from '../../../../logger'
import validateService from '../service/validate'

export default (program, ecs, options) => {
  program
    .command('aws:ecs:service:update <serviceName>')
    .description('Update the specified service.')
    .action((serviceName) => {
      if(validateService(serviceName, options.LOCALLY_DEFINED_SERVICES)) {
        AwsCredentials();
        const serviceDefinitionFilePath = path.join(options.APP_DIR, serviceName, options.SERVICE_DEFINITION_FILENAME)
        let params = require(serviceDefinitionFilePath)
        params.service = serviceName

        ecs
          .updateService(params)
          .then((data) => {
            Logger.info('UpdateService', data)
          })
          .catch((e) => {
            Logger.error('UpdateService', e)
            process.exit(1)
          })
      } else {
        Logger.error('UpdateService', 'Please provide a valid service name.')
        process.exit(1)
      }
    });
}
