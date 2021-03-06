const path = require('path');
const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const limit = require('./middleware/limit');

const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(limit({
    requestsToPass: 5,
    minutesToBlock: 0.25,
}));

app.get('/test', (req, res) => {
    res.json({ status: '(:' });
});

module.exports = app;
