/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        openlayers: {
            exports: 'OpenLayers'
        },
        'hm-openlayers': {
            deps: ['openlayers'],
            exports: 'OpenLayers.Layer.Heatmap'
        },
        'hm-renderer': {
            deps: ['openlayers'],
            exports: 'OpenLayers.Renderer.Heatmap'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        vm: '../bower_components/backbone-view-manager/src/vm',
        text: '../bower_components/requirejs-text/text',

        bootstrap: 'vendor/bootstrap',
        openlayers: 'vendor/openlayers',
        heatmap: 'vendor/heatmap',
        'hm-openlayers': 'vendor/heatmap-openlayers',
        'hm-renderer': 'vendor/heatmap-openlayers-renderer',
        tile: 'vendor/tile.stamen',

        templates: '../templates',
        models: 'models',
        collections: 'collections'
    }
});

require([
    'views/app',
    'router',
    'vm'
], function (AppView, Router, Vm) {
    var appView = Vm.reuse('AppView', function() {
        return new AppView();
    });

    appView.render();

    Router.initialize({appView: appView});
});
