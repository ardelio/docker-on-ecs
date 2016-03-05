import _ from 'lodash'

export default (clusterName, clusters) => {
  const result = _.find(clusters, _clusterName => {
    return _clusterName === clusterName
  });
  return typeof result !== 'undefined'
}
