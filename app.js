// REQUIRE LIBRARIES

const express = require ('express')
const pg = require('pg')
const Sequelize = require ('sequelize')
const bodyParser = require ('body-parser')
const app = express ()
const session = require('express-session');
const bcrypt = require('bcrypt');

// INCLUDING USAGE OF ROUTES
const db = require(__dirname + '/models/database.js')

//SETUP VIEW ENGINE
app.set('views','./views');
app.set('view engine', 'pug');

// MIDDLEWARE
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to ssupport URL-encoded bodies
	extended: false })); 
app.use(express.static('public'));


// SESSION
app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

// CONNECTION WITH DATABASE
var db = new Sequelize ('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/blogapp');


//ROUTES

// GET INDEX
app.get('/', function(request, response){
	response.render('index.pug');
});

// GET SIGNUP
app.get('/signup', function(request, response){
	response.render('signup')
});
// GET LOGIN
app.get('/login', function(request, response){
	response.render('login')
});
// GET PROFILE WHERE ALL POST OF LOGGED IN PERSON ARE SHOWN
app.get('/profile', function(request, response){
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/login');
	} 
	else {
		db.Post.findAll(
		{
			where:
			{
				userId: request.session.user.id
			},
			include:[ db.User, db.Comment ]
		})
		.then(function(posts){
			

			response.render('profile',
			{
				messages: posts,
				name: request.session.user.userName

			});

		
		})
		
	}
})


// GET POSTS WHERE ALL POSTS OF EVERYONE ARE SHOWN
app.get('/posts', function(request, response){
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/login');
	} else {
		db.Post.findAll(
		{
			include: [User, Comment]
		}
		)
		.then (function(posts){
			response.render('posts',
			{
				messages:posts,
				name: request.session.user.userName
			});
		})
	}})

// POST SIGNUP WHERE WE CHECK IF THE INPUT FIELDS ARE NOT EMPTY

app.post('/signup', function(request, response){
    if(request.body.username.length === 0){
        response.redirect('/signup?message=' + encodeURIComponent('Provide your username'))
        return
    }

    if(request.body.email.length === 0){
        response.redirect('/signup?message=' + encodeURIComponent('Provide your last name'))
        return
    }

    if(request.body.password.length === 0) {
        response.redirect('/signup?message=' + encodeURIComponent('Provide a password'))
        return
    }
    if(request.body.password !== request.body.cpassword) {
        response.redirect('/signup?message=' + encodeURIComponent('The passwords you provided are not identical'))
        return
    }
    bcrypt.hash('request.body.password', 8, function(err, hash){
        if (err) throw err    
            db.User.create ({
            userName: request.body.username,
            email: request.body.email,
            password: hash
   	}).then(function(user) {
        request.session.user = user;
        response.redirect("/posts")
		});
    }); 
    console.log("ik doe het")
});




// POST LOGIN WHERE WE CHECK IF THE INPUT FIELDS ARE NOT EMPTY THEN REDIRECT TO PROFILE PAGE
app.post('/login', function(request, response){
    if(request.body.email.length === 0) {
        response.redirect('/Login?message=' + encodeURIComponent("Please fill out your email address."))
        return
    }

    if(request.body.password.length === 0) {
        response.redirect('/Login?message=' + encodeURIComponent("Please fill out your password."))
        return
    }
    db.User.findOne({
		where: {
			email: request.body.email
		}
	}).then(function (user){
        if (user == undefined) {
            response.redirect('/signup?message=' + encodeURIComponent("This account does not exist. Please sign up first."));
        }
        console.log(user);
        bcrypt.compare(request.body.password, user.password, (err) =>{
            if (err) {
                response.redirect('/?message=' + encodeURIComponent("Invalid email or password."))
            }
            else {
                request.session.user = user
                response.redirect('/profile')
            }
        })
    })
})


// POST PROFILE WHERE YOU CAN ADD NEW POST

app.post('/profile', function(request, response){
	
	db.Post.create({
		title: request.body.title,
		body: request.body.body,
		userId: request.session.user.id
		//  
	}).then(function(){
		response.redirect("/profile")
	})
})

//POST POSTS WHERE YOU CAN ADD NEW POST

app.post('/posts', function(request, response){
	
	db.Post.create({
		title: request.body.title,
		body: request.body.body,
		userId: request.session.user.id
		//  
	}).then(function(){
		response.redirect("/posts")
	})
})

// POST COMMENT WHERE YOU CAN ADD COMMENTS ON PROFILE PAGE

app.post('/comment', function(request, response){
	db.Comment.create({
		body: request.body.body,
		postId: request.body.postId,
		userId: request.session.user.id
	}).then(function(){
		response.redirect("/profile")
	})
})
// POST COMMENTS WHERE YOU CAN ADD COMMENTS ON POSTS PAGE
app.post('/comments', function(request, response){
	db.Comment.create({
		body: request.body.body,
		postId: request.body.postId,
		userId: request.session.user.id
	}).then(function(){
		response.redirect("/posts")
	})
})






// var User = db.define('user', {
// 	userName:  {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 		isUnique: true
// 	},
// 	password:   {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 		isUnique: true
// 	},
// 	email:   {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 		isUnique: true
// 	}
// });

// var Post = db.define('post', {
// 	title:  {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 		isUnique: true
// 	},
// 	body:   {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 		isUnique: true
// 	}
// });

// var Comment = db.define('comment', {
// 	body:   {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 		isUnique: true
// 	}
// });









// // DB relations
// User.hasMany(Post)
// User.hasMany(Comment)
// Post.belongsTo(User)
// Post.hasMany(Comment)
// Comment.belongsTo(Post)
// Comment.belongsTo(User)




// db
//     //sync the models
//     .sync({force:true})
//     .then(function(){
//         //then create first message
//         return User.create({
//         	userName: 'Jane Smith',
//         	email: 'jane@hotmail.com', 
//         	password: '123'
//         }).then(function(user){
//         	return user.createPost({
//         		title: 'dit is een test',
//         		body: 'hallo hallo'
//         	})
//         })
//         .then(function(post){
//         	return post.createComment({
//         		body: "sklfksnv",
//         		userId: post.userId
//         	})
//         })

    // })

    .then(function () {
    	var server = app.listen(4000, function () {
    		console.log('Example app listening on port: ' + server.address().port);
    	});
    }).then(function (error) {
    	console.log('sync failed: ');
    	console.log(error);
    });

