var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config.js');
var mongoose = require('mongoose');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect(config.database, function(err){
	if(err){
		console.log(err)
	} else {
		
      //user: "root",
      //password: "blessed94",
      //dbName: "individualstory",
 
		console.log("Connected to the database");
	}
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var api=require('./app/routes/api')(app, express);
app.use('/api',api);

app.get('*' , function(req, res){
	res.sendFile(__dirname + '/public/views/index.html');
});

http.listen(config.port, function(err){
	if(err){
		console.log(err);
	}else{
		console.log("Listening on port 3000");
	}
	
});
