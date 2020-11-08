const debug = require('debug')('server:limit');

module.exports = ({ requestsToPass, minutesToBlock }) => {
    let reqs = 0, blocked = false;
    return (req, res, next) => {
        if (blocked) {
            debug('Blocking request.');
            return res.sendStatus(503);
        }
        else if (++reqs <= requestsToPass) {
            debug(`Passing request ${reqs}/${requestsToPass}.`);
            return next();
        }
        else {
            reqs = 0;
            blocked = true;
            debug(`Blocking requests for the next ${minutesToBlock === 1 ? 'minute' : `${minutesToBlock} minutes`}.`);
            setTimeout(() => {
                debug('Finished blocking requests.');
                blocked = false;
            }, 60000 * minutesToBlock);
            return res.sendStatus(503);
        }
    };
};
