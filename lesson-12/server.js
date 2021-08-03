const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }); // server web socket

const clients = []; // массив всех клиентов, которые подключились к серверу

wss.on('connection', (ws) => {
  const id = clients.length;
  clients[id] = ws;
  console.log(`New connection ${id}`);

  // отправляем сообщение только тому, кто подключился к серверу
  clients[id].send(
    JSON.stringify({
      type: 'hello',
      message: `Hi your id equals ${id}`,
      data: id,
    })
  );

  // отправляем сообщение всем
  clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'info',
        message: `We have new connection ${id}`,
      })
    );
  });

  ws.on('message', (message) => {
    clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'message',
          message: message,
          author: id,
        })
      );
    });
  });

  // закрытие вкладки браузера
  ws.on('close', () => {
    delete clients[id];

    clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: 'info',
          message: `We have lost connection ${id}`,
        })
      );
    });
  });

  ws.on('error', (error) => console.log(error.message));
});

console.log('Started');
