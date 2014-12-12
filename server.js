var express = require('express'),
	bodyParser = require('body-parser'),
	request = require('request'),
	app = express();

var users = [
	{
		name: 'pablo',
		password: 'diaz42',
		role: 'admin'
	},
	{
		name: 'diego',
		password: 'dd42',
		role: 'editor'
	},
	{
		name: 'lucas',
		password: 'lk123',
		role: 'guest'
	}
];

var findUser = function (username) {
	for (var i = 0; i < users.length; i++) {
		if (username == users[i].name) {
			return users[i];
		}
	}
	return null;
};

app.use(express.static(__dirname + '/apps'));
app.use(express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/rest/date', function (req, res) {
	var time = (Math.floor(Math.random() *5) + 1) * 1000;

	setTimeout(function () {
		res.json({
			currentDate: new Date()
		});
	}, time);
});

app.post('/rest/login', function (req, res) {

	var user = findUser(req.body.user),
		time = (Math.floor(Math.random() *5) + 1) * 1000;

	if(!!user && (req.body.password == user.password)) {
		response = {
			username: user.name,
			role: user.role
		}
	} else {
		response = {
			error: "accessDenied"
		}
	}

	setTimeout(function () {
		res.json(response);
	}, time);
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

app.get('/rest/lorem', function (req, res) {
	request('http://loripsum.net/api/10/medium', function (error, response, body) {
		res.setHeader('content-type', 'text/plain');
		res.send(body);
	});
});

app.listen(3000, function () {
	console.log('Server started...');
});

