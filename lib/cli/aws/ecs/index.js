import {Promise} from 'es6-promise'
import AwsPromise from 'aws-es6-promise'
import ClusterCli from './cluster'

export default (program, LocalAwsConfig) => {
  const ecs = new AwsPromise.ECS({
    apiVersion: LocalAwsConfig.sdk.ecs.apiVersion,
    region: LocalAwsConfig.sdk.ecs.region
  })

  ClusterCli(program, ecs, LocalAwsConfig.clusters)
}
