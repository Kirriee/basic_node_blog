// DEFINING
const express = require('express')
const app = express.Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const pg = require('pg')
const db = require(__dirname + '/../../Models/database.js')


// POST COMMENT WHERE YOU CAN ADD COMMENTS ON PROFILE PAGE
app.post('/', function(request, response){
    db.Comment.create({
        body: request.body.body,
		postId: request.body.postId,
		userId: request.session.user.id
    } 
    ).then(function(){
        response.redirect("/profile");
    })
});


// POST COMMENTS WHERE YOU CAN ADD COMMENTS ON POSTS PAGE
app.post('/', function(request, response){
	db.Comment.create({
        body: request.body.body,
		postId: request.body.postId,
		userId: request.session.user.id
    } 
    ).then(function(){
        response.redirect("/posts");
    })
});




module.exports = app;