define([
    'jquery',
    'underscore',
    'backbone',
    'vm'
], function ($, _, Backbone, Vm) {
    var Router = Backbone.Router.extend({
        routes: {
            'map': 'densityMap',
            'maps/:id': 'customMap',

            '*default': 'home'
        }
    });

    var initialize = function (options) {
        var appView = options.appView;
        var router = new Router(options);

        router.on('route:densityMap', function() {
            require(['views/maps/density'], function (DensityMapView) {
                var densityMapView = Vm.reuse('DensityMapView', function() {
                    return new DensityMapView();
                });
                densityMapView.render();
            });
        });
        router.on('route:customMap', function (id) {
            require(['views/maps/custom'], function (CustomMapView) {
                var customMapView = Vm.reuse('CustomMapView', function() {
                    return new CustomMapView({map_id: id});
                });
                customMapView.render();
            });
        });
        router.on('route:home', function() {
            require(['views/home'], function (HomePageView) {
                var homePageView = Vm.reuse('HomePageView', function() {
                    return new HomePageView();
                });
                homePageView.render();
            });
        });


        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
