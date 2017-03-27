// REQUIRE LIBRARIES
const express = require('express');
const pg = require('pg');
const Sequelize = require ('sequelize');
const bodyParser = require ('body-parser');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require(__dirname + '/../models/database.js');


//SETUP VIEW ENGINE
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// MIDDLEWARE
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to ssupport URL-encoded bodies
	extended: false })); 
app.use('/public', express.static('public'));// Folder to serve to client-side

// SESSION
app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));


// ROUTERS
const indexRouter = require(__dirname + '/routes/index.js') // important for your routes in your routes folder
const loginRouter = require(__dirname + '/routes/login.js') // important for your routes in your routes folder
const logoutRouter = require(__dirname + '/routes/logout.js') // important for your routes in your routes folder
const signupRouter = require(__dirname + '/routes/signup.js') // important for your routes in your routes folder
const profileRouter = require(__dirname + '/routes/profile.js') // important for your routes in your routes folder
const postsRouter = require(__dirname + '/routes/posts.js') // important for your routes in your routes folder
const commentsRouter = require(__dirname + '/routes/comments.js') // important for your routes in your routes folder
const commentRouter = require(__dirname + '/routes/comment.js') // important for your routes in your routes folder



// routers
app.use('/', indexRouter)
app.use('/signup', signupRouter)
app.use('/logout', logoutRouter)
app.use('/login', loginRouter)
app.use('/profile', profileRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)
app.use('/comment', commentRouter)

app.listen(4000, () => {
    console.log('Listening.')
});


module.exports = app;



//
////		if (user !== null && request.body.password === user.password){
////			request.session.user = user;
////			response.redirect('/posts');
////		} else {
////			response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
////		}
////	}, function (error) {
////		response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
////	});
////
////});
//

//
//




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
//      })
// });