const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
   email: {
       type: String,
       required: [true, 'Please enter an email'],
       unique: true,
       lowercase: true,
       validate: [ isEmail , 'Please enter a valid email']
   },
   name: {
        type: String,
        required: [true, 'Please enter your name'],
   },
   mobile: {
        type: Number,
        required: [true, 'Please enter your mobile number'],
   },
   password: {
       type: String,
       required: [true, 'Please enter a password'],
       minlength: [6, 'Minimum password length is 6 characters'],
   },
});

// fire a function before doc saved to db
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
 });
 
// ToDo: Password cross verification
 
const User = mongoose.model('user', UserSchema);
 
module.exports = User