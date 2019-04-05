const express = require('express');
const sql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const porta = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const rota = express.Router();
rota.get('/', (req,res) => res.json({
    message:'Rota 1 Okay!!'
}));
app.use('/',rota);

app.listen(porta);
console.log('API funcionando')

function execSqlQuery(sqlQry, res){
    const connection = sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'loja'
    });
    connection.query(sqlQry, function(error, results, fields){
        if (error){
            res.json(error);
        }
        else {
            res.json(results);
        }
        connection.end();
        console.log('Conexão com BD OK !!!');
    });
}

rota.get('/clientes', (req,res) => execSqlQuery('SELECT * FROM clientes', res));
app.use('/clientes', rota);

rota.get('/clientes/id/:id', (req, res) => {
    let filtro = '';
    if (req.params.id) filtro = 'where id_cliente=' + parseInt(req.params.id);
    execSqlQuery('Select * from clientes ' + filtro, res);
});
app.use('/clientes/id', rota);

rota.get('/clientes/remove/:id', (req, res) => {
    let filtro = '';
    if (req.params.id) filtro = 'where id_cliente=' + parseInt(req.params.id);
    execSqlQuery('delete from clientes ' + filtro, res);
});
app.use('/clientes/remove/id', rota);

rota.post('/clientes/new', (req, res) => {
    execSqlQuery("insert into clientes values (NULL,'" + req.body.nome + "','" + req.body.data_nasc + "','" + req.body.email + "');", res);
});
app.use('/clientes/id', rota);

rota.patch('/clientes/update/:id', (req, res) => {
    let filtro = '';
    if (req.params.id) filtro = 'where id_cliente=' + parseInt(req.params.id);
    execSqlQuery("UPDATE clientes SET nome_cliente='" + req.body.nome + "',data_niver='" + req.body.data_nasc + "',email='" + req.body.email + "' " + filtro, res);
});
app.use('/clientes/id', rota);

rota.get('/produtos/categoria/:id', (req,res) => {
    execSqlQuery(`SELECT * FROM produtos where id_categ_prod='${req.params.id}'`, res)
});
app.use('/produtos', rota);

rota.get('/categorias', (req, res) => execSqlQuery('SELECT * FROM categoriaprodutos', res));
app.use('/categorias', rota);

rota.post('/login', (req,res) => {
    execSqlQuery(`SELECT * FROM usuarios WHERE username='${ req.body.username }'`, res)
});
app.use('/login', rota);

rota.post('/signup', (req,res) => {
    execSqlQuery(`INSERT INTO usuarios(username, password) VALUES ('${ req.body.username }','${ req.body.password }')`, res)
});
app.use('/signup', rota);