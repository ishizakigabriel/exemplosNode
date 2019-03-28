const http = require('http');
const fs = require('fs');
http.createServer(function(req, res) {
    fs.appendFile('exemplo3.txt','\nOlá, tudo bem?', function(err) {
        if(err) {
            throw err;
        }
        else {
            console.log("Gravação realizada com sucesso");
        }
    });
    fs.readFile('exemplo3.txt', function(err, data) {
        res.writeHead(200, {
            'Content-Type':'text/html'
        });
        res.write(data);
        res.end();
    });
}).listen(3000);