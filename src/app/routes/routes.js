module.exports = (app) => {
    app.get('/', function(req, res) {
        res.send('Sejam bem-vindos');
    });
    app.get('/produtos', function(req, res) {
        res.send('Listagem dos produtos')
    });
    app.get('/produtos/1', function(req, res) {
        res.send('Listagem dos produtos de id = 1');
    });
}