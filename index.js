// code away!
require('dotenv').config();
const server = require('./server.js')

const PORT = process.env.PORT || '9090';

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})