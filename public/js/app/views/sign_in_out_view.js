define([
    'jquery',
    'backbone',
    'mustache',
    'text!templates/sign_in_view.html',
    'text!templates/sign_out_view.html'
], function($, Backbone, Mustache, SignInViewTemplate, SignOutViewTemplate){

    var SignInOutView = Backbone.View.extend({
        options: null,
        initialize : function(options) {
            this.options = options;
            Backbone.Events.on('SignInOutView:render', function(el) {
                console.log('SignInOutView:render');
                console.log(this);
                this.el = el;
                this.render();
            }, this);
        },
        render: function(){
            this.el.html(Mustache.render(SignInViewTemplate, {}));
            return this;
        }
    });

    return SignInOutView;
});