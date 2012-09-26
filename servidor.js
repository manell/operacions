var http = require("http"),
	url = require("url"),
	qs = require('querystring'),
	operacions = require("./operacions"),
	router = require('./router');
	
var	handle = {};
handle["/suma"] = operacions.suma;
handle["/resta"] = operacions.resta;
	
var port = process.env.PORT;

http.createServer(function (request, response) {
	var pathname = url.parse(request.url).pathname;
	var data = '';
 	console.log("Request for " + pathname + " received.");
	console.log(request.method);
	
	request.addListener('data', function (chunk) {
		console.log('rebre dades post');
		data += chunk; 
	});
	
	request.addListener('end', function () {
	  console.log(data);
	  var post = JSON.parse(data);
	  console.log('crido router');
	  router.route(handle,
			  pathname,
			  response,
			  post.n1,
			  post.n2,
			  function (res) {
		  		console.log(res);
		      	response.writeHead(200, {
		      		'Content-Type': 'application/json',
		      		'Content-Length': res.length,
		      	});
		      	response.write(res + '');
			  	response.end(); 
	  		  },
	  		  function (err){
	  			console.log("No request handler found for " + pathname);
	  			response.writeHead(404, {"Content-Type": "text/plain"});
	  			response.write("404 Not found");
	  			response.end();
	  		  });
	  
	});
	request.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});
}).listen(port);



 