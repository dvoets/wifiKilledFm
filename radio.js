var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var spawn = require('child_process').spawn;
var radioObject = null;

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/radio/play', function (req, res) {
	console.log(req.body.url);
	radioObject = spawn('mplayer',[req.body.url]);
	res.redirect('/');
});

app.post('/radio/pause', function (req, res) {
	if (radioObject !== null) {
		radioObject.stdin.write('p');
	} else {
		res.redirect('/');
	}

	
	
});

app.post('/radio/stop', function (req, res) {
	if (radioObject !== null) {
		radioObject.stdin.write('q');
		radioObject.kill();
	} else {
		res.redirect('/');
	}
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
