var express = require('express'),
    events = require('../services/events'),
    router = express.Router();

///
/// Events
///

router.get('/', function (req, res) {
    return events.all(function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(data);
    });
});

router.get('/:id', function (req, res) {
    return events.fetch(req.params.id, function (err, body) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(body);
    });
});

router.post('/', function (req, res) {
    return events.add(req.body, function (err, body) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(body);
    });
});

router.put('/:id', function (req, res) {

    if (!req.body.uuid) {
        req.body.uuid = req.params.id;
    }

    return events.update(req.body, function (err, body) {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(body);
    });
});

router.delete('/:id', function (req, res) {
    return events.delete(req.params.id, function (err, body) {
        if (err) {
            return res.status(500).send(err);
        }

        return res.status(200).send(body);
    });
});

///
/// Vote
///

router.post('/:id/vote', function (req, res) {
    return events.fetch(req.params.id, function (fetchErr, fetchData) {
        if (fetchErr) {
            return res.status(400).send('Event not found');
        }

        if (!fetchData.rating) {
            fetchData.rating = 0;
        }

        if(!req.body.vote){
            return res.status(400).send('Vote not found');
        }

        fetchData.rating += req.body.vote;

        return events.update(fetchData, function (err, body) {
            if (err) {
                return res.status(500).send(err);
            }

            return res.status(200).send({"id": body.uuid})
        });
    });
});


///
/// Picture
///

router.post('/:id/picture', function (req, res) {

    console.log(req.body);
    return events.fetch(req.params.id, function (fetchErr, fetchData) {
        if (fetchErr) {
            return res.status(400).send('Event not found');
        }

        if (!fetchData.pictures) {
            fetchData.pictures = [];
        }
        fetchData.pictures.push(req.body);

        return events.update(fetchData, function (err, body) {
            if (err) {
                return res.status(500).send(err);
            }

            return res.status(200).send({'id': body.uuid})
        });
    });
});

///
/// News
///

router.post('/:id/news', function (req, res) {
    return events.fetch(req.params.id, function (fetchErr, fetchData) {
        if (fetchErr) {
            return res.status(400).send('Event not found');
        }

        if (!fetchData.news) {
            fetchData.news = [];
        }
        fetchData.news.push(req.body);

        return events.update(fetchData, function (err, body) {
            if (err) {
                return res.status(500).send(err);
            }

            return res.status(200).send({'id': body.uuid})
        });
    });
});
module.exports = router;