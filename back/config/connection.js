const knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : process.env.DATABASE_URL,
    user     : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_DATABASE,
    port     : process.env.DATABASE_PORT,
    charset  : process.env.DATABASE_CHARSET,
    multipleStatements: true 
  },
  pool: { min: 0, max: 5000 },
  acquireConnectionTimeout: 10000,
  log: {
    warn(message) {
        console.log('warn :  '+message);
    },
    error(message) {
        console.log('error :  '+message);
    },
    deprecate(message) {
        console.log('deprecated :  '+message);
    },
    debug(message) {
        console.log('debug :  '+message);
    },
  } 
});

const bookshelf = require('bookshelf')(knex)

module.exports = {knex, bookshelf};