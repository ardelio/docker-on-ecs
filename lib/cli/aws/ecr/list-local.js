import Logger from '../../../logger'

export default (program, repositories) => {
  program
    .command('aws:ecr:list-local')
    .description('List locally configured repositories')
    .action(() => {
      Logger.info('Locally defined repositories: ', [''].concat(repositories).join('\n • '))
    })
}
