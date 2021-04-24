const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
// const commentsRouter = require('./routes/comment.routes');

const PORT = process.env.PORT || 8080;

class Server {
  constructor() {
    this.server = null;
  } // constructor можно не указывать явно, есть дефолтный

  start() {
    this.server = express();
    this.initMiddlewares();
    this.initRoutes();
    this.listen();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: "*",
      })
    );
  }

  initRoutes() {
    this.server.use("/users", userRouter); // используем строку "/users", чтобы удалить ее в user.routes.js
    // this.server.use("/comments", commentsRouter);
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log("Server is listening on port:", PORT);
    });
  }
}

const server = new Server();
server.start();
