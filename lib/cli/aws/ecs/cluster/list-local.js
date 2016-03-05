import Logger from '../../../../logger'

export default (program, clusters) => {
  program
    .command('aws:ecs:cluster:list-local')
    .description('List locally configured clusters')
    .action(() => {
      Logger.info('Locally defined clusters: ', [''].concat(clusters).join('\n • '))
    });
}
