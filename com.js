
function oKResponse (response, result) {
	var resSerialized = result + '';
	response.writeHead(200, 
		{
		'Content-Type': 'application/json',
		'Content-Length': resSerialized.length,
		}
	);
	response.write(resSerialized);
	response.end(); 
}

function wrongResponse (response) {
	console.log("No request handler found for " + pathname);
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("404 Not found");
	response.end();
}

exports.oKResponse = oKResponse;
exports.wrongResponse = wrongResponse;
