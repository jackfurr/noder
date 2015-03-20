define([
    'backbone'
], function(Backbone) {
    'use strict';
    var UserModel = Backbone.Model.extend({
        url: '../user',
        idAttribute: 'user_id',
        id: null,
        defaults: {
            user_id: null,
            user_name: null,
            password: null
        },
        initialize: function() {
            console.log('UserModel::initialize()');
        }
    });

    return UserModel;
});