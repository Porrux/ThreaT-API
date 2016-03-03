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
    },
    fetch: function (id, callback) {
        if (!callback) {
            callback = nocallback;
        }

        self.fetchWithDbParams(id, function (err, body) {
            if (err) {
                return callback(err, null);
            }

            // delete couchdb params
            delete body._id;
            delete body._rev;

            return callback(null, body);
        });
    },
    fetchWithDbParams: function (id, callback) {
        if (!callback) {
            callback = nocallback;
        }

        db.get(id, callback);
    },
    add: function (event, callback) {
        if (!callback) {
            callback = nocallback;
        }

        db.insert(event, event.uuid, function (err, body) {
            if (err) {
                return callback(err, null);
            }

            if (event.uuid != body.id) {
                event._id = body.id;
                event._rev = body.rev;
                event.uuid = body.id;

                return self.add(event, callback);
            }

            return callback(null, {"uuid": body.id});
        });
    },
    update: function (event, callback) {
        if (!callback) {
            callback = nocallback;
        }

        self.fetchWithDbParams(event.uuid, function (fetchErr, fetchData) {
            if (fetchErr) {
                return callback(fetchErr, null);
            }

            event._id = fetchData._id
            event._rev = fetchData._rev;

            self.add(event, callback);
        });
    }
};