var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.status(200).sendFile('client/templates/index.html', { root: __dirname });
});

app.use('/api', require('./server/routes/api'));

app.listen(8888);