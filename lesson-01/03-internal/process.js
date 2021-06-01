console.log(process.execPath); // /usr/local/bin/node
console.log(process.version); // v15.12.0
console.log(process.platform); // darwin
console.log(process.arch); // x64
console.log(process.title); // node
console.log(process.pid); // 93363
console.log(process.cwd()); // /Users/nataliia/Desktop/lesson-01/03-internal
console.log(process.argv); // ['/usr/local/bin/node', '/Users/nataliia/Desktop/lesson-01/03-internal/process.js']

process.on('exit', (code) => {
  console.log('Exit: ' + code); // Exit: 1
});
process.exit(1); // выход из программы, 1 - код ошибки
