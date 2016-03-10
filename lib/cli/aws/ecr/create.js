import path from 'path'
import AwsCredentials from '../../aws/credentials'
import Logger from '../../../logger'
import existsInList from '../../../exists-in-list'

const COMMAND_NAME = 'CreateRepository'

export default (program, ecr, options) => {
  program
    .command('aws:ecr:create <repositoryName>')
    .description('Create an EC2 Container Repository with the specified name.')
    .action(repositoryName => {
      if(existsInList(repositoryName, options.LOCALLY_DEFINED_APPS)) {
        AwsCredentials();
        const params = { repositoryName }

        ecr
          .createRepository(params)
          .then(data => {
            Logger.info(COMMAND_NAME, data)
          })
          .catch(e => {
            Logger.error(COMMAND_NAME, e)
            process.exit(1)
          })
      } else {
        Logger.error(COMMAND_NAME, 'Please provide a valid Repository name.')
        process.exit(1)
      }
    });
}
