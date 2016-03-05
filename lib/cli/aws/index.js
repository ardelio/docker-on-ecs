import LocalAwsConfig from '../../../aws-config.json'
import EcsCli from './ecs'
import CfCli from './cf'

export default program => {
  CfCli(program, LocalAwsConfig)
  EcsCli(program, LocalAwsConfig)
}
