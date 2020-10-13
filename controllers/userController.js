module.exports.homeGet = (req, res) => {
    res.render('home');
}

module.exports.profileGet = (req, res) => {
    res.render('profile');
}

module.exports.profilePost = async (req, res) => {

    /*
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
   */
}