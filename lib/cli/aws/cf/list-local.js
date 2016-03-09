import Logger from '../../../logger'

export default (program, stacks) => {
  program
    .command('aws:cf:list-local')
    .description('List locally configured stacks')
    .action(() => {
      Logger.info('Locally defined stacks: ', [''].concat(stacks).join('\n • '))
    })
}
