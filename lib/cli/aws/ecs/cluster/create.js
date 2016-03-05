import AwsCredentials from '../../../aws/credentials'
import Logger from '../../../../logger'
import validateCluster from '../cluster/validate'

export default (program, ecs, clusters) => {
  program
    .command('aws:ecs:cluster:create <clusterName>')
    .description('Create a cluster with the specified name.')
    .action(clusterName => {
      if(validateCluster(clusterName, clusters)) {
        AwsCredentials();
        const params = { clusterName }
        ecs
          .createCluster(params)
          .then(data => {
            Logger.info('CreateCluster', data)
          })
          .catch(e => {
            Logger.error('CreateCluster', e)
            process.exit(1)
          })
      } else {
        Logger.error('CreateCluster', 'Please provide a valid cluster name.')
        process.exit(1)
      }
    });
}
