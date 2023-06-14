const express = require('express');
const userRouter = require('./users/users-router')
const server = express();
const { logger } = require('./middleware/middleware');


// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());  //built-in middleware. Globalde kullandık.
server.use(logger);

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Merhaba!</h2>`);
});

module.exports = server;
