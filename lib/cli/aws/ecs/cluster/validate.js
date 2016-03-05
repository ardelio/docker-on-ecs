import _ from 'lodash'

export default (clusterName, clusters) => {
  var result = _.find(clusters, function(_clusterName) {
    return _clusterName === clusterName
  });
  return typeof result !== 'undefined'
}
