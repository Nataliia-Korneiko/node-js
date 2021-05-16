const path = require('path')
const { promises: fsPromises } = require('fs')

const express = require('express')
const multer = require('multer') // для загрузки файлов (картинок)
const imagemin = require('imagemin') // для оптимизации картинок
const imageminJpegtran = require('imagemin-jpegtran') // для jpeg
const imageminPngquant = require('imagemin-pngquant') // для png
const cloudinary = require('cloudinary').v2 // https://cloudinary.com/
const dotenv = require('dotenv')
// const sharp = require('sharp') // для ресайз картинок

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const PORT = process.env.PORT || 8080

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, 'upload/') // файл сохраняется в папке
    cb(null, 'temp/')
  },
  filename: function (req, file, cb) {
    // console.log('file:', file)
    // const fileInfo = path.parse(file.originalname)
    // console.log('fileInfo:', fileInfo) // { root: '', dir: '', base: 'avatar.png', ext: '.png', name: 'avatar' }
    const { ext } = path.parse(file.originalname)
    cb(null, `${Date.now()}${ext}`) // Date.now() - название файла + ext - расширение файла (.png)
  },
})

// const upload = multer({ dest: 'upload/' }) // upload - название папки
const upload = multer({ storage })

const app = express()

app.use(express.json())
app.use(express.static('upload')) // раздает статику

// single - одна картинка
app.post('/profile', upload.single('userAvatar'), minifyImage, (req, res) => {
  // console.log('file:', req.file)
  // console.log('body:', req.body)

  res.send({ file: req.file, ...req.body })
  // res.status(204).send() // для hw-04
})

async function minifyImage(req, res, next) {
  const [file] = await imagemin([req.file.path], {
    destination: 'upload/', // папка с картинкой после оптимизации (берет из папки temp, оптимизирует и записывает в папку upload)
    plugins: [imageminJpegtran(), imageminPngquant()],
    // progressive: true,
    // arithmetic: true,
  })

  // console.log('files:', files) // destinationPath: 'upload/1621177448920.png', files или [file]

  cloudinary.uploader.upload(file.destinationPath, function (error, result) {
    console.log(result, error)
  })

  // await fsPromises.unlink(req.file.path) // после оптимизации картинки, удаляем ее из папки temp

  next()
}

app.listen(PORT, () => {
  console.log('Server is listening on port:', PORT)
})
