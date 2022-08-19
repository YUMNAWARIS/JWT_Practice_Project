const { response } = require('express');
const mongoose = require('mongoose')
const User = require('../model/user');
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

const errhandler = require('../utils/errorshandler')
const jwtToken = require('../utils/autherizationToken')

// POST /auth/signup
exports.signup_post = async (req,res)=>{
    const { email, password} = req.body;
    try{
        const user = await User.create({email,password});
        const token = jwtToken.GetToken(user._id);
        res.cookie('jwt',token,{
            httpOnly:true,
            maxAge: 5*24*60*60*1000
        })
        res.status(200).json({user : user._id})
    }catch(error){
        const errors = errhandler.error_handler(error);
        res.status(400).json({errors})
    }
}

// POST /auth/login
exports.login_post = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await User.login(email,password);
        const token = jwtToken.GetToken(user._id);
        res.cookie('jwt',token,{
            httpOnly:true,
            maxAge: 5*24*60*60*1000
        })
        res.status(200).json({user : user._id})
    }catch(error){
        const errors = errhandler.error_handler(error);
        res.status(400).json({errors})
    }
}

// Get /auth/signup
exports.signup_get = (req,res)=>{
    res.render("signup")
}
// Get /auth/login
exports.login_get = (req,res)=>{
    res.render("login")
}


exports.logout = (req,res)=>{
    res.cookie("jwt","",{
        maxAge:1
    })    
    res.redirect('/');

}