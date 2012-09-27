var server = require('./servidor');
var com = require('./com');

function suma (args, response) {
	response (args.n1 + args.n2);
}

function resta(args, response) {
	response (args.n1 - args.n2);
}

var	handle = {};
handle["/suma"] = suma;
handle["/resta"] = resta;

server.initServer (handle, com);

