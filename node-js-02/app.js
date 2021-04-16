// меняем в package.json "start": "nodemon http.js" -> "start": "nodemon app.js"
const express = require("express");
const PORT = 8080;

const server = express();

// server.get("/users", (req, res) => {
//   res.send("Hello from users route!");
// });

// -----------------------
// навесить middleware на все роуты:
// server.use((req, res, next) => {
//   console.log("Hello from common middleware!");
//   res.set("Cookie", "name=Jason");
//   next();
// });

// -----------------------
server.use(express.json()); // готовая middleware, которая получает json и записывает объект в req.body -> console.log("body:", req.body);
server.use(express.static("public")); // готовая middleware, которая раздает все файлы из папки publick
server.use(express.urlencoded()); // готовая middleware, которая позволяет работать с формами, в postman в body ставим x-www-form-urlencoded

server.get(
  "/users",
  (req, res, next) => {
    console.log("Hello from middleware users first!");
    // res.set("Cookie", "name=Jason");
    next();
  },
  (req, res, next) => {
    console.log("Hello from middleware users second!");
    next();
  },
  (req, res) => {
    res.send("Hello from users route!"); // отправляем обратно клиенту
  }
);

server.post("/comments", (req, res) => {
  console.log("body:", req.body);
  res.send(req.body);
});

server.get("/comments", (req, res) => {
  res.send(req.body);
});

server.listen(PORT, () => {
  console.log("Server is listening on PORT:", PORT);
});
