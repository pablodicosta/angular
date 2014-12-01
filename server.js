var express = require('express'),
	server = express();

server.use(express.static(__dirname + '/apps'));

server.get('/rest/date', function (req, res) {
	setTimeout(function () {
		res.json ({
			currentDate: new Date()
		});
	}, 3000);
});

server.listen(3000);

console.log('Server started...');