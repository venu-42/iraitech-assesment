const express = require('express');
const User = require('../models/userModel')
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')
const AppError = require('../appError');
const router = express.Router();

const generateJWT=(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'30d'})
}


// user registeration
router.post('/signup',async (req, res,next)=>{
    try{
        const {firstname,lastname,email,password,phone,address} = req.body;
        if(!firstname||!lastname||!email||!password||!phone||!address) {
            return next(new AppError(300,'All fields are required!'));
        }
        const newUser = await User.create({firstname,lastname,email,password,phone,address});
        const jwtToken = generateJWT({id:newUser._id})
        res.status(201).json({
            status: 'success',
            token:jwtToken,
            data:{
                user: {
                    name:newUser.firstname+' '+newUser.lastname,
                    email:newUser.email
                }
            }
        });
    }
    catch(err){
        console.log(err);
        // mongo Error: duplicate values are not allowed
        if(err.code === 11000){
            return next(new AppError(400,`Duplicate values are not allowed `))
        }
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
})

// user login using email and password
router.post('/login',async (req, res, next)=>{
    try{
        const {email,password} = req.body ;
        if(!email||!password) {
            return next(new AppError(300,'Email & password are required!'));
        }
        const user = await User.findOne({email}).select('+password');
        
        // console.log(user);
        let isMatched = false;
        if(user){
            isMatched = await bcrypt.compare(password, user.password);
        }  
        if(!user||!isMatched) {
            res.status(401).json({
                status:'unathorized',
                message:'email or password are not correct'
            })
            return ;
        }
        const jwtToken = generateJWT({id:user._id})
        user.password = undefined
        res.status(200).json({
            status:'success',
            token: jwtToken,
            data:{
                user
            }
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
})

router.get('/profile',async (req,res,next)=>{
    const token = req.headers.authorization ;
    // console.log(token)
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(payload.id);
        if(!user) {
            return next(new Error('400','User not found!'));
        }
        user.password = undefined
        res.status(200).json({
            status:'success',
            data:{
                user
            }
        })
    }
    catch(err){
        console.log(err);
        // jwt token is invalid!
        return next(401,'unauthorized');
    }
})

module.exports = router;