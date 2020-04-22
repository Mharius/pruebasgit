// web.js
var express = require("express");
var md  = require("markdown").markdown;
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
var fs=require('fs');
var Glob= require('glob').Glob;


//Hola
var routes= { 'README': 'README.md'};

var g = new Glob("curso/texto/*.md", {
		     sync: true
		 });
for ( var m in g.found ) {
    var file_content = fs.readFileSync(g.found[m],'utf8');
    //    console.log('Leyendo ' + files[f]);
    var route=g.found[m].split('.')[0];
    routes[route] = md.toHTML(file_content);
}

app.use("/img",express.static('curso/texto/img'))
    .use("/curso/texto/img",express.static('curso/texto/img'));

app.get('/', function(req, res) {
//	    console.log('README');
	    res.send(routes['README']);
});

app.get('/curso/texto/:ruta', function(req, res) {
//	    console.log("Request "+req.params.ruta);
	    var ruta_toda = "curso/texto/"+req.params.ruta;
	    if ( routes[ruta_toda] ) {
		res.send(routes[ruta_toda]);		
	    } else {
		res.send('Nostá '+ ruta_toda,404);
	    }
});

app.get('/img/:ruta', function(req, res) {
//	    console.log("Request "+req.params.ruta);
	    var ruta_toda = "curso/texto/img/"+req.params.ruta;
	    if ( routes[ruta_toda] ) {
		res.send(routes[ruta_toda]);		
	    } else {
		res.send('Nostá '+ ruta_toda,404);
	    }
});

var port = Number(process.env.PORT || 5000);
var server = app.listen(port);


exports.server=server; // For testing

