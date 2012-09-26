function route(handle, pathname, response, op1, op2, res, err) { 
	console.log('èntro router');
	if (typeof handle[pathname] === 'function') {
		console.log('retorno res');
 		res( handle[pathname](op1, op2) );
	} 
	else {
		console.log('error router');
		err();
	}
 
}
exports.route = route;