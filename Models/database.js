// ADD SEQUELIZE LIBRARY
const Sequelize = require('sequelize');
const db = { };

// CONNECTING WITH DATABASE
db.connect = new Sequelize('blogapp', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  define: {
      timestamps: false
  }
});

// Testing connection
db.connect
    .authenticate()
    .then(function(err) {
       console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });



// DEFINING USER MODEL
db.User = db.connect.define('user', {
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
db.Post = db.connect.define('post', {
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
db.Comment = db.connect.define('comment', {
    userName:  {
        type: Sequelize.STRING,
//        allowNull: false,
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


//SYNCING THE DATABASE AND CREATING ADMIN USER
db.connect
    .sync({force:true})

    .then(function(){
    return db.User.create({
        userName: 'Admin',
        email: 'admin@mail.com', 
        password: '1'
    })
        .then(function(user) {
        return user.createPost({
        title: 'First title',
        body: 'First body'
        })
    })
        .then(function(post){
        return post.createComment({
        body: 'First Comment',
        userId: post.userId
        })
    })
        
        .then(function(){
        return db.User.create({
            userName: 'Admin2',
            email: 'admin2@mail.com', 
            password: '2'
        })
    })
            .then(function(user) {
            return user.createPost({
                title: 'Second title',
                body: 'Second body'
            })
        })
        .then(function(post){
            return post.createComment({
                body: 'Second Comment',
                userId: post.userId
            })
        })
            
            .then(function(){
            return db.User.create({
                userName: 'Admin3',
                email: 'admin3@mail.com', 
                password: '3'
            })
    })
            .then(function(user) {
                return user.createPost({
                    title: 'Third title',
                    body: 'Third body'
                })
            })
            .then(function(post){
                return post.createComment({
                    body: 'Third Comment',
                    userId: post.userId
                })
            })
                .catch (function(error){
                console.log(error);
                })
            })


// EXPORT db
module.exports = db




//module.exports = {
//    db:db, 
//    User:User,
//    Post:Post,
//    Comment:Comment,
//}