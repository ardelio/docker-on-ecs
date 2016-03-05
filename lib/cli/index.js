import AwsCli from './aws'
import pkg from '../../package.json'
import program from 'commander'
import Logger from '../logger'

program
  .version(pkg.version)

AwsCli(program)

program.on('*', args => {
  const commands = program.commands.map(cmd => cmd.name())

  if (commands.indexOf(args[0]) === -1) {
    Logger.error(('Invalid command: "%s"', args[0]));
    program.outputHelp()
    process.exit(1)
  }
})

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
