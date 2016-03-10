import Logger from '../../../../logger'

export default (program, tasks) => {
  program
    .command('aws:ecs:task:list-local')
    .description('List locally configured tasks')
    .action(() => {
      Logger.info('Locally defined tasks: ', [''].concat(tasks).join('\n • '))
    })
}
