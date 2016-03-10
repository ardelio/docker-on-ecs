import path from 'path'
import AwsCredentials from '../../aws/credentials'
import Logger from '../../../logger'
import poller from '../cf/poller'
import existsInList from '../../../exists-in-list'

const COMMAND_NAME = 'UpdateStack'

function parameters(val, params) {
  if(! /\w+\=\w+/.test(val)) {
    throw new Error(`Incorrect parameter format for '-p ${val}'. Should be '-p name=value'.`)
  }
  const [ ParameterKey, ParameterValue ] = val.split('=')
  params.push({ ParameterKey, ParameterValue })
  return params
}

export default (program, cf, options) => {
  program
    .command('aws:cf:update <stackName>')
    .description('Update the specified stack.')
    .action((stackName, programOptions) => {
      if(existsInList(stackName, options.LOCALLY_DEFINED_STACKS)) {
        AwsCredentials();
        const cloudformationFilePath = path.join(options.STACKS_DIR, stackName, options.CLOUDFORMATION_FILENAME)
        const templateBody = require(cloudformationFilePath)

        const params = {
          StackName: stackName,
          Capabilities: [ 'CAPABILITY_IAM' ],
          TemplateBody: JSON.stringify(templateBody)
        }

        if(programOptions.parameter) {
          params.Parameters = programOptions.parameter
        }

        cf
          .updateStack(params)
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
    .option('-d, --disable-rollback', 'Disable Cloud Formation rollback on error.')
    .option('-p, --parameter [key=value]', 'Repeat for each parameter. In the format of -p name=value.', parameters, [])
}
