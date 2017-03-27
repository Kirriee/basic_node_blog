// DEFINING
const express = require('express')
const app = express.Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const pg = require('pg')
const db = require(__dirname + '/../../Models/database.js')


// get request index page
app.get('/', function(request, response){
    response.render('../../views/index.pug')
});


module.exports = app;