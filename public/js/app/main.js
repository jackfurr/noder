requirejs.config({
    paths: {
        'baseUrl': '../../js',
        'vendor': 'vendor',
        'templates': 'templates',
        'jquery': '../../js/vendor/jquery/jquery-1.11.2',
        'bootstrap': '../../js/vendor/bootstrap-3.3.2-dist/js/bootstrap',
        'backbone': '../../js/vendor/backbone/backbone',
        'underscore': '../../js/vendor/underscore/underscore',
        'mustache': '../../js/vendor/mustache/mustache',
        'text': '../../js/vendor/text/text'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'Bootstrap'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'text': {
            deps: ['backbone']
        },
    }
});

require([
    'app'
], function(App) {
        App.initialize();
    }
);
