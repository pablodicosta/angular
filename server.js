var express = require('express'),
	server = express();

server.use(express.static(__dirname + '/apps'));
server.listen(3000);

console.log('Server started...');