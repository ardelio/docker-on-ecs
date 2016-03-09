import _ from 'lodash'

export default (serviceName, services) => {
  const result = _.find(services, _serviceName => {
    return _serviceName === serviceName
  });
  return typeof result !== 'undefined'
}
