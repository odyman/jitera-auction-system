'use strict'
const jwt = require('jsonwebtoken');
const hash = require('../middleware/hash');

module.exports = {
  isAuth: (req, res, next) => {
    try {
      if(req.headers.authorization){
          const token = req.headers.authorization;
          const secret = hash.privateKeys;
          // decode
          const decoded = jwt.decode(token, secret);
          if(decoded){
            req.user = decoded;
            next();
          }else{
            res.status(401).json({
              status : 401,
              message: 'Token is Invalid Atas'
            });
          }
      }else{
        res.status(401).json({
          status : 401,
          message: 'Token not defined'
        });
      }
    } catch(err) {
      res.status(401).json({
        status : 401,
        message: 'Token is Invalid Bawah'
      });
    }
  }
};
