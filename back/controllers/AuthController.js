'use strict'
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const response = require('../utils/response');
const hash = require('../middleware/hash');
const { dtoken, refreshToken } = require('../utils/helpers');
const conn = require('../config/connection'); 
const model_users = require ('../models/users');
const bookshelf = conn.bookshelf;

/*
* POST Login
*/
/**
 * @swagger
 * /api/sign-in:
 *   post:
 *     summary: Login user
 *     tags : [Auth]
 *     description: Login user
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username.
 *                 example: email@example.com
 *               password:
 *                 type: password
 *                 description: Password.
 *                 example: Password1234!
 *     responses:
 *       200:
 *         description: login success
 */
exports.do_login = function(req, res) {
    return new Promise(async function (resolve, reject) {
        // validasi jika username and password kosong
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send(response.ResponseLoginFailure(errors.array()));
        }

        try{
            // validasi username and password
            var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
            var password = MD5(req.body.password);

            var validUser = await model_users.query(function (qb) {
                qb.select()
                qb.where(function() {
                    this.where({username: req.body.username})
                    this.orWhere({email: req.body.username})
                })
            })
            .fetch()
            .then((v)=>{
                return v.toJSON()
            })
            .catch((err)=>{
                console.log(err)
                return false;
            });

            if(!validUser){
                return res.status(400).send(response.ResponseLoginFailure('Username not found!'))
            }

            if(validUser.password !== password){
                return res.status(400).send(response.ResponseLoginFailure('Password is invalid!'))
            }

            // Generate Token
            var exp = Math.floor(Date.now() / 1000) + (60 * 60 * 1);
            var privateKey = hash.privateKeys;

            // token default
            var token = jwt.sign({
                            exp: exp,
                            data: {
                                userID : validUser.userID,
                                username : validUser.username,
                                password : validUser.password,
                                avatar : validUser.avatar,
                                email : validUser.email,
                                balance : validUser.balance
                            }
                        }, privateKey);

            var userData = {
                            userID : validUser.userID,
                            username : validUser.username,
                            password : validUser.password,
                            avatar : validUser.avatar,
                            email : validUser.email,
                            balance : validUser.balance
                        }

            return res.status(200).send(response.ResponseLoginSuccess(userData, token));
        }catch(e){
            return res.status(400).send(response.ResponseLoginFailure('Incorrect email or password'));
        }
    });
}

/*
* POST Register
*/
/**
 * @swagger
 * /api/sign-up:
 *   post:
 *     summary: Register
 *     tags: [Auth]
 *     description: Register new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               confirm_password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               username: yourname
 *               email: email@example.com
 *               password: Password1234!
 *               confirm_password: Password1234!
 *     responses:
*       201:
 *         description: Register success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                       type: boolean
 *                       description: Status respon true or false.
 *                       example: true
 *                 respondeCode : 
 *                       type: string
 *                       example: 201
 *                 message : 
 *                       type: string
 *                       example: Data successfully saved
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: yourname
 *                     email:
 *                       type: string
 *                       example: email@example.com
 *                     balance:
 *                       type: number
 *                       example: 0
 *       400:
 *         description: Data failed to save
 */
