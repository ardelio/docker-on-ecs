import path from 'path'
import AwsCredentials from '../../../aws/credentials'
import Logger from '../../../../logger'
import existsInList from '../task/validate'

const COMMAND_NAME = 'RegisterTask'

export default (program, ecs, options) => {
  program
    .command('aws:ecs:task:register <taskName>')
    .description('Register a task definition with the specified name.')
    .action(taskName => {
      if(existsInList(taskName, options.LOCALLY_DEFINED_SERVICES)) {
        AwsCredentials();
        const taskDefinitionFilePath = path.join(options.SERVICE_DIR, taskName, options.TASK_DEFINITION_FILENAME)
        const params = require(taskDefinitionFilePath)
        params.family = taskName

        ecs
          .registerTaskDefinition(params)
          .then(data => {
            Logger.info(COMMAND_NAME, data)
          })
          .catch(e => {
            Logger.error(COMMAND_NAME, e)
            process.exit(1)
          })
      } else {
        Logger.error(COMMAND_NAME, 'Please provide a valid task definition name.')
        process.exit(1)
      }
    });
}
