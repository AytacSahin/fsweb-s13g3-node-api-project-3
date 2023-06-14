const express = require('express');
const userRouter = require('./users/users-router')
const server = express();
const { logger } = require('./middleware/middleware');


// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());  //built-in middleware. Globalde kullandık.

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir
server.use('/api/users', logger, userRouter);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
