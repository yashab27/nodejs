const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users/all', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const routes = require('./routes/routes.js')(app, fs);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`);
});