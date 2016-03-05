import LocalAwsConfig from '../../../aws-config.json'
import EcsCli from './ecs'

export default program => {
  EcsCli(program, LocalAwsConfig)
}
