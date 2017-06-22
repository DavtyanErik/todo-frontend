const api = require('./api');
const path = require('path');
const uuid = require('uuid/v4');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/todo-lists');

const PORT = 8081;
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    if (req.cookies.userId) {
        next();
    } else {
        const userId = uuid();
        res.cookie({ userId });
        next();
    }
});
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.use('/', api);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
