const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// User Model: email, mobile, password
// TODO: Add Profile related fields in the model

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

// Fire this function before doc saved to db
// This function encrypts the password before storing in the database
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
 });

// Custom made login function
UserSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email: email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}
 
// ToDo: Password cross verification
 
const User = mongoose.model('user', UserSchema);
 
module.exports = User