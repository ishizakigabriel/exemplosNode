const http = require('http');
const servidor = http.createServer(function(req, res) {
    let html = '';
    if(req.url == "/") {
        html = `<html>
        <head><meta charset='utf-8'><title>Exemplo2.js</title></head>
        <body>
            <h1> outra forma de construir o código </h1>
        </body>
        </html>`;
    }
    else if (req.url == "/produtos") {
        html = `<html>
        <head><meta charset='utf-8'><title>Exemplo2.js</title></head>
        <body>
            <h1> lista de produtos</h1>
        </body>
        </html>`;
    }
    else {
        html = `<html>
        <head><meta charset='utf-8'><title>Exemplo2.js</title></head>
        <body>
            <h1> Rota não encontrada</h1>
        </body>
        </html>`;
    }
    res.writeHead(200, {
        'Content-Type':'text/html'
    });
    res.end(html);
}).listen(3000);