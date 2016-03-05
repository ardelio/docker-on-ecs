import _ from 'lodash'

export default (serviceName, services) => {
  var result = _.find(services, function(_serviceName) {
    return _serviceName === serviceName
  });
  return typeof result !== 'undefined'
}
