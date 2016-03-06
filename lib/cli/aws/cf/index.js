import path from 'path'
import fs from 'fs'
import AwsPromise from 'aws-es6-promise'
import CreateCli from '../cf/create'
import DeleteCli from '../cf/delete'
import UpdateCli from '../cf/update'

const options = {}
options.STACKS_DIR = path.join(__dirname, '..', '..', '..', '..', 'src', 'stacks')
options.CLOUDFORMATION_FILENAME = 'cf.json'
options.LOCALLY_DEFINED_STACKS = fs.readdirSync(options.STACKS_DIR)

export default (program, LocalAwsConfig) => {
  const cf = new AwsPromise.CloudFormation({
    apiVersion: LocalAwsConfig.sdk.cf.apiVersion,
    region: LocalAwsConfig.sdk.cf.region
  })

  CreateCli(program, cf, options)
  DeleteCli(program, cf, options)
  UpdateCli(program, cf, options)
}
