// Private
var sha1 = require('node-sha1');
var Memcached = require('memcached');
var config = require('../config');
var memcached = new Memcached(config.mc);


/*
mysql> desc user;
+---------------+---------------------+------+-----+---------+----------------+
| Field         | Type                | Null | Key | Default | Extra          |
+---------------+---------------------+------+-----+---------+----------------+
| id            | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
| username      | varchar(50)         | NO   | UNI | NULL    |                |
| password_hash | varchar(40)         | NO   |     | NULL    |                |
+---------------+---------------------+------+-----+---------+----------------+
*/

// Public
module.exports = {
    getCacheKey: function(functionName, post) {
        return "user:"+functionName+":"+post;
    },
    getAll: function(req, callback) {
        var cacheKey = this.getCacheKey('getAll', '');

        memcached.get(cacheKey, function(err, result) {
            if (err) {
                throw err;
            }

            if (undefined === result) {
                req.getConnection(function(err, connection) {
                    connection.query('SELECT * FROM user', function(err, rows) {
                        if (err) {
                            throw err;
                        }

                        memcached.set(cacheKey, rows, 86400, function(err, result) {
                            if(err) {
                                throw err;
                            }
                        });

                        callback(rows);
                    });
                });
            }
            else {
                callback(result);
            }
        });
    },
    getByHash: function(queryParams, req, callback) {
        var cacheKey = this.getCacheKey('getByHash', queryParams.username);
        memcached.get(cacheKey, function(err, result) {
            if (err) {
                throw err;
            }

            if (undefined === result) {
                req.getConnection(function(err, connection) {
                    connection.query('SELECT * FROM user WHERE ?', queryParams, function(err, rows) {
                        if (err) {
                            throw err;
                        }

                        memcached.set(cacheKey, rows, 86400, function(err, result) {
                            if (err) {
                                throw err;
                            }
                        });

                        callback(rows);
                    });
                });
            }
            else {
                callback(result);
            }
        });
    },
    generatePasswordHash: function(password) {
        return sha1(password + config.pswd_salt);
    },
    authenticate: function(params, req, next) {
        var self = this;

        // ToDo: is the user in memcache?

        // does the sha1 param password match the one in memcache/database?
        var data = {
            username        : params.username,
            password_hash   : this.generatePasswordHash(params.password)
        };

        req.getConnection(function(err, connection) {
            connection.query('SELECT * FROM user WHERE username = ? AND password_hash = ? ', [data.username, data.password_hash], function(err, rows) {
                if (err) {
                    throw err;
                }

                next(err, {success:true});
            });
        });

    },
    insert: function(queryParams, req, next) {
        var self = this;
        req.getConnection(function(err, connection) {
            err = null;
            if (queryParams.password !== queryParams.password2) {
                next(err, {success:false});
            }

            var data = {
                username        : queryParams.username,
                password_hash   : self.generatePasswordHash(queryParams.password)
            };

            connection.query('INSERT INTO user SET ? ', data, function(err, rows) {
                if (err) {
                    throw err;
                }

                memcached.delete(_this.getCacheKey('getAll', ''), function(err, result) {
                    if(err) {
                        throw err;
                    }
                });

                next(err, {success:true});
            });
        });
    },
    delete: function(id, req, next) {
        req.getConnection(function(err, connection) {
            err = null;

            var data = {
                username: id
            };

            connection.query("DELETE user where ? ", data, function(err, rows) {
                if (err) {
                    throw err;
                }

                next(err, {success:true});
            });
        });
    }
};