const api = require('./api');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidar = require('express-validator');

const PORT = 8081;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.use('/', api);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
