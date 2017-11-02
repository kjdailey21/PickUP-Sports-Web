const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// Expose API Route for storing persistent data and access other service data
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API Location
app.use('/api', api);

// Send all other requests to the Angular App
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// Set Port for server to run
const port = process.env.PORT || '3000';
app.set('port', port);

// Start up the web server
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
