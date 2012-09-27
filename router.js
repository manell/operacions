function route(handle, pathname, args, res, err) { 
	if (typeof handle[pathname] === 'function') {
		handle[pathname](args, function response(result){
			res(result);
		});
	} 
	else err();
}
exports.route = route;