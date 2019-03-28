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
app.use('/clientes/id', rota);

rota.get('/clientes/new', (req, res) => {
    execSqlQuery("insert into clientes values (NULL,'" + req.query.nome + "','" + req.query.data_nasc + "','" + req.query.email + "');", res);
});
app.use('/clientes/id', rota);

rota.get('/clientes/update/:id', (req, res) => {
    let filtro = '';
    if (req.params.id) filtro = 'where id_cliente=' + parseInt(req.params.id);
    execSqlQuery("UPDATE clientes SET nome_cliente='" + req.query.nome + "',data_niver='" + req.querydata_nasc + "',email='" + req.query.email + "' " + filtro, res);
});
app.use('/clientes/id', rota);

rota.get('/produtos', (req,res) => execSqlQuery('SELECT * FROM produtos', res));
app.use('/produtos', rota);