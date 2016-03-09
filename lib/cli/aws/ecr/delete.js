import path from 'path'
import AwsCredentials from '../../aws/credentials'
import Logger from '../../../logger'
import validateRepository from '../ecr/validate'

const COMMAND_NAME = 'DeleteRepository'

export default (program, ecr, options) => {
  program
    .command('aws:ecr:delete <repositoryName>')
    .description('Delete the specified repository.')
    .action(repositoryName => {
      if(validateRepository(repositoryName, options.LOCALLY_DEFINED_SERVICES)) {
        AwsCredentials();
        const params = { repositoryName }

        ecr
          .deleteRepository(params)
          .then(data => {
            Logger.info(COMMAND_NAME, data)
          })
          .catch(e => {
            Logger.error(COMMAND_NAME, e)
            process.exit(1)
          })
      } else {
        Logger.error(COMMAND_NAME, 'Please provide a valid repository name.')
        process.exit(1)
      }
    });
}
