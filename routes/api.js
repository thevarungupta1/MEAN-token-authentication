const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = "mongodb://admin:admin123@ds163835.mlab.com:63835/mean-auth";
const User = require('../models/user');
const jwt = require('jsonwebtoken')


mongoose.connect(db, err => {
    if(err)
        console.log("Error: "+ err);
    else
        console.log('connect to mongo');
});

router.get('/', (req, res)=>{
    res.send('From api route');
});


router.post('/register', (req, res)=>{
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registerUser)=>{
        if(error)
            console.log(error);
        else{
            res.status(200).send(registerUser);
            //let payload = {subject: registerUser._id}
            //let token = jwt.sign(payload, 'secretKey')
            //res.status(200).send(user); 
            //res.send({token})
        }
    })
});

router.post('/login', (req, res)=>{
    let userData = req.body
    
    User.findOne({email: userData.email}, (error, user)=>{
        if(error)
            {console.log(error)}
        else{
            if(!user){
                res.send(401).send("Invalid email");
            }else if(user.password !== userData.password){
                res.send(401).send("Invalid password");
            }else{
                let payload = {subject: user._id}
                let token = jwt.sign(payload, 'secretKey')
                //res.status(200).send(user); 
                res.send({token})
            }
        }
    });
})



module.exports = router;