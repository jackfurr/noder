requirejs.config({
    paths: {
        'baseUrl': '../../js',
        'vendor': 'vendor',
        'templates': 'templates',
        'jquery': '../../js/vendor/jquery/jquery-1.11.2',
        'bootstrap': '../../js/vendor/bootstrap-3.3.2-dist/js/bootstrap',
        'backbone': '../../js/vendor/backbone',
        'underscore': '../../vendor/underscore',
        'text': '../../js/vendor/text.min',
        'mustache': '../../js/vendor/mustache',
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
            deps: ['vendor/underscore', 'jquery'],
            exports: 'Backbone'
        },
        'text': {
            deps: ['backbone']
        }
    }
});

require([
    'app'
], function(App) {
        App.initialize();
    }
);
