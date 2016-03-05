import colors from 'colors'

function info(title, txt) {
  console.log('[INFO]'.bold.green, title);
  console.log(txt);
}

function error(title, txt) {
  console.error('[ERROR]'.bold.red, title);
  console.error(txt);
}

module.exports = {
  info: info,
  error: error
}
