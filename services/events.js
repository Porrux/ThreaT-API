var db = require('./db'),
    async = require('async');

function nocallback() {
};

var self = module.exports = {
    all: function (callback) {
        if (!callback) {
            callback = nocallback;
        }

        db.get('_all_docs', {'include_docs': true}, function (err, data) {
            if (err) {
                return callback(err, null);
            }

            var rows = [];

            async.eachSeries(data.rows, function (prime, cb) {

                if (prime.doc._id === 'types') {
                    return cb();
                }

                delete prime.doc._id;
                delete prime.doc._rev;
                rows.push(prime.doc);
                cb();
            }, function (err) {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, rows);
            });
        });
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
    },
    delete: function (id, callback) {
        if (!callback) {
            callback = nocallback;
        }

        self.fetchWithDbParams(id, function (err, data) {
            if (err) {
                return callback(err, null);
            }

            return db.destroy(data._id, data._rev, function (deleteErr, deleteData) {
                if (deleteErr) {
                    return callback(deleteErr, null);
                }

                return callback(null, {"uuid": deleteData.id});
            });
        });
    }
};