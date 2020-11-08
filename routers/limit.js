module.exports = ({ max, time }) => {
    let reqs = 0, blocked = false;
    return (req, res, next) => {
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
