// const fs = require('fs') // для работы с файлами
const { promises: fsPromises } = require('fs')
const path = require('path') // для работы с путями

start()

// node path.js - в терминале для запуска

async function start() {
  await fsPromises.writeFile('./example.txt', 'Hello!') // относительный путь
  // await fsPromises.writeFile('C:\\data\example.txt', 'Hello') // абсолютный путь
  // await fsPromises.writeFile('/data/example.txt', 'Hello')

  // if (window) {
  //   await fsPromises.writeFile('C:\\data\example.txt', 'Hello')
  // } else {
  //   await fsPromises.writeFile('/data/example.txt', 'Hello')
  // }

  // или:
  // await fsPromises.writeFile(path.join('/data', 'example.txt'))

  console.log(__dirname)
  console.log(__filename)
  // await fsPromises.writeFile(path.join(__dirname, 'example.txt', 'second'))
}
