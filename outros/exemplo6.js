const http = require('http');
const mine = require('./meuModulo');
http.createServer(function(req,res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write("Data atual: " + mine.myDateTime());
    res.end();
}).listen(3000);
    
    
    