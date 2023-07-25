const conn = require('../config/connection');
const bookshelf = conn.bookshelf;

const model_products = bookshelf.Model.extend({
    tableName: 'products',
    idAttribute: 'productID'
});

module.exports = model_products;
