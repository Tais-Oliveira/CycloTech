const express = require("express");
const { where } = require("sequelize");
const router = express.Router();

const Cliente = require('../models/User');

router.get('/',(req,res)=>{
    res.render('home')
});

router.get('/cadastro',(req,res)=>{
    res.render('form')
   
});

router.get('/login',(req,res)=>{
    res.render('login')
});

    router.post('/login',(req,res)=>{
   Cliente.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
       }).then(()=>{
        res.render('login');
   }).catch((error)=>{
        console.log("erro"+error);
   });
});

// - CRUD DO USUARIO
router.get('/minhaconta',(req,res)=>{
    res.render('opcao');
});


router.get('/detalhes',(req,res)=>{
    res.render('preDetalhe');
});


router.post("/detalhes",(req,res)=>{
    Cliente.findOne({where:{Cpf:req.body.cpf}}).then((cliente)=>{
        res.render('detalhes',{cliente:cliente})
    })  
    
});

router.get('/deletarusuario',(req,res)=>{
    res.render('deletarUsuario')
});

router.post('/deletarusuario',(req,res)=>{
    Cliente.destroy({where:{'cpf': req.body.cpf} })
    res.send("Usuario deletado com sucesso!")
});

router.get('/atualizarcadastro',(req,res)=>{
            
                res.render('PreEditar')
       
});

router.post('/atualizarcadastro',(req,res)=>{
     Cliente.findOne({where:{name:req.body.name}}).then((cliente)=>{
        res.render('atualizarUsuario',{cliente:cliente})
    })
   
});


router.post('/atualizado',(req,res)=>{
    Cliente.update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    },
        {where:{name: req.body.name}},
        res.send("Atualizado com sucesso")
)});

module.exports = router;