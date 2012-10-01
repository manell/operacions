
var args = require('commander');
var http = require('http');
var url = require('url');
var qs = require('querystring');
args
	.version('0.0.1')
	.option('-s, --server <server>', 'specify the server ', 'localhost')
	.option('-y, --proxy <proxy>', 'specify the proxy ')
	.option('-p, --port <port>', 'specify the port ',Number)
	.option('-1, --n1 <n1>', 'first operator',Number)
	.option('-2, --n2 <n2>', 'second operator', Number)
	.option('-o, --operation <operation>', 'especify operation', 'suma')
	.parse(process.argv);



var data = JSON.stringify(
			{
				"n1" : args.n1,
				"n2" : args.n2
			}	
			);



if(args.proxy){
	var options = {
			  host: args.proxy,
			  port: args.port,
			  method: 'POST',
			  path: args.server+args.operation,
			  headers: {
				  Host: "probaeclipse.herokuapp.com",
				  'Content-Length': JSON.stringify({
										"n1" : args.n1,
										"n2" : args.n2
									}).length,
				  'Content-Type': 'application/json'
			  }
		};
}

else {
	var options = {
			host: args.server,
			port: args.port,
			path: '/suma' ,
			method: 'POST'
		};
}


var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.write(data);
req.end();