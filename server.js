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
		res.json({
			currentDate: new Date()
		});
	}, 3000);
});

app.post('/rest/login', function (req, res) {
	var credentials = {
			user: 'pablo',
			password: 'diaz42'
		},
		response = {
			logged: JSON.stringify(credentials) == JSON.stringify(req.body)
		};

	console.log(credentials);

	setTimeout(function () {
		res.json(response);
	}, 3000);
});

app.get('/rest/add/:a/:b', function (req, res) {
	var a = Number(req.params.a),
		b = Number(req.params.b);
		time = (Math.floor(Math.random() *5) + 1) * 1000;

	setTimeout(function () {
		res.json({
			result: a + b
		});
	}, time);
});

app.listen(3000, function () {
	console.log('Server started...');
});

