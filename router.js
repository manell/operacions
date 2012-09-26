function route(handle, pathname, response, op1, op2, res, err) { 
	
	if (typeof handle[pathname] === 'function') {
 		res( handle[pathname](op1, op2) );
	} 
	else {    
		err();
	}
 
}
exports.route = route;