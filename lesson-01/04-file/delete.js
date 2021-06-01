const fs = require('fs');

// удаляем файл
fs.unlink('temp/path.js', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  // удаляем папку temp
  fs.rmdir('temp', (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Delete done!');
  });
});
