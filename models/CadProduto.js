const db = require('./db')

const Produto = db.sequelize.define('produtos',{
    id:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: db.Sequelize.STRING,
        allowNull: false
    },

    marca:{
        type: db.Sequelize.STRING,
        allowNull: false
    },

    cor:{
        type: db.Sequelize.STRING,
        allowNull: false
    },

    Preco:{
        type: db.Sequelize.DOUBLE(6,2)
    },
    
    descricao:{
        type: db.Sequelize.TEXT,
        allowNull: false     
    } 

});

//Produto.sync({force:true});

module.exports = Produto;