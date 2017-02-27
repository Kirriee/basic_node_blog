const express       = require('express')
const daba 			= require(__dirname + '/../modules/database')
const bodyParser 	= require('body-parser')
const routerSignup 	= express.Router()


routerSignup.use(bodyParser.urlencoded({
    extended: true
}))

routerSignup.get('/Signup', function(request, response){
    response.render('Signup')
});

routerSignup.post('/Signup', function(request, response) {
    daba.sync({force: true}).then(function () {
        User.create({
            userName: req.body.username,
            email: req.body.email,
            password: reg.body.password
        }).then(function () {
            var server = app.listen(3000, function () {
                console.log('Example app listening on port: ' + server.address().port);
            });
        });
    },  function (error) {
        console.log('sync failed');
        console.log(error);
    });
})
