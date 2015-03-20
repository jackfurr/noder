define([
    'jquery',
    'backbone',
    'mustache',
    'text!templates/default_view.html'
], function($, Backbone, Mustache, DefaultViewTemplate){

    var DefaultView = Backbone.View.extend({
        options: null,
        initialize : function(options) {
            this.options = options;
        },
        render: function(){
            Backbone.Events.trigger('nav_bar_view:update', null);
            this.$el.html(Mustache.render(DefaultViewTemplate, {}));
            return this;
        }
    });

    return DefaultView;
});