const conn = require('../config/connection');
const bookshelf = conn.bookshelf;
const products = require('./products');
const users = require('./users');

const model_bidhistory = bookshelf.Model.extend({
    tableName: 'bidhistory',
    idAttribute: 'bidID',
    products() {
        return this.hasMany(products, 'productID', 'productID')
    },
    users() {
        return this.hasMany(users, 'userID', 'userID')
    }
});

module.exports = model_bidhistory;
