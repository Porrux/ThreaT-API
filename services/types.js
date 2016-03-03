var db = require('./db'),
    uuid = require('uuid');

var typeId = 'types';

function nocallback() {
};

var self = module.exports = {
    all: function (callback) {
        if (!callback) {
            callback = nocallback;
        }

        self.fetchWithDbParams(typeId, function (err, data) {
            if (err) {
                if (err.statusCode === 404) {
                    return callback(null, []);
                }

                return callback(err, null);
            }

            return callback(null, data.values);
        });
    },
    fetchWithDbParams: function (id, callback) {
        if (!callback) {
            callback = nocallback;
        }

        db.get(id, callback);
    },
    add: function (type, callback) {
        if (!callback) {
            callback = nocallback;
        }

        self.fetchWithDbParams(typeId, function (err, body) {
            if (err && err.statusCode !== 404) {
                return callback(err, null);
            }

            if (!body) {
                body = {};
            }

            if (!type.uuid) {
                type.uuid = uuid.v4();
            }

            if (!body.values) {
                body.values = [];
            }

            body.values.push(type);

            return db.insert(body, typeId, function (errInsert) {
                if (errInsert) {
                    return callback(errInsert, null);
                }

                return callback(null, {"uuid": type.uuid});
            });

        });
    }
};