const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
   let errors = {};
  
   //duplicate error code
   if(err.code === 11000)
   {
       errors.email = 'that email is already registered';
       return errors;
   }
  
   // validation errors
   if(err.message.includes('user validation failed')){
       Object.values(err.errors).forEach(({properties}) => {
           errors[properties.path] = properties.message;
       });
   }
   return errors;
}


const maxAge = 3 * 24 * 60 * 60; // in seconds
 
const createToken = (id) => {
   return jwt.sign({ id }, 'net ninja secret', {
       expiresIn: maxAge
   });
}


module.exports.signupGet = (req, res) => {
   res.render('signup');
}

module.exports.loginGet = (req, res) => {
   res.render('login');
}

module.exports.signupPost = async (req, res) => {
   const {name, mobile, email, password} = req.body;

   try {
      const user = await User.create({email, password, name, mobile});
      const token = createToken(user._id);
       // in milliseconds
      res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
      res.status(201).json(user);
      // res.send('new signup');
   }
   catch(error)
   {
      // console.log(error);
      const errors = handleErrors(error);
      res.status(400).json({errors});
   }

}

module.exports.loginPost = (req, res) => {
   res.send('user login');
}
