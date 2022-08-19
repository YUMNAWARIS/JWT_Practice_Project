const mongoose = require('mongoose');
const {isEmail} = require('validator');
const hashed = require('bcrypt');

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : [true, "Please Enter an email."],
        unique : true,
        lowerCase : true,
        validate : [isEmail, "Please Enter a valid Email"]

    },
    password: {
        type:String ,
        required : [true,"Please enter a Password."],
        minLength : [8,"Password should be 8 character long."]
    }
})
userSchema.pre('save',async function(next){
    const salt = await hashed.genSalt();
    this.password = await hashed.hash(this.password, salt);
    next();
})

// Static methods on UserSchema
userSchema.statics.login = async function(email,pass){
    const user = await this.findOne({email})
    if(user){
        const IsAuth = await hashed.compare(pass,user.password);
        if(IsAuth){
            return user;
        }else{
            throw Error("Password Incorrect");
        }
    }else{
        throw Error("Email Incorrect");
    }
}

const User = mongoose.model("users",userSchema);
module.exports = User;