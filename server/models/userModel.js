const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'user firstname is required'],
    },
    lastname:{
        type:String,
        required:[true,'user lastname is required'],
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        select:false
    },
    phone:{
        type:String,
        required:[true,'user phone is required'],
        unique:true
    },
    address:{
        type:String
    }
})

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12);
    next();
})

userSchema.pre(/^find/,async function(next){
    this.select('-__v');
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;