import path from 'path'
import AwsCredentials from '../../../aws/credentials'
import Logger from '../../../../logger'
import validateService from '../service/validate'

export default (program, ecs, options) => {
  program
    .command('aws:ecs:service:create <serviceName>')
    .description('Create a service with the specified name.')
    .action((serviceName) => {
      if(validateService(serviceName, options.LOCALLY_DEFINED_SERVICES)) {
        AwsCredentials();
        const serviceDefinitionFilePath = path.join(options.APP_DIR, serviceName, options.SERVICE_DEFINITION_FILENAME)
        let params = require(serviceDefinitionFilePath)
        params.serviceName = serviceName

        ecs
          .createService(params)
          .then((data) => {
            Logger.info('CreateService', data)
          })
          .catch((e) => {
            Logger.error('CreateService', e)
            process.exit(1)
          })
      } else {
        Logger.error('CreateService', 'Please provide a valid service name.')
        process.exit(1)
      }
    });
}
