const conn = require('../config/connection');
const bookshelf = conn.bookshelf;

const model_users = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'userID'
});

module.exports = model_users;
