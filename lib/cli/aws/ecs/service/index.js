import fs from 'fs'
import path from 'path'
import ListLocalCli from '../service/list-local'
import CreateCli from '../service/create'
import UpdateCli from '../service/update'
import DeleteCli from '../service/delete'
import DescribeCli from '../service/describe'

const options = {}
options.SERVICE_DIR = path.join(__dirname, '..', '..', '..', '..', '..', 'src', 'services')
options.SERVICE_DEFINITION_FILENAME = 'ecs-service-definition.json'
options.LOCALLY_DEFINED_SERVICES = fs.readdirSync(options.SERVICE_DIR)

export default (program, ecs) => {
  CreateCli(program, ecs, options)
  DeleteCli(program, ecs, options)
  DescribeCli(program, ecs, options)
  UpdateCli(program, ecs, options)
  ListLocalCli(program, options.LOCALLY_DEFINED_SERVICES)
}
