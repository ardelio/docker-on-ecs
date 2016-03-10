import fs from 'fs'
import path from 'path'
import ListLocalCli from '../task/list-local'
import RegisterCli from '../task/register'

const options = {}
options.SERVICE_DIR = path.join(__dirname, '..', '..', '..', '..', '..', 'src', 'services')
options.TASK_DEFINITION_FILENAME = 'ecs-task-definition.json'
options.LOCALLY_DEFINED_SERVICES = fs.readdirSync(options.SERVICE_DIR)

export default (program, ecs) => {
  ListLocalCli(program, options.LOCALLY_DEFINED_SERVICES)
  RegisterCli(program, ecs, options)
}
