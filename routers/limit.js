module.exports = function ({ max, time }) {
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
};
