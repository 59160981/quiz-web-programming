const express = require('express');
const Router = express.Router();
const User = require('../models/user');

Router.route('/').get(function (req, res) {
    User.find(function (err, user) {
        res.render('login', { err: "", user: user });
    })
});

Router.route('/').post(function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username, password: password }, function (err, user) {
        if (!user) {
            console.log('not found')
            res.render('login', { err: "ไม่พบข้อมูล" });
        } else {
            console.log(user.type)
            if (user.type == "admin") {
                userlogin = user._id;
                res.redirect('/admin')
            } else if (user.type == "student") {
                userlogin = user._id;
                res.redirect('/student')
            } else if (user.type == "teacher") {
                userlogin = user._id;
                res.redirect('/teacher')
            } else {
                userlogin = user._id;
                res.redirect('/none')
            }
        }
    });
});

Router.route('/delete/:id').get(function (req, res) {
    User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
        res.redirect('/login');
    })
});

let userEdit = "";
Router.route('/edit/:id').get(function (req, res) {
    User.findById({ _id: req.params.id }, function (err, user) {
        userEdit = user.username;
        res.render('edit', { err: "", user: user })
    })
});

Router.route('/edit/:id').post(function (req, res) {
    // console.log("userEd"+userEdit)
    const username = req.body.username;
    User.find({ username: username }, function (err, userInServer) {
        // console.log("userin"+userInServer)
        if (userInServer == "" || username == userEdit) {
            User.findById({_id: req.params.id}, function (err, user) {
                user.username = req.body.username;
                user.password = req.body.password;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.type = req.body.type;
                user.save()
                res.redirect('/login')
            })
        } else {
            User.findById({ _id: req.params.id }, function (err, user) {
                res.render('edit', { err: "username นี้ใช้แล้ว", user: user })
            })
            
        }
    })
});
module.exports = Router;