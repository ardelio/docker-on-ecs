import {Promise} from 'es6-promise'
import Logger from '../../../logger'

const COMPLETE_STATUSES = [
  'CREATE_COMPLETE',
  'DELETE_COMPLETE',
  'UPDATE_COMPLETE',
  'UPDATE_COMPLETE_CLEANUP_IN_PROGRESS',
  'UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS'
]

const FAILED_STATUSES = [
  'DELETE_FAILED',
  'ROLLBACK_COMPLETE',
  'ROLLBACK_FAILED',
  'UPDATE_ROLLBACK_COMPLETE',
  'UPDATE_ROLLBACK_FAILED',
]

const TEN_SECONDS = 10 * 1000

function pollUntilAvailable(cf, stackName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cf
        .describeStacks({ StackName: stackName })
        .then(data => {
          const status = data.Stacks[0].StackStatus
          if (COMPLETE_STATUSES.indexOf(status) >= 0) {
            Logger.info('Success', `{ StackStatus: ${status}}`)
            resolve(true)
          } else if (FAILED_STATUSES.indexOf(status) >= 0) {
            Logger.error('Failure', `{ StackStatus: ${status}}`)
            reject(new Error(status))
          } else {
            Logger.info('Polling', `{ StackStatus: ${status}}`)
            resolve(pollUntilAvailable(cf, stackName))
          }
        })
    }, TEN_SECONDS)
  })
}

export default pollUntilAvailable
