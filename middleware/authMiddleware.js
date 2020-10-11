// This file is use to restrict access to resources based on authentication
// This is a middleware and will be used in routes for which we need to restrict the access
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
   const token = req.cookies.jwt;
  
   // check json web token exists and is verified
   if(token) {
       jwt.verify(token, 'secret', (err, decodedToken) => {
           // if token error (maybe due to expired token) redirect to login
           if(err)
           {
               console.log(err.message);
               res.redirect('/login');
           }
           else
           {
               console.log(decodedToken);
               next();
           }
       });
 
   }
   // if no token then definitely redirect to login
   else {
       res.redirect('/login');
   }
};

// Now to use user info we need to check if it is currently in login state
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if(err)
            {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else
            {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else{
        res.locals.user = null;
        next();
    }
  
} 
module.exports = { requireAuth, checkUser };
