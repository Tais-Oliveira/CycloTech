const express = require('express');
const { where } = require('sequelize');
const router = express.Router();
const User = require('../models/user');

        router.get('/',(req,res)=>{
            res.render('home');
        });
        
        router.get('/cadastro',(req,res)=>{
            res.render('form');
           
        });
        
        router.get('/login',(req,res)=>{
            res.render('login');
        });
        
            router.post('/login',(req,res)=>{
            User.create({
            email: req.body.email,
            password: req.body.password
               }).then(()=>{
                res.render('login');
           }).catch((error)=>{
                console.log("erro"+error);
           });
        });
          
module.exports = router;
