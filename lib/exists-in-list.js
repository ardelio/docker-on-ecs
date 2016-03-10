import _ from 'lodash'

export default (element, array) => {
  const result = _.find(array, _element => {
    return _element === element
  });
  return typeof result !== 'undefined'
}
