// DEFINING
const express = require('express')
const app = express.Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const pg = require('pg')
const db = require(__dirname + '/../../Models/database.js')


app.get('/', function(request, response){
    response.render('../../views/signup.pug')
});


app.post('/', function(request, response){
    if(request.body.username.length === 0){
        response.redirect('/signup?message=' + encodeURIComponent('Provide your username'))
        return
    }

    if(request.body.email.length === 0){
        response.redirect('/signup?message=' + encodeURIComponent('Provide your last name'))
        return
    }

    if(request.body.password.length === 0) {
        response.redirect('/signup?message=' + encodeURIComponent('Provide a password'))
        return
    }
    if(request.body.password !== request.body.cpassword) {
        response.redirect('/signup?message=' + encodeURIComponent('The passwords you provided are not identical'))
        return
    }
    bcrypt.hash('request.body.password', 8, function(err, hash){
        if (err) throw err    
            db.User.create ({
            userName: request.body.username,
            email: request.body.email,
            password: hash
   	}).then(function(user) {
        request.session.user = user;
        response.redirect("/posts")
		});
    }); 
    console.log("ik doe het")
});

module.exports = app;
