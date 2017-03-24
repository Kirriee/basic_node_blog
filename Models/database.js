// ADD SEQUELIZE LIBRARY
const sequelize = require('sequelize')
const db = 

//CONNECTING WITH 

var db = new Sequelize ('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/blogapp');



// TESTING DATABASE CONNECTION
db 
.sync({ force: true })
.then(function(err) {
    console.log('Testing table: check!');
}, function (err) { 
    console.log('An error occurred while creating the table:', err);
});

// DEFINING USER MODEL
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


// DEFINING POST MODEL

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

// DEFINING COMMENT MODEL

var Comment = db.define('comment', {
    userName:  {
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


// DB RELATIONS
db.User.hasMany(db.Post)
db.User.hasMany(db.Comment)
db.Post.belongsTo(db.User)
db.Post.hasMany(db.Comment)
db.Comment.belongsTo(db.Post)
db.Comment.belongsTo(db.User)


// SYNCING THE DATABASE AND CREATING ADMIN USER
db
    .sync({force:true})
    .then(function(){
       
        return User.create({
            userName: 'Admin',
            email: 'admin@mail.com', 
            password: '123'
        }).then(function () {
            var server = app.listen(4000, function () {
                console.log('Example app listening on port: ' + server.address().port);
            });
        });
    }, function (error) {
        console.log('sync failed: ');
        console.log(error);
    });






module.exports = {
    db:db, 
    User:User,
    Post:Post,
    Comment:Comment,
}