function route(handle, pathname, op1, op2, res, err) { 
	if (typeof handle[pathname] === 'function') {
		handle[pathname](op1, op2, function response(result){
			res(result);
		});
	} 
	else err();
}
exports.route = route;