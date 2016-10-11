var path = require('path');
var express = require('express');

var app = express();

app.use('/public', express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var port = Number(process.env.PORT || 3000);
var server = app.listen(port);