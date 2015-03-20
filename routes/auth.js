var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.post('/', function (req, res) {
    //var hash = req.params.id;
    //user.getByHash({'username':hash}, req, function(data) {
    //    res.setHeader('Content-Type', 'application/json');
    //    res.end(JSON.stringify(data, null, " "));
    //});
    res.sendStatus(200);
});

router.get('/logout', function (req, res) {
    // user.authenticate(req.body, req, function(err) {
    //     if (err) {
    //         res.sendStatus(500);
    //     }
    //     else {
    //         res.sendStatus(200);
    //     }
    // });
    res.sendStatus(200);
});

module.exports = router;