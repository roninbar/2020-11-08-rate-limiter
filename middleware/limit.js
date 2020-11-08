const debug = require('debug')('server:limit');

module.exports = ({ max, time }) => {
    let reqs = 0, blocked = false;
    return (req, res, next) => {
        if (blocked) {
            debug('Blocking request.');
            return res.sendStatus(500);
        }
        else if (++reqs <= max) {
            debug(`Passing request #${reqs}.`);
            return next();
        } else {
            reqs = 0;
            blocked = true;
            debug('Starting to block requests.');
            setTimeout(() => {
                blocked = false;
                debug('Starting to pass requests.');
            }, 10000 * time);
            return res.sendStatus(500);
        }
    };
};
