import path from 'path'
import AwsCredentials from '../../aws/credentials'
import Logger from '../../../logger'
import validateStack from '../cf/validate'

const COMMAND_NAME = 'CreateStack'

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
    .command('aws:cf:create <stackName>')
    .description('Create a stack with the specified name.')
    .action((stackName, programOptions) => {
      if(validateStack(stackName, options.LOCALLY_DEFINED_STACKS)) {
        AwsCredentials();
        const cloudformationFilePath = path.join(options.STACKS_DIR, stackName, options.CLOUDFORMATION_FILENAME)
        const templateBody = require(cloudformationFilePath)

        const params = {
          StackName: stackName,
          TemplateBody: JSON.stringify(templateBody),
          DisableRollback: false
        }

        if(programOptions.disableRollback) {
          params.DisableRollback = true
        }

        if(programOptions.parameter) {
          params.Parameters = programOptions.parameter
        }

        cf
          .createStack(params)
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
    })
    .option('-d, --disable-rollback', 'Disable Cloud Formation rollback on error.')
    .option('-p, --parameter [key=value]', 'Repeat for each parameter. In the format of -p name=value.', parameters, [])
}