exports.do_register = function(req, res) {
    return new Promise(async function (resolve, reject) {
        try{
            // form validation
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send(response.ResponsePOSTFailure(errors.array()));
            }
            /*
            * save database
            */
            var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

            var initialData = {
                    userID : '',
                    username : '',
                    password : '',
                    avatar : '',
                    email : '',
                    balance : '',
                }

                var newObject = {}
                Object.keys(initialData).map((key)=>{
                    if(req.body[key]){
                        if(key === 'password'){
                            newObject[key] = MD5(req.body[key]);
                        }else{
                            newObject[key] = req.body[key]  
                        }
                    }
                });
            //default avatar
            newObject.avatar = '/img/avatars/thumb-1.jpg'

            if(newObject.length === 0){
                return res.status(400).send(response.ResponseGetFailure());
            }

            // insert data
            bookshelf.transaction(async (t) => {
                return new model_users(newObject).save(null, { method: 'insert' }, {transacting: t})
            }).then((library) => {
                var savedData = library.toJSON()
                // Generate Token
                var exp = Math.floor(Date.now() / 1000) + (60 * 60 * 1);
                var privateKey = hash.privateKeys;

                // token default
                var token = jwt.sign({
                                exp: exp,
                                data: {
                                    userID : savedData.userID,
                                    username : savedData.username,
                                    password : savedData.password,
                                    avatar : savedData.avatar,
                                    email : savedData.email,
                                    balance : savedData.balance
                                }
                            }, privateKey);

                var userData = {
                                userID : savedData.userID,
                                username : savedData.username,
                                password : savedData.password,
                                avatar : savedData.avatar,
                                email : savedData.email,
                                balance : savedData.balance
                            }

                return res.status(201).send(response.ResponseLoginSuccess(userData, token));
            }).catch((err) => {
                console.log('error' , err)
                return res.status(400).send(response.ResponsePOSTFailure('Register failed'));
            })
        }catch(e){
            return res.status(400).send(response.ResponseGetFailure());
        }
    })
}

/*
* POST Update Balance
*/
/**
 * @swagger
 * /api/update-balance:
 *   post:
 *     summary: Update user balance
 *     tags : [Auth]
 *     description: Update user balance
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *                 required: true
 *                 example: 1
 *               balance:
 *                 type: number
 *                 required: true
 *                 example: 250
 *     responses:
 *       201:
 *         description: Data successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                       type: boolean
 *                       description: Status respon true or false.
 *                       example: true
 *                 respondeCode : 
 *                       type: string
 *                       example: 201
 *                 message : 
 *                       type: string
 *                       example: Data successfully updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: yourname
 *                     email:
 *                       type: string
 *                       example: email@example.com
 *                     balance:
 *                       type: number
 *                       example: 0
 *       400:
 *         description: Data failed to update
 */
exports.do_update_balance = function(req, res) {
    return new Promise(async function (resolve, reject) {
        try{
            // form validation
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send(response.ResponsePOSTFailure(errors.array()));
            }
    
            if(!req.body.userID){
                return res.status(400).send(response.ResponsePOSTFailure());
            }
            /*
            * save database
            */
            
            var data = { 
                    userID: '',
                    balance: ''
                }
            
            var newObject = {}
            Object.keys(data).map((key)=>{
                if(req.body[key]){
                    newObject[key] = req.body[key]  
                }
            });
            
            if(newObject.length === 0){
                return res.status(400).send(response.ResponsePOSTFailure());
            }

            if(req.body.userID){
                // update data
                bookshelf.transaction((t) => {
                    return new model_users(newObject).save(null, { method: 'update' }, {transacting: t})
                }).then((library) => {
                    return res.status(201).send(response.ResponsePOSTSuccess(library));
                }).catch((err) => {
                    console.log('error' , err)
                    return res.status(400).send(response.ResponsePOSTFailure('Update balance failed'));
                })
            }
        }catch(e){
            return res.status(400).send(response.ResponsePOSTFailure('Update balance failed handap'));
        }
    })
}

/*
* POST Logout
*/
/**
 * @swagger
 * /api/sign-out:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     description: Logout
 *     responses:
 *       201:
 *         description: Logout successful
 *       400:
 *         description: Unable to log out
 */
exports.do_logout = function(req, res) {
    if (req.headers.authorization) {
        var refreshTokenDoc = refreshToken(req)
        if (refreshTokenDoc) {
            return res.status(201).send(response.ResponseLogoutSuccess(refreshTokenDoc));
        }
    } else {
        return res.status(400).send(response.ResponseLogoutFailure('Token not found'))
    }
    
}