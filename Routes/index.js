const express       = require('express')
const daba			= require(__dirname + '/../modules/database')
const bodyParser 	= require('body-parser')
const routerLogin   = express.Router()

routerLogin.use(bodyParser.urlencoded({
    extended: true
}))

// get request index page
routerLogin.get('/login', function(request, response){
    response.render('login')
});


//login route
routerLogin.post('/login', (req,res)=>{
    if(req.body.email.length === 0 || req.body.password.length === 0) {
        res.redirect('/login')
        return
    }

    daba.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (user) {
        if (user !== null && request.body.password === user.password) {
            request.session.user = user;
            response.redirect('/profile');
        } else {
            response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
        }
    }, function (error) {
        response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
    });
});


module.exports = routerLogin