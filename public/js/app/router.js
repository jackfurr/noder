define([
    'jquery',
    'backbone'
], function($, Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            'account': 'accountPageView',
            '*actions': 'default'
        }
    });

    var initialize = function(){
        var _app = window.AppData;
        var app_router = new AppRouter();

        Backbone.Events.on('nav_bar_view:update', function() {
            if (undefined === this.navBarView) {
                var self = this;
                require(['views/nav_bar_view'], function(NavBarView) {
                    self.navBarView = new NavBarView();
                    $("#nav_bar_view").html(self.navBarView.render().el);
                });
            }
            else {
                $("#nav_bar_view").html(this.navBarView.render().el);
            }
        });

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

        app_router.on('route:accountPageView', function () {
            if (undefined === this.accountView) {
                var self = this;
                require(['views/account_view'], function(AccountView) {
                    self.accountView = new AccountView();
                    $("#content").html(self.accountView.render().el);
                });
            }
            else {
                $("#content").html(this.accountView.render().el);
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