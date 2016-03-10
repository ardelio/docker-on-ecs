import AwsCredentials from '../../../aws/credentials'
import Logger from '../../../../logger'
import existsInList from '../../../../exists-in-list'

export default (program, ecs, clusters) => {
  program
    .command('aws:ecs:cluster:delete <clusterName>')
    .description('Delete the specified cluster.')
    .action(clusterName => {
      if(existsInList(clusterName, clusters)) {
        AwsCredentials();
        const params = { cluster: clusterName }
        ecs
          .deleteCluster(params)
          .then(data => {
            Logger.info('DeleteCluster', data)
          })
          .catch(e => {
            Logger.error('DeleteCluster', e)
            process.exit(1)
          })
      } else {
        Logger.error('DeleteCluster', 'Please provide a valid cluster name.')
        process.exit(1)
      }
    });
}
