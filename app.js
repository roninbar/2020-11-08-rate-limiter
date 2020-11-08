var path = require('path');
var logger = require('morgan');
var express = require('express');
var cookieParser = require('cookie-parser');

const limit = function ({ max, time }) {
    let reqs = 0, blocked = false;
    return function (req, res, next) {
        if (blocked) {
            return res.sendStatus(500);
        }
        else if (++reqs < max) {
            return next();
        } else {
            reqs = 0;
            blocked = true;
            setTimeout(function () {
                blocked = false;
            }, 10000 * time);
            return res.sendStatus(500);
        }
    };
}

var app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(limit({
    max: 5, // amount
    time: 1 // minout
}));

app.get('/test', (req, res) => {
    res.json({ status: '(:' });
});

module.exports = app;
