import _ from 'lodash'
import {Promise} from 'es6-promise'
import moment from 'moment'
import Logger from '../../../logger'

const STATUSES = {
  CREATE_COMPLETE: '✅ ',
  DELETE_COMPLETE: '✅ ',
  UPDATE_COMPLETE: '✅ ',
  CREATE_IN_PROGRESS: '🕒 ',
  DELETE_IN_PROGRESS: '🕒 ',
  UPDATE_COMPLETE_CLEANUP_IN_PROGRESS: '🕒 ',
  UPDATE_IN_PROGRESS: '🕒 ',
  CREATE_FAILED: '❌ ',
  DELETE_FAILED: '❌ ',
  ROLLBACK_COMPLETE: '❌ ',
  ROLLBACK_IN_PROGRESS: '❌ ',
  ROLLBACK_FAILED: '❌ ',
  UPDATE_FAILED: '❌ ',
  UPDATE_ROLLBACK_IN_PROGRESS: '❌ ',
}

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

console.reset = function() {
  return process.stdout.write('\x1bc');
}

function stackActionSucceeded(resourceType, status) {
  return resourceType === 'AWS::CloudFormation::Stack' && COMPLETE_STATUSES.indexOf(status) >= 0
}

function stackActionFailed(resourceType, status) {
  return resourceType === 'AWS::CloudFormation::Stack' && FAILED_STATUSES.indexOf(status) >= 0
}

function pollUntilAvailable(cf, stackName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cf
        .describeStackEvents({ StackName: stackName })
        .then(data => {
          const event = data.StackEvents[0];
          const resourceType = event.ResourceType;
          const status = event.ResourceStatus;
          if (stackActionSucceeded(resourceType, status)) {
            resolve(status);
          } else if (stackActionFailed(resourceType, status)) {
            console.log(`CloudFormation stack [${stackName}] creation failed with status [${status}]`)
            reject(new Error(status));
          } else {
            console.reset();
            Logger.info(`Stack status [${stackName}]:`, moment().format());
            const groupedEvents = _.groupBy(data.StackEvents, 'LogicalResourceId');
            Object.keys(groupedEvents).sort().forEach(id => {
              const e = groupedEvents[id][0];
              console.log(STATUSES[e.ResourceStatus] || e.ResourceStatus, e.LogicalResourceId, `(${e.ResourceType.substring(5)})`);
            });
            resolve(pollUntilAvailable(cf, stackName));
          }
        })
    }, TEN_SECONDS)
  })
}

export default pollUntilAvailable
