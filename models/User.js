const db = require('./db');

const User = db.sequelize.define('users', {
    id:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email:{
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: db.Sequelize.STRING,
        allowNull: false,
    }
},{ timestamps: false,});

//User.sync();

module.exports = User;