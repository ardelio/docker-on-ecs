import Logger from '../../../../logger'

export default (program, services) => {
  program
    .command('aws:ecs:service:list-local')
    .description('List locally configured services')
    .action(() => {
      Logger.info('Locally defined services: ', [''].concat(services).join('\n • '))
    })
}
