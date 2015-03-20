var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Memcached = require('memcached');

var config = require('./config');
var routes = require('./routes/index');
var user = require('./routes/user');
var auth = require('./routes/auth');

var session = require('express-session');
var SessionStore = require('express-mysql-session');
var sessionStore = new SessionStore(config.db);

var app = express();

app.use(session({
  key: 'session_cookie_name',
  secret: config.session_secret,
  store: sessionStore,
  resave: true,
  saveUninitialized: true
}));

memcached = new Memcached(config.mc);

var connection = require('express-myconnection');
var mysql = require('mysql');
app.use(connection(mysql, config.db, 'request'));

// The `consolidate` adapter module
var cons = require('consolidate');

// .hbs files should be handled by `handlebars`
// `consolidate` takes care of loading `handlebars` and interfacing it with Express
app.engine('hbs', cons.handlebars);

// we set 'hbs' as the default extension of template files
// this is optional, but you have to specify the view files's extension if you don't
// it defaults to 'jade'
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user', user);
app.use('/auth', auth);

process.on('uncaughtException', function (err) {
  console.error('uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});

app.get('/health', function (req, res) {
  res.send({
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;