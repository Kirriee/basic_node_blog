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

app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

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

// get request signup page
app.get('/signup', function(request, response){
	response.render('signup')
});
// get request login page
app.get('/login', function(request, response){
	response.render('login')
});

app.get('/profile', function(request, response){
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/login');
	} else {
		Post.findAll(
		{
			where:{
				userId: request.session.user.id
			}
		}
		)
		.then (function(myMessages){
			response.render('profile',
				{key: myMessages,
					name: request.session.user.userName});


		})
	}})


// get request posts page
app.get('/posts', function(request, response){
	var user = request.session.user;
	if (user === undefined) {
		response.redirect('/login');
	} else {
		Post.findAll({
			include: [User, Comment]
		})
		.then (function(allMessages){
			response.render('posts', 
				{
					key:allMessages,
					name: request.session.user.userName
				});
		})
	}})





app.post('/signup', function(request, response){
	User.create({
		userName: request.body.username,
		email: request.body.email,
		password: request.body.password

	}).then( function() {
		// if (request.body.pssword = cpassword){
			response.redirect("/posts")
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
			response.redirect('/posts');
		} else {
			response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
		}
	}, function (error) {
		response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
	});

});

app.post('/posts', function(request, response){
	
	Post.create({
		title: request.body.title,
		body: request.body.body,
		userId: request.session.user.id
		//  
	}).then(function(){
		response.redirect("/posts")
	})
})


app.post('/comment', function(request, response){
    Comment.create({
        body: request.body.body,
        postId: request.body.postId,
        userId: request.session.user.id
    }).then(function(){
        response.redirect("/profile")
    })
})
//databases


var User = db.define('user', {
	userName:  {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	},
	password:   {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	},
	email:   {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	}
});

var Post = db.define('post', {
	title:  {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	},
	body:   {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	}
});

var Comment = db.define('comment', {
	body:   {
		type: Sequelize.STRING,
		allowNull: false,
		isUnique: true
	}
});









// DB relations
User.hasMany(Post)
User.hasMany(Comment)
Post.belongsTo(User)
Post.hasMany(Comment)
Comment.belongsTo(Post)
Comment.belongsTo(User)




db
    //sync the models
    .sync({force:false})
    .then(function(){
        //then create first message
        return User.create({
        	userName: 'Jane Smith',
        	email: 'jane@hotmail.com', 
        	password: '123'
        }).then(function(user){
       	return user.createPost({
        		title: 'dit is een test',
        		body: 'hallo hallo'
        	})
        })
        // .then(function(user){
        // return post.createComment({
        // 		body: "sklfksnv"
        // 	})
        // })

    })
  
    .then(function () {
    	var server = app.listen(4000, function () {
    		console.log('Example app listening on port: ' + server.address().port);
    	});
    }).then(function (error) {
    	console.log('sync failed: ');
    	console.log(error);
    });