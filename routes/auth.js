var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.post('/', function (req, res) {
    //var hash = req.params.id;
    //user.getByHash({'username':hash}, req, function(data) {
    //    res.setHeader('Content-Type', 'application/json');
    //    res.end(JSON.stringify(data, null, " "));
    //});
    user.authenticate(req.params, req, function(err) {
        console.log('user.authenticate');
        res.sendStatus(200);
    })
});

router.get('/logout', function (req, res) {
    req.session.destroy(function destroySession(err) {
        console.log('req.session.destroy');
    });

    res.sendStatus(200);
});

module.exports = router;