define([
    'jquery',
    'backbone',
    'mustache',
    'text!templates/account_view.html'
], function($, Backbone, Mustache, AccountViewTemplate){

    var AccountView = Backbone.View.extend({
        options: null,
        initialize : function(options) {
            this.options = options;
        },
        render: function(){
            this.$el.html(Mustache.render(AccountViewTemplate, {}));
            return this;
        }
    });

    return AccountView;
});