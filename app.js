const express = require ('express')
const pg = require('pg')
const Sequelize = require ('sequelize')
const bodyParser = require ('body-parser')
const app = express ()
const session = require('express-session');

//setting view folder
app.set('views','./views');

// setting view engine
app.set('view engine', 'pug');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to ssupport URL-encoded bodies
	extended: false
})); 

app.use(express.static('statics'));

var db = new Sequelize ('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/blogapp');


// Testing connection
db
.authenticate()
.then(function(err) {
	console.log('Connection has been established successfully.');
}, function (err) {
	console.log('Unable to connect to the database:', err);
});


// get request index page
app.get('/', function(request, response){
	response.render('index.pug');
});



app.use(session({
    secret: 'oh wow very secret much security',
    resave: true,
    saveUninitialized: false
}));

app.post('/signup', function(request, response){
	User.create({
		userName: request.body.username,
		email: request.body.email,
		password: request.body.password
	}).then( function() {
		response.redirect("/")
	})
	console.log("ik doe het")
})

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


var User = db.define('user', {
	userName:  Sequelize.STRING,
	email:  Sequelize.STRING,
	password:  Sequelize.STRING,
	
});

app.get('/login', function(request, response){
	response.render('login')
});

app.get('/profile', function(request, response){
	response.render('profile')
});

app.get('/signup', function(request, response){
	response.render('signup')
});

db
    //sync the models
    .sync({force:true})
    .then(function(){
        //then create first message
        return User.create({
        	userName: 'Jane Smith',
        	email: 'jane@hotmail.com', 
        	password: 'ikbeneenpaard'
        }).then(function () {
        	var server = app.listen(4000, function () {
        		console.log('Example app listening on port: ' + server.address().port);
        	});
        });
    }, function (error) {
    	console.log('sync failed: ');
    	console.log(error);
    });