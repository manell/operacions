var http = require("http"),
	url = require("url"),
	qs = require('querystring'),
	operacions = require("./operacions"),
	router = require('./router');
	
var	handle = {};
handle["/suma"] = operacions.suma;
handle["/resta"] = operacions.resta;
	
var port = process.env.PORT;

http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;
 	console.log("Request for " + pathname + " received.");
	console.log(request.method);
	var data = '';
	request.on('data', function(chunk) {
	  data += chunk;
	});
	request.on('end', function() {
	  console.log(data);
	  var post = JSON.parse(data);
	 
	  router.route(handle,
			  pathname,
			  response,
			  post.n1,
			  post.n2,
			  function(res) {
		  		console.log(res);
		      	response.writeHead(200, {'Content-Type': 'application/json'});
		      	response.write(res + '');
			  	response.end(); 
	  		  },
	  		  function(err){
	  			console.log("No request handler found for " + pathname);
	  			response.writeHead(404, {"Content-Type": "text/plain"});
	  			response.write("404 Not found");
	  			response.end();
	  		  });
	  
	});
	
}).listen(port);



 