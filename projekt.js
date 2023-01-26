const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger_output.json');

var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

app.get('/listGames', function(req, res) {
    console.log('test');
    // #swagger.description = 'Pobiera liste wszstkich zdefinowanych w bazie meczy'
    // #swagger.tags = ['Games']
    con = mysql.createConnection({
		host: 'app_db',
		user: 'projekt',
		password: 'projekt',
		database: 'projekt'
	});
    con.connect(function (err) {
        if(err) throw err;
        console.log("Connected to MySql");
        con.query("select * from games",function (err, result, fields) {
            if(err) throw err;
            res.end(JSON.stringify(result));
        });
        con.end();
    });
});

app.get('/:name', function(req, res) {
    // #swagger.description = 'Pobiera dane meczy dla kraju o podanej nazwie'
    // #swagger.tags = ['Games']
    // #swagger.parameters['name'] = { description: 'Nazwa kraju' }
    con = mysql.createConnection({
        host: 'app_db',
        user: 'projekt',
        password: 'projekt',
        database: 'projekt'
    });
    con.connect(function (err) {
        if(err) throw err;
        console.log("Connected to MySql");
        con.query("select * from games where kraj1=? or kraj2=?", [req.params.name,req.params.name], function (err, result, fields) {
            if(err) throw err;
            console.log(result)
            res.end(JSON.stringify(result));
        });
        con.end();
    });
});

app.post('/addGame', function (req, res) {
    // #swagger.description = 'Pobiera uzytkownika o podanym ID'
    // #swagger.tags = ['Games']
    /*  #swagger.parameters['obj'] = {
                in: 'body',
                type: 'object',
                description: 'Game data'
        } */
    con = mysql.createConnection({
        host: 'app_db',
        user: 'projekt',
        password: 'projekt',
        database: 'projekt'
    });
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to MySQL!");
        con.query("insert into games values (?,?,?,?,?,?)", [parseInt(req.body.id), req.body.data, req.body.kraj1, req.body.kraj2, parseInt(req.body.wynik_kraj_1), parseInt(req.body.wynik_kraj_2)] ,function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.end(JSON.stringify(result));
            });
        con.end();
    });
})

var server = app.listen(8081, function() {});