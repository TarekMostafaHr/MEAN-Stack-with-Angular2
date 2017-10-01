const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrybt = require('bcrypt-nodejs');

let emailLengthChecker = (email) =>{
    if(!email){
        return false;
    }else{
        if(email.length < 5 || email.length > 30){
            return false;
        }else{
            return true;
        }
    }
};

let validEmailChecker = (email) =>{
    if(!email){
        return false;
    }else{
        const regExp = new 
        RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        return regExp.test(email);
    }
}

const emailValidators = [{
    validator: emailLengthChecker,
     message: 'Email must be at least 5 characters and not more than 30'},
     {
        validator: validEmailChecker,
        message: 'Must be a valid email'
}]

let userNameLengthChecker = (username)=>{
    if(!username){
        return false;
    }else{
        if(username.length < 3 || username.length > 15){
            return false;
        }else{
            return true;
        }
    }
};

let validUsername = (username) =>{
    if(!username){
        return false;
    }else{
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};

const usernameValidators = [{
    validator: userNameLengthChecker,
    message: 'username must be at least 3 characters and not more than 15 characters'},
    {
        validator: validUsername,
        message: 'You must add a valid username'
}]

let passwordLenghtChecker = (password) =>{
    if(!password){
        return false;        
    }else{
        if(password.length < 8 || password.length > 35){
            return false;
        }else{
            return true;
        }
    }
};

let validPassword = (password)=>{
    if(!password){
        return false;
    }else{
        const regExp = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) // use it for pass validation, Iam not right now for simplicity
        return regExp.test(password);
    }    
};

const passwordValidators = [{
    validator: passwordLenghtChecker,
    message: 'The password should be at least 8 characters and not more than 35'},
    {
        validator: validPassword,
        message: 'Your password should be valid'
}]

const userSchema = new Schema({
email:    {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
username: {type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
password: {type: String, required: true, validate: passwordValidators}
});

userSchema.pre('save', function(next){
    if(!this.isModified('password'))
        return next();
    bcrybt.hash(this.password,null,null,(err,hash)=>{
        if(err) return next(err);
        this.password = hash;
        next();
    });
});

// decrypting the password and compare it to the current password
userSchema.methods.comparePassword= function(password){
    return bcrybt.compareSync(password,this.password);
}
module.exports = mongoose.model('User', userSchema);