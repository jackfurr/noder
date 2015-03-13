define([
    'jquery',
    'backbone'
], function($, Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '*actions': 'default'
        }
    });

    var initialize = function(){
        var _app = window.AppData;
        var app_router = new AppRouter();

        app_router.on('route:default', function () {
            if (undefined === this.defaultView) {
                var self = this;
                require(['views/default_view'], function(DefaultView) {
                    self.defaultView = new DefaultView();
                    $("#content").html(self.defaultView.render().el);
                });
            }
            else {
                $("#content").html(this.defaultView.render().el);
            }
        });

        Backbone.Events.on('navigate:back', function() {
            Backbone.history.history.back();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});