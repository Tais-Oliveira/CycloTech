const Sequelize = require('sequelize');

const sequelize = new Sequelize('dados', 'root', 'mysql.123456', {
    host: "localhost",
    dialect: "mysql",
    query:{raw:true}
});

sequelize.authenticate().then(function(){console.log("Conectado com Sucesso!!!")}).catch(function(error){console.log("ERRO"+error)});

module.exports =
{
 Sequelize: Sequelize,
 sequelize: sequelize
} 
