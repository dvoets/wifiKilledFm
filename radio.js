var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var spawn = require('child_process').spawn

//http://tivo-mplayer.sourceforge.net/docs/mplayer-man.html

var path, radioObject, playing=false;

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/radio/set', function (req, res) {
	path = req.body.url;
	res.redirect('/');
});

app.post('/radio/pp', function (req, res) {
	if (playing) {
		radioObject.stdin.write('p');
	} else if (path !== undefined) {
		radioObject = spawn('mplayer',[path]);
		radioObject.stdout.pipe(process.stdout);
		playing = true;
	} else {

	}
	res.redirect('/');
});

app.post('/radio/stop', function (req, res) {
	if (radioObject !== null) {
		radioObject.stdin.write('q');
		radioObject = null;
		playing = false;
	} else {
		res.redirect('/');
	}
});

// volume bijhouden en up en down in een for loop berekenen

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
