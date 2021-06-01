const path = require('path'); // работа с путями

console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')); // относительный путь
console.log(path.resolve('/foo/bar', './baz')); // абсолютный путь
console.log(path.normalize('/foo/bar//baz/asdf/quux/..')); // нормализация путя
console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\'));
console.log(path.parse('/home/user/dir/file.txt')); // расписать путь
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')); // соединяет пути
console.log(path.sep); // узнать ОС (iOS или Windows)
