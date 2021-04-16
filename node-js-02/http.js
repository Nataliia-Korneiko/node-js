const http = require("http");
const PORT = 8080;

const server = http.createServer((request, response) => {
  // console.log("request:", request);
  // console.log("url:", request.url);
  // console.log("method:", request.method);
  // console.log("headers:", request.headers);

  let result = "";

  request.on("data", (data) => {
    // console.log("data:", data);
    result += data;
  });

  // end - приходит последний кусочек данных
  request.on("end", () => {
    response.end(result); // отправляем обратно клиенту
  });
});

server.listen(PORT, () => {
  console.log("Server is listening on PORT:", PORT);
});
