import AWS from 'aws-sdk'
import Logger from '../../logger'

let invocationCount = 0;

module.exports = () => {
  if (invocationCount) {
    Logger.error('Credentials already set.');
    process.exit(1);
  }

  invocationCount++;

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    // Use credentials from environment variables, prefer this for CI
    // environments so credentials don't need to be written to disk
    // console.log('Found AWS credentials in Environment Variables');
    AWS.config.credentials = new AWS.EnvironmentCredentials('AWS');
  } else if (process.env.AWS_PROFILE) {
    // Use credentials from a shared INI file with a profile, good for local
    // environments
    const profile = process.env.AWS_PROFILE;
    AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile })
  } else {
    Logger.error('No credentials found, use AWS_PROFILE or AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY');
    process.exit(1);
  }
};
