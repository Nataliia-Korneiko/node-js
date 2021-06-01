const fs = require('fs');

console.log('Start'); // 1

setTimeout(() => {
  console.log('setTimeout happened'); // 13
}, 0);

setImmediate(() => {
  console.log('setImmediate happened'); // 14
});

new Promise((resolve) => {
  resolve('Promise happened'); // 8
  process.nextTick(() => console.log('nextTick before')); // 3
}).then(console.log);

Promise.resolve().then(() => console.log('Promise 1 happened')); // 9
Promise.resolve().then(() => console.log('Promise 2 happened')); // 10
Promise.resolve().then(() => console.log('Promise 3 happened')); // 11

process.nextTick(() => console.log('nextTick 1 happened')); // 4
process.nextTick(() => console.log('nextTick 2 happened')); // 5
process.nextTick(() => console.log('nextTick 3 happened')); // 6

new Promise((resolve) => {
  resolve('Promise happened'); // 12
  process.nextTick(() => console.log('nextTick after')); // 7
}).then(console.log);

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('setTimeout in readFile happened'); // 17
  }, 0);

  setImmediate(() => {
    console.log('setImmediate in readFile happened'); // 16 - setImmediate в колбэке выполняется раньше, чем setTimeout
  });
  console.log('File read'); // 15
});

console.log('End'); // 2
