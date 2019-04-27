const express = require('express');
const Router = express.Router();
const User = require('../models/user');

userlogin = ""
Router.route('/').get(function (req, res) {
    if (userlogin == "") {
        res.redirect('/login')
    } else {
        User.findById({ _id:userlogin }, function (err, user) {
            console.log(user)
            res.render('none',{firstName : user.firstName , lastName : user.lastName});
        })
    }
});

module.exports = Router;