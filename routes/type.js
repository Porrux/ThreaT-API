var express = require('express'),
    types = require('../services/types'),
    router = express.Router();

///
/// Type
///

router.get('/', function (req, res) {
    return types.all(function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(data);
    });
});

router.post('/', function (req, res) {
    return types.add(req.body, function (err, body) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(body);
    });
});

module.exports = router;