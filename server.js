var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(express.static(__dirname + '/apps'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/rest/date', function (req, res) {
	setTimeout(function () {
		res.json ({
			currentDate: new Date()
		});
	}, 3000);
});

app.post('/rest/login', function (req, res) {
	var credentials = {
			user: 'pablo',
			password: 'reload'
		},
		response = {
			status: 'ok'
		};

	console.log(req.body.user);
	console.log(req.body.password);	

	setTimeout(function () {
		res.json (response);
	}, 3000);
});

app.listen(3000, function () {
	console.log('Server started...');
});

