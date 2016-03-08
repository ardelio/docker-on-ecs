import AwsCredentials from '../../aws/credentials'
import Logger from '../../../logger'
import poller from '../cf/poller'
import validateStack from '../cf/validate'

const COMMAND_NAME = 'DeleteStack'

export default (program, cf, options) => {
  program
    .command('aws:cf:delete <stackName>')
    .description('Delete the specified stack.')
    .action((stackName, programOptions) => {
      if(validateStack(stackName, options.LOCALLY_DEFINED_STACKS)) {
        AwsCredentials();
        const params = {
          StackName: stackName
        }

        cf
          .deleteStack(params)
          .then(data => {
            Logger.info(COMMAND_NAME, data)
          })
          .then(() => {
            return poller(cf, stackName)
          })
          .then((data) => {
            Logger.info(COMMAND_NAME, `Stack status: ${data}`)
          })
          .catch(e => {
            Logger.error(COMMAND_NAME, e)
            process.exit(1)
          })
      } else {
        Logger.error(COMMAND_NAME, 'Please provide a valid stack name.')
        process.exit(1)
      }
    })
}
