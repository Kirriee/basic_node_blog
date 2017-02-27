const sequelize = require('sequelize')

// Creating an empty object for the database



// db.connect = new sequelize('blogapp', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
//     host: 'localhost',
//     dialect: 'postgres'
// })

// Testing Database
db // Of: Sequelize
.sync({ force: true })
.then(function(err) {
    console.log('Testing table: check!');
}, function (err) { 
    console.log('An error occurred while creating the table:', err);
});

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


// DB relations
db.User.hasMany(db.Post)
db.User.hasMany(db.Comment)
db.Post.belongsTo(db.User)
db.Post.hasMany(db.Comment)
db.Comment.belongsTo(db.Post)
db.Comment.belongsTo(db.User)

db.connect.sync({force:true}).then(db => {
    console.log('Synced with Database')
})

module.exports = db