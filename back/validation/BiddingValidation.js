const { body } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'update': {
            return [ 
                body('productID').trim()
                                .not()
                                .isEmpty()
                                .withMessage('productID required')
            ]   
        }
        case 'create': {
            return [ 
                body('name').trim()
                                .not()
                                .isEmpty()
                                .withMessage('productID required'),
                body('price').trim()
                                .not()
                                .isEmpty()
                                .withMessage('price required'),
                body('duration').trim()
                                .not()
                                .isEmpty()
                                .withMessage('duration required')
            ]   
        }
        case 'retrieve': {
            return [ 
                body('pageIndex').trim()
                                .not()
                                .isEmpty()
                                .withMessage('pageIndex required'),
                body('pageSize').trim()
                                .not()
                                .isEmpty()
                                .withMessage('pageSize required'),
            ]   
        }
        case 'create_bidhistory': {
            return [ 
                body('productID').trim()
                                .not()
                                .isEmpty()
                                .withMessage('productID required'),
                body('userID').trim()
                                .not()
                                .isEmpty()
                                .withMessage('userID required'),
            ]   
        }
    }
}