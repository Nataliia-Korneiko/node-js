CONST PATH = REQUIRE('PATH'); // РАБОТА С ПУТЯМИ

CONSOLE.LOG(PATH.RELATIVE('/DATA/ORANDEA/TEST/AAA', '/DATA/ORANDEA/IMPL/BBB')); // ОТНОСИТЕЛЬНЫЙ ПУТЬ
CONSOLE.LOG(PATH.RESOLVE('/FOO/BAR', './BAZ')); // АБСОЛЮТНЫЙ ПУТЬ
CONSOLE.LOG(PATH.NORMALIZE('/FOO/BAR//BAZ/ASDF/QUUX/..')); // НОРМАЛИЗАЦИЯ ПУТЯ
CONSOLE.LOG(PATH.NORMALIZE('C:\\TEMP\\\\FOO\\BAR\\..\\'));
CONSOLE.LOG(PATH.PARSE('/HOME/USER/DIR/FILE.TXT')); // РАСПИСАТЬ ПУТЬ
CONSOLE.LOG(PATH.JOIN('/FOO', 'BAR', 'BAZ/ASDF', 'QUUX', '..')); // СОЕДИНЯЕТ ПУТИ
CONSOLE.LOG(PATH.SEP); // УЗНАТЬ ОС (IOS ИЛИ WINDOWS)
