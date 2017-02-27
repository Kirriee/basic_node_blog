const db 			= require(__dirname + '/../modules/database')
const bodyParser 	= require('body-parser')
const express 	    = require('express')
const routerLogout 	= express.Router()

routerLogout.get('/logout', function (req, res) {
    req.session.destroy(function(error) {
        if(error) {
            throw error;
        }
        res.redirect('/')
        alert("Successfully logged out.");
    })
})

module.exports = routerLogout