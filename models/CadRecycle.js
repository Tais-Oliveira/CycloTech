const db = require('./db')

const CadRecycle = db.sequelize.define('cad_recycle',{
    id:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_cliente:{
        type: db.Sequelize.STRING,
        allowNull: false
    },

    cpf:{
        type: db.Sequelize.STRING,
        allowNull: false
    },

    email:{
        type: db.Sequelize.STRING,
        allowNull: false
    },

    descricao:{
        type: db.Sequelize.TEXT,
        allowNull: false  
    }
});

//CadRecycle.sync({force:true});

module.exports = CadRecycle;