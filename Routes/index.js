const express       = require('express')
const db 			= require(__dirname + '/../modules/database')
const bodyParser 	= require('body-parser')
const routerLogin   = express.Router()

routerLogin.use(bodyParser.urlencoded({
    extended: true
}))

// get request index page
routerLogin.get('/', function(request, response){
    response.render('index')
});


//login route
routerLogin.post('/login', (req,res)=>{
    if(req.body.email.length === 0) {
        res.redirect('/login?message=' + encodeURIComponent("Please fill out your email address."))
        return
    }

    if(req.body.password.length === 0) {
        res.redirect('/login?message=' + encodeURIComponent("Please fill out your password."))
        return
    }

    DB.User.findOne({
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
})

module.exports = routerLogin