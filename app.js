var express = require('express');
var compression = require('compression')

var app = express();

// compress all requests
app.use(compression());

// main route
app.get('/', function(req, res) {
  res.status(200).sendFile('client/templates/index.html', { root: __dirname });
});

// add the API endpoints
app.use('/api', require('./server/routes/api'));

app.listen(8888, '127.0.0.1');