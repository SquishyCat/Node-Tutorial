// index.js
// const _ = require('lodash')

//require('./app/index')

// _.assign({'a': 1}, {'b': 2}, {'c': 3});

const fs = require('fs')

let content
// try {
//   content = fs.readFileSync('file.md', 'utf-8')
//   console.log('File read ended.')
// } catch (ex) {
//   console.log(ex);
// }
//
// console.log(content)

console.log('start reading a file...')

fs.readFile('file.md', 'utf-8', function(err, content) {
  if (err) {
    console.log('error happened during reading the file')

    return console.log(err)

  } else {
    console.log('File read ended.')
  }
  console.log(content)
})

console.log('end of the file')
