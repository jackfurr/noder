var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.get('/', function (req, res) {
    user.getAll(req, function(data) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data, null, " "));
    });
});

router.get('/:id', function (req, res) {
    var hash = req.params.id;
    user.getByHash({'username':hash}, req, function(data) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data, null, " "));
    });
});

router.post('/auth', function (req, res) {
    user.authenticate(req.body, req, function(err) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    });
});

router.post('/', function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    user.insert(input, req, function(err) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    });
});

router.put('/:id', function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    user.update(id, input, req, function(err) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    });
});

router.delete('/:id', function (req, res) {
    var id = req.params.id;
    user.delete(id, req, function(err) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;