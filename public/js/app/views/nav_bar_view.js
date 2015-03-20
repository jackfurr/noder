define([
    'jquery',
    'backbone',
    'mustache',
    'text!templates/nav_bar_view.html',
    'views/sign_in_out_view'
], function($, Backbone, Mustache, NavBarViewTemplate, SignInOutView){

    var NavBarView = Backbone.View.extend({
        options: null,
        initialize : function(options) {
            this.options = options;
            this.signInOutView = new SignInOutView();
        },
        render: function(){
            this.$el.html(Mustache.render(NavBarViewTemplate, {}));
            // is the user logged in?
            Backbone.Events.trigger('SignInOutView:render', $(this.el).find('#sign-in-out'));


            return this;
        }
    });

    return NavBarView;
});