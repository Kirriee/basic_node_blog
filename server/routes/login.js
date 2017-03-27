// DEFINING
const express = require('express')
const app = express.Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const pg = require('pg')
const db = require(__dirname + '/../../Models/database.js')

app.get('/', function(request, response){
	response.render('../../views/login.pug')
});


// POST LOGIN WHERE WE CHECK IF THE INPUT FIELDS ARE NOT EMPTY THEN REDIRECT TO PROFILE PAGE
app.post('/', (req,res)=>{
    if(req.body.email.length === 0) {
        res.redirect('/login?message=' + encodeURIComponent("Please fill out your email address."))
        return
    }

    if(req.body.password.length === 0) {
        res.redirect('/login?message=' + encodeURIComponent("Please fill out your password."))
        return
    }

    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then( user => {
        if(user == undefined) {
            res.redirect('/Signup?message=' + encodeURIComponent("Account doesn't excist. Please create one first."))
        }

        bcrypt.compare(req.body.password, user.password, (err) =>{
            if (err) {
                res.redirect('/Login?message=' + encodeURIComponent("Invalid email or password."))
            }
            else {
                req.session.user = user
                res.redirect('/profile')
            }

        })
    })
});

module.exports = app;