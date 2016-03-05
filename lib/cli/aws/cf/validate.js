import _ from 'lodash'

export default (stackName, stacks) => {
  const result = _.find(stacks, _stackName => {
    return _stackName === stackName
  });
  return typeof result !== 'undefined'
}
