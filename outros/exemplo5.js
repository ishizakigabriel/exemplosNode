const url = require('url');
var adr = 'http://localhost:3000/default.htm?id=5&curso=59';
var q = url.parse(adr, true);

console.log(q.host);
console.log(q.pathname);
console.log(q.search);

var qdados = q.query;
console.log(qdados.curso);
console.log(qdados.id);