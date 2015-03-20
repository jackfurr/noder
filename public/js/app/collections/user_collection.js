define([
    'jquery',
    'vendor/underscore',
    'backbone',
    'models/user_model'
], function($, _, Backbone, UserModel) {
    var UserCollection = Backbone.Collection.extend({
        model: UserModel,
        url: '../user',
        initialize: function() {
            console.log('UserCollection::initialize');
        }
    });

    return UserCollection;
});