var db = require('./db'),
    uuid = require('uuid');

function nocallback() {
};

var self = module.exports = {
    all: function (callback) {
        if (!callback) {
            callback = nocallback;
        }

        callback('', []);

        db.db.get('threat', function (err, body) {
            if (!err) {
                console.log("err: " + err);
            }
            console.log("body: " + body);
        })
    }
};