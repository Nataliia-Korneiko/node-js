// const a = 2;
// module.exports = 2;

// -----------------------
// console.log("inside of dependency");

// -----------------------
// module.exports = {
//   run: () => console.log("inside of dependency"),
// };

// -----------------------
// global.a = 2; // не использовать!!!

// -----------------------
// console.log("process:", process);

// -----------------------
// process.exit(0);
// console.log("process:"); // не выполнится

// -----------------------
// console.log("env:", process.env); // + в терминале: MY_NODE_ENV=development node main.js

// if (process.env.MY_NODE_ENV === "development") {
//   // run test
// } else {
//   // not run test
// }

// -----------------------
// console.log("argv", process.argv); // выводит все аргументы при передаче их в терминале: node main.js 2 5

// -----------------------
// function sum(a, b) {
//   // return a + b; // выводит строку
//   return parseFloat(a) + parseFloat(b); // выводит число (желтый цвет)
// }

// const [, , number1, number2] = process.argv; // пропустит первые 2 переменные
// console.log(sum(number1, number2));

// -----------------------
// console.log("dirname", __dirname); // абсолютный путь к папке
// console.log("filename", __filename); // абсолютный путь к файлу

// -----------------------
// const fs = require("fs"); // работа с файлами

// // const result = fs.writeFileSync();
// fs.writeFile("test.txt", "Hello from my first application!", (err, data) => {
//   console.log("err", err); // null
//   if (err) {
//     console.log("err:", err);
//   }

//   console.log("data:", data); // undefined
// });

// fs.readFile("test.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("err:", err);
//   }
//   console.log("data:", data);
// });

// -----------------------
// const { promises: fsPromises } = require("fs");

// // "utf-8" - для текста
// fsPromises.readFile("test.txt", "utf-8").then((data) => {
//   console.log("data:", data);
// });

// -----------------------
// const { promises: fsPromises } = require("fs");

// async function readMyFile() {
//   const data = await fsPromises.readFile("test.txt", "utf-8");

//   console.log("async await data:", data);
// }

// readMyFile();

// -----------------------
const path = require("path"); // работа с путями к файлам

const filePath = path.join(__filename, "../..", "./node-js", "../..");

// throw new Error("server is down"); // выкидываем ошибку

console.log("filePath:", filePath);
console.log(path.extname(__filename)); // .js
console.log("extension:", path.extname(path.join(__dirname, "test.txt"))); // txt
console.log("extension:", path.extname("./test.txt")); // txt
console.log(path.parse(__filename));

// в терминале для просмотра всех методов: node -> const path = require("path") -> path
// в терминале для выхода: node -> .exit
// в терминале для дебага: node --inspect-brk dependency.js -> в браузере: chrome://inspect -> нажимаем inspect
