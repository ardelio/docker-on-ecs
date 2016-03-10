import colors from 'colors'

function info(title, txt) {
  console.log(colors.bold.green('[INFO]'), title);
  if(typeof txt === 'object') txt = JSON.stringify(txt, null, 2)
  console.log(txt);
}

function error(title, txt) {
  console.error(colors.bold.red('[ERROR]'), title);
  if(typeof txt === 'object') txt = JSON.stringify(txt, null, 2)
  console.error(txt);
}

module.exports = { info, error }
