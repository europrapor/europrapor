define([
    'jquery',
    'underscore',
    'backbone',
    'openlayers',
    'heatmap',
    'hm-openlayers'
], function ($, _, Backbone, OpenLayers, Heatmap, HeatMapOpenLayers) {
    var DensityMapView = Backbone.View.extend({
        el: '.maps',
        render: function() {
            this.$el.html('<h1>Density Map</h1>');
        }
    });

    return DensityMapView;
});
