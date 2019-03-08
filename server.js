const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postDbRouter = require('./data/helpers/postDb_router');
const userDbRouter = require('./data/helpers/userDb_router');

const server = express();
const securityMiddlewear = helmet();
const loggerMiddlewear = morgan('dev');

const parser = express.json();

server.use(parser, securityMiddlewear, loggerMiddlewear);

server.use('/api/posts', postDbRouter);
server.use('/api/users', userDbRouter);

server.get('/', (req, res) => {
 res.send(`
   <h2>Lambda Node Blog</h2>
   <p>Welcome to the Lambda Node Blog API</p>
   `);
});

module.exports = server;