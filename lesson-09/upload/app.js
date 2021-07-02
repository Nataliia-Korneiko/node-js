const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const multer = require('multer');
const jimp = require('jimp'); // аналог sharp
require('dotenv').config();

const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR); // временная папка для загруженного файла
const IMG_DIR = path.join(__dirname, 'public', 'images'); // перемещаем картинки в папку images

// cd - callback
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },

  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + '-' + uniqueSuffix);
    cb(null, file.originalname);
  },
});

// const upload = multer({ storage: storage });
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },

  fileFilter: (req, file, cb) => {
    console.log('file:', file);

    // загружаем файл если это картинка
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('avatar'), async (req, res, next) => {
  console.log('req.file:', req.file);
  console.log('req.body:', req.body);

  // autocrop - обрезает картинку
  // cover - центрирует картинку
  if (req.file) {
    const { file } = req;
    const img = await jimp.read(file.path);

    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(file.path); // сохранение изменений
    await fs.rename(file.path, path.join(IMG_DIR, file.originalname)); // переносим картинку в public -> images
  }

  res.redirect('/');
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ err: err.message, status: err.status });
});

const PORT = process.env.PORT || 3000;

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

app.listen(PORT, async () => {
  await createFolderIsNotExist(UPLOAD_DIR);
  await createFolderIsNotExist(IMG_DIR);
  console.log(`Server start on port: ${PORT}`);
});
