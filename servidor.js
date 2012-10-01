
var http = require("http");
var	url = require("url");
var	qs = require('querystring');
var	operacions = require("./operacions");
var	router = require('./router');

	

var port = process.env.PORT || 8888;

function initServer (handle, com) {
 	http.createServer (function (request, response) {
		var pathname = url.parse(request.url).pathname;
		var data = '';
		console.log("Request for " + pathname + " received.");
		console.log(request.method);
		
		request.addListener('data', function (chunk) {
			data += chunk; 
		});
		
		request.addListener('end', function () {
		var args = JSON.parse(data);
		console.log('problem with request: ' + data);
		router.route(handle,
			pathname,
			args,
			function (res) {
				com.oKResponse (response, res);
			},
			function ( ) {
				com.wrongResponse (response);
			});
		  
		});
		request.addListener('error', function (e) {
			console.log('problem with request: ' + e.message);
		});
		
	}).listen (port);

}

exports.initServer = initServer;


 