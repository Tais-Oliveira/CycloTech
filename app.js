const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const port = 8080;
const { eAdmin } = require('./middlewares/auth');
const User = require('./models/User');
const CadProduto = require('./models/CadProduto');
const CadRecycle = require('./models/CadRecycle');
const path = require('path');
const { application } = require('express');
const { match } = require('assert');
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");
const usuario = require("./routes/cliente")
app.use(express.json());

const rotaCliente = require("./routes/cliente"); //rota clientes
const { ClientRequest } = require('http');
const { where } = require('sequelize');
app.use('/cliente',rotaCliente);

// handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//arquivos estáticos
app.use(express.static(path.join(__dirname,"public")));

//CRUD DO USER
app.get('/cadastro',(req,res)=>{
    res.render('form');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/',(req,res)=>{
    res.render('home');
});

    app.get('/cadastro',(req,res)=>{
        res.render('form');
       
    });
    
    app.get('/login',(req,res)=>{
        res.render('login');
    });
    
        app.post('/login',(req,res)=>{
        User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
           }).then(()=>{
            res.render('login');
            alert("Login Realizado com Sucesso!!");
       }).catch((error)=>{
            console.log("erro"+error);
       });
    });

        app.get('/minhaconta',(req,res)=>{
        res.render('opcao');
        
        });
           
        app.get('/detalhes',(req,res)=>{
            res.render('preDetails');
        });
        
        app.post("/detalhes",(req,res)=>{
            User.findOne({where:{'email':req.body.email}}).then((cliente)=>{
                res.render('detailsUser',{cliente:cliente})
            })  
            
        })

        app.get('/deletarusuario',(req,res)=>{
            res.render('deleteUser');
        });
        
        app.post('/deletarusuario',(req,res)=>{
            User.destroy({where:{'email':req.body.email}})
            res.send("Conta deletada com sucesso!");
        });



        app.get('/atualizarcadastro',(req,res)=>{
            res.render('preEdit');      
});

    app.post('/atualizarcadastro',(req,res)=>{
     User.findOne({where:{'email':req.body.email}}).then((cliente)=>{
        res.render('atualizarUser',{cliente:cliente});
    });


});

    app.post("/atualizado",(req,res)=>{
    User.update({
        name: req.body.nome,
        email: req.body.email,
        password: req.body.password
    },
    {where:{'email':req.body.email}},
     res.send("Atualizado com sucesso"))
});

//Rotas das paginas

app.get('/pagprodutos',(req,res)=>{
    res.render('pagprod');
});
app.get('/recycle',(req,res)=>{
    res.render('recycle');
});
app.get('/ajuda',(req,res)=>{
    res.render('faq');
});
app.get('/sobre',(req,res)=>{
    res.render('sobre');
}); 

// ----> CRUD CADASTRO RECYCLE


app.post('/recycle',(req,res)=>{
    CadRecycle.create({
    nome_cliente: req.body.nome_cliente,
    cpf: req.body.cpf,
    email: req.body.email,
    descricao: req.body.descricao
       }).then(()=>{
        res.send('Cadastro do RECYCLE realizado com SUCESSO!');
   }).catch((error)=>{
        console.log("erro"+error);
   });
});


    app.get('/detalhesRec',(req,res)=>{
        res.render('PreDetailsR');
    });
    
    app.post("/detalhesRec",(req,res)=>{
        CadRecycle.findOne({where:{'email':req.body.email}}).then((cliente)=>{
            res.render('detailsRecycle',{cliente:cliente})
        });  
        
    });

    app.get('/deletarRec',(req,res)=>{
        res.render('deletarRec');
    });
    
    app.post('/deletarRec',(req,res)=>{
        CadRecycle.destroy({where:{'email':req.body.email}})
        res.send("Registro deletado com sucesso!");
    });

    app.get('/atualizarRec',(req,res)=>{
        res.render('preEdit');      
});


app.post('/atualizarRec',(req,res)=>{
 CadRecycle.findOne({where:{'cpf':req.body.cpf}}).then((cliente)=>{
    res.render('atualizarRec',{cliente:cliente});
});


});

app.post("/atualizado",(req,res)=>{
CadRecycle.update({
    nome_cliente: req.body.nome_cliente,
    cpf: req.body.cpf,
    email: req.body.email,
    descricao: req.body.descricao 
},
{where:{'cpf':req.body.cpf}},
 res.send("Atualizado com sucesso"))
});

/*

// --- > CRUD PRODUTOS

app.get('/cadprod',(req,res)=>{
        res.render('cadproduto');
       });

app.post('/cadproduto',(req,res)=>{
   CadProduto.create({
       nome: req.body.nome,
       marca: req.body.marca,
       cor: req.body.cor,
       preco: req.body.preco,
       descricao: req.body.descricao
   }).then(()=>{
       res.render('pagprodutos');
   }).catch(function(error){
       res.send("Erro, Tente Novamente!");
   });
});


// excluir produto 
app.get('/loja/:id',(req,res)=>{
   Produto.destroy({
       where:{'id': req.params.id}}).then(()=>{
           res.send("<h2 style='margin: 12rem 40rem;'>PRODUTO DELETADO COM SUCESSO!!</h2>")
       });     
});


//editar

router.get('/editarProduto/:id',(req,res)=>{
       Produto.findOne({where:{'id':req.params.id}}).then((produto)=>{
           fornecedor.findAll().then(function(fornecedor){
               loja.findAll().then(function(loja){
                   res.render('editarProduto',{fornecedor:fornecedor, loja:loja, produto: produto})
               })
             
           })
           
       })
    
})


router.post('/editarProduto/:id',(req,res)=>{
       Produto.update({
        nome: req.body.nome,
        marca: req.body.marca,
        cor: req.body.cor,
        preco: req.body.preco,
        descricao: req.body.descricao
       },
          {where:{id: req.params.id}},
          res.send("<h1 style='margin: 12rem 40rem;'>PRODUTO EDITADO COM SUCESSO</H1>")
           
   )})

*/
app.listen(port);