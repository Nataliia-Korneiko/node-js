const EventEmitter = require('events');
const fs = require('fs');

class MyEmitter extends EventEmitter {}

const me = new MyEmitter();

me.on('read', (err, data) => {
  const result = data.toUpperCase(); // приведет к верхнему регистру
  me.emit('write', result); // вызов 'write'
});

// создаст файл newpath.js
me.on('write', (data) => {
  fs.writeFile('newpath.js', data, (err) => {
    console.log('Write done!');
  });
});

fs.readFile('../03-internal/path.js', 'utf-8', (err, data) => {
  me.emit('read', err, data); // вызов 'read'
});
