const sequelize = require('sequelize')

// Creating an empty object for the database

const DB = {

}

DB.connect = new sequelize('blogapp', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
})

// Testing Database
DB // Of: Sequelize
    .sync({ force: true })
    .then(function(err) {
    console.log('Testing table: check!');
}, function (err) { 
    console.log('An error occurred while creating the table:', err);
});

DB.User = DB.connect.define ('user', {
    userName: 	sequelize.STRING,
    email: 		{type: sequelize.STRING, unique: true},
    password: 	sequelize.STRING
})

DB.Post = DB.connect.define ('post', {
    title: 	sequelize.STRING,
    body: 	sequelize.TEXT
})

DB.Comment = DB.connect.define ('comment', {
    userName: sequelize.TEXT,
    body: sequelize.TEXT
})

// DB relations
DB.User.hasMany(DB.Post)
DB.User.hasMany(DB.Comment)
DB.Post.belongsTo(DB.User)
DB.Post.hasMany(DB.Comment)
DB.Comment.belongsTo(DB.Post)
DB.Comment.belongsTo(DB.User)

DB.connect.sync({force:true}).then(DB => {
    console.log('Synced with Database')
})

module.exports = DB