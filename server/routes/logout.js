// DEFINING
const express = require('express')
const app = express.Router()
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt');
const pg = require('pg')
const db = require(__dirname + '/../../Models/database.js')

app.get('/', function (req, res) {
    req.session.destroy(function(error) {
        if(error) {
            throw error;
        }
        res.redirect('index')
        alert("Successfully logged out.");
    })
})

module.exports = app;