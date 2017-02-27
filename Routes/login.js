const express       = require('express')
const daba 			= require(__dirname + '/../modules/database')
const bodyParser 	= require('body-parser')
const routerSignup 	= express.Router()

app.get('/login', function(request, response){
	response.render('login')
});



app.post('/login', function(request, response){
	User.findOne({
		where: {
			email: request.body.email
		}
	}).then(function (user){
		if (user !== null && request.body.password === user.password){
			request.session.user = user;
			response.redirect('/profile');
		} else {
			response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
		}
	}, function (error) {
		response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
	});
});