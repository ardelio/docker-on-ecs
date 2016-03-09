import path from 'path'
import AwsCredentials from '../../aws/credentials'
import Logger from '../../../logger'

const COMMAND_NAME = 'DescribeRepositories'

export default (program, ecr) => {
  program
    .command('aws:ecr:describe [repositoryName...]')
    .description('Describe the available EC2 Container Repositories. Provide an optional list of repository names.')
    .action(repositoryName => {
      const params = {}

      if(repositoryName.length > 0) {
        params.repositoryNames = repositoryName
      }

      AwsCredentials();

      ecr
        .describeRepositories(params)
        .then(data => {
          Logger.info(COMMAND_NAME, data)
        })
        .catch(e => {
          Logger.error(COMMAND_NAME, e)
          process.exit(1)
        })
    });
}
