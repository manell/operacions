var server = require('./servidor');
var com = require('./com');

function suma (op1, op2, response) {
	response (op1 + op2);
}

function resta(op1, op2, response) {
	response (op1 - op2);
}


var	handle = {};
handle["/suma"] = suma;
handle["/resta"] = resta;	
com.wrongResposne('1' );
server.initServer (handle, com);

