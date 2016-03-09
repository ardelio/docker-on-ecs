import fs from 'fs'
import path from 'path'
import AwsPromise from 'aws-es6-promise'
import CreateCli from '../ecr/create'
import DeleteCli from '../ecr/delete'
import DescribeCli from '../ecr/describe'
import ListLocalCli from '../ecr/list-local'

const options = {}
options.APPS_DIR = path.join(__dirname, '..', '..', '..', '..', 'src', 'apps')
options.LOCALLY_DEFINED_APPS = fs.readdirSync(options.APPS_DIR)

export default (program, LocalAwsConfig) => {
  const ecr = new AwsPromise.ECR({
    apiVersion: LocalAwsConfig.sdk.ecr.apiVersion,
    region: LocalAwsConfig.sdk.ecr.region
  })

  ListLocalCli(program, options.LOCALLY_DEFINED_APPS)
  CreateCli(program, ecr, options)
  DeleteCli(program, ecr, options)
  DescribeCli(program, ecr)
}
