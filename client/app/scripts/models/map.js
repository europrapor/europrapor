define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    var MapModel = Backbone.Model.extend({
        initialize: function() {
            var url = this.url();

            var Points = Backbone.Collection.extend({
                url: url.substring(0, url.length - 1)
            });
            var Point = Backbone.Model.extend({});
            this.points = new Points([], {model: Point});

            this.url = url.substring(0, url.length - 1) + '/' + this.get('map_id');
            this.fetch();
            this.points.fetch();
        }
    });

    return MapModel;
});
