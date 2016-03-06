import CreateCli from '../cluster/create'
import DeleteCli from '../cluster/delete'
import ListLocalCli from '../cluster/list-local'

export default (program, ecs, clusters) => {
  CreateCli(program, ecs, clusters)
  DeleteCli(program, ecs, clusters)
  ListLocalCli(program, clusters)
}
