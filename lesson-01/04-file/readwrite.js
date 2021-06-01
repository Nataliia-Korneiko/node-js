const fs = require('fs');
const file = '../03-internal/path.js';

console.log(__dirname);
console.log(__filename);

fs.readFile(file, (err, data) => {
  if (err) {
    console.error(err.message);
    return;
  }

  // создаст папку temp
  if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp');
  }

  console.log('data:', data);
  console.log('dataUpdated:', data.toString());

  // скопирует файл path.js из 03-internal/path.js + добавит строку 'Successfully updated!'
  fs.writeFile(
    './temp/path.js',
    `${data.toString()}console.log('Successfully updated!')`,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
});
