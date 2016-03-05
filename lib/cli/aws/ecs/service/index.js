import fs from 'fs'
import path from 'path'
import ListLocalCli from '../service/list-local'
import CreateCli from '../service/create'
import UpdateCli from '../service/update'
import DeleteCli from '../service/delete'

const options = {}
options.APP_DIR = path.join(__dirname, '..', '..', '..', '..', '..', 'src', 'services')
options.SERVICE_DEFINITION_FILENAME = 'ecs-service-definition.json'
options.LOCALLY_DEFINED_SERVICES = fs.readdirSync(options.APP_DIR)

export default (program, ecs) => {
  ListLocalCli(program, options.LOCALLY_DEFINED_SERVICES)
  CreateCli(program, ecs, options)
  UpdateCli(program, ecs, options)
  DeleteCli(program, ecs, options)
}
