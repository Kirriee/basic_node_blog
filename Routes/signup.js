const express       = require('express')
const daba 			= require(__dirname + '/../modules/database')
const bodyParser 	= require('body-parser')
const routerSignup 	= express.Router()


routerSignup.get('/Signup', function(request, response){
    response.render('Signup')
});

routerSignup.post('/signup', function(request, response){
    User.create({
        userName: request.body.username,
        email: request.body.email,
        password: request.body.password
    }).then( function() {
        response.redirect("/")
    })
    console.log("ik doe het")
})
// routerSignup.post('/signup', function(request, response) {
//     daba.sync({force: true}).then(function () {
//         User.create({
//             userName: req.body.username,
//             email: req.body.email,
//             password: reg.body.password
//         }).then(function () {
//             var server = app.listen(3000, function () {
//                 console.log('Example app listening on port: ' + server.address().port);
//             });
//         });
//     },  function (error) {
//         console.log('sync failed');
//         console.log(error);
//     });
// })
