const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')


// to get the user from the token and set it

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err){
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge: 1});
                next()
            }else{
                let user = await UserModel.findById(decodedToken.id)
                res.locals.user = user
                console.log(res.locals.user)
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}

// to require auth to redirect
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          res.send(200).json('no token')
        } else {
          next();
        }
      });
    } else {
      res.status(400).send("you dont have the permission")
    }
  };
  