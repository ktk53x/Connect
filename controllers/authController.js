// This is the controller file and contains authentication backend functions of login, logout, signup
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle errors made by user in filling the form
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

// Token expiry period constant for now
const maxAge = 3 * 24 * 60 * 60; // in seconds
 
// Creating a secret token for the user authentication
const createToken = (id) => {
   return jwt.sign({ id }, 'secret', {
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
      res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}); // in milliseconds
      res.status(201).json(user);
   }
   catch(error)
   {
      const errors = handleErrors(error);
      res.status(400).json({errors});
   }

}

module.exports.loginPost = async (req, res) => {
   const {email, password} = req.body;
  
   try{
       // calling the static login function made in the User model
       const user = await User.login(email, password);
       const token = createToken(user._id);
       res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}); // in milli seconds
       res.status(200).json({user: user});
   }
   catch(err)
   {
       const errors = handleErrors(err);
       res.status(400).json({errors});
   }

}

module.exports.logoutGet = (req, res) => {
   // You cannot delete a cookie so changed its expiry to 1ms which expires very fast
   res.cookie('jwt', '', { maxAge: 1 });
   res.redirect('/');
}