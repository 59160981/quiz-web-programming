const express = require('express');
const Router = express.Router();
const User = require('../models/user');

Router.route('/').get(function (req, res) {
    res.render('register',{err:""})
});

Router.route('/').post(function (req, res) {
    const data = new User(req.body)
    console.log(data)
    User.findOne({username : data.username},function(err,user){
        if(user){
            console.log('have user')
            res.render('register',{err:"มี username นี้แล้วในระบบ"})
        }else{
            data.save();
            res.redirect('/login');
        }
    })
});

module.exports = Router;