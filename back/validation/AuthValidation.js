const { body } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'login': {
            return [ 
                body('username').trim()
                                .not()
                                .isEmpty()
                                .withMessage('Username required'),
                body('password').trim()
                                .not()
                                .isEmpty()
                                .withMessage('Password required')
            ]   
        }
        case 'register': {
            return [ 
                body('username').trim()
                                .not()
                                .isEmpty()
                                .withMessage('Username required'),
                body('password').trim()
                                .not()
                                .isEmpty()
                                .withMessage('Password required')
            ]   
        }
        case 'update': {
            return [ 
                body('balance').trim()
                                .not()
                                .isEmpty()
                                .withMessage('balance required')
            ]   
        }
    }
}