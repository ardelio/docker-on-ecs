import colors from 'colors'

function info(title, txt) {
  console.log(colors.bold.green('[INFO]'), title);
  console.log(txt);
}

function error(title, txt) {
  console.error(colors.bold.red('[ERROR]'), title);
  console.error(txt);
}

module.exports = { info, error }
