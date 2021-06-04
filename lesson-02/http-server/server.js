const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const path = require('path');
const querystring = require('querystring');

const TypeMime = {
  '.html': 'text/html',
  '.htm': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.ico': 'image/x-icon',
};

http
  .createServer(async (req, res) => {
    const myURL = url.parse(req.url);
    const pathname = myURL.pathname;
    let filename = pathname.substring(1);

    switch (pathname) {
      case '/':
        filename = 'index.html';
        break;

      case '/contact':
        filename = 'contact.html';
        break;

      case '/blog':
        filename = 'blog.html';
        break;

      default:
        break;
    }

    if (pathname === '/contact' && req.method === 'POST') {
      const body = [];

      // Данные из формы приходят частями и пушаться в массив body
      req.on('data', (chunk) => {
        body.push(chunk);
      });

      req.on('end', async () => {
        const parseBody = decodeURIComponent(Buffer.concat(body).toString()); // собираем все чанки в одно целое и приводим к строке (utf8)
        console.log('parseBody:', parseBody);

        const parseObj = querystring.parse(parseBody);
        console.log('parseObj:', parseObj);

        await fs.writeFile('message.json', JSON.stringify(parseObj, null, 2)); // 2 - это отступ
      });

      res.statusCode = 302; // запрошенный ресурс был временно перемещён по адресу, указанному в заголовке Location
      res.setHeader('Location', '/contact'); // при виде браузером заголовка Location он переходит на этот url
      return res.end(); // закрываем соединение
    }

    const type = TypeMime[path.extname(filename)];

    if (type && type.includes('image')) {
      try {
        const img = await fs.readFile(filename);

        res.writeHead(200, { 'Content-Type': type });
        res.write(img, 'hex');
        res.end();
      } catch (e) {
        console.log(e.message);

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end();
      }
    } else {
      try {
        const content = await fs.readFile(filename, 'utf8');

        res.writeHead(200, { 'Content-Type': type });
        res.write(content);
        res.end();
      } catch (e) {
        console.log(e.message);

        if (!type || type === 'text/html') {
          const content = await fs.readFile('404.html', 'utf8');

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(content);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
        }
        res.end();
      }
    }
  })
  .listen(3000, () => console.log('Listen server on port 3000'));
