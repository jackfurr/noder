var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Hello',
        author: {name: '', age:67},
        message: ''
    });
});

module.exports = router;
