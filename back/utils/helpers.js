'use strict'
const jwt = require('jsonwebtoken');
const hash = require('../middleware/hash');
const moment = require('moment');

module.exports = {
	decodeToken : (req) => {
    try {
        const token = req.headers.authorization;
        const secret = hash.privateKeys;
        // decode
        const decoded = jwt.verify(token, secret);  

        return decoded.data
    }catch(e){
      return {};
    }
  },
  refreshToken : (req) => {
    try {
        const token = req.headers.authorization;
        const secret = hash.privateKeys;
        // decode
        const decoded = jwt.verify(token, secret);  

        // Generate Token
        var exp = Math.floor(Date.now() / 1000) + (60 * 60 * 1);
        const payload = {
              exp: exp,
              data: {
                  userID : decoded.userID,
                  username : decoded.username,
                  password : decoded.password,
                  avatar : decoded.avatar,
                  email : decoded.email,
                  balance : decoded.balance
              }
        };
        return jwt.sign(payload, secret);

    }catch(e){
      return {};
    }
  }
};
