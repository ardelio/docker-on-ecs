import fs from 'fs'
import path from 'path'
import ListLocalCli from '../service/list-local'

const APP_DIR = path.join(__dirname, '..', '..', '..', '..', '..', 'src', 'services')
const SERVICE_DEFINITION_FILENAME = 'ecs-service-definition.json'
const LOCALLY_DEFINED_SERVICES = fs.readdirSync(APP_DIR)

export default (program, ecs) => {
  ListLocalCli(program, LOCALLY_DEFINED_SERVICES)
}
