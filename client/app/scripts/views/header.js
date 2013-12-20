define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header.tpl',
    'models/map',
    'collections/maps',
    'bootstrap'
], function ($, _, Backbone, HeaderTemplate, MapModel, MapsCollection) {
    var HeaderView = Backbone.View.extend({
        el: '.page-header',
        collection: new MapsCollection([], {model: MapModel}),
        render: function() {
            var self = this;

            this.collection.fetch({
                success: function (collection, data) {
                    self.$el.html(_.template(HeaderTemplate, {maps: data}));
                }
            });
        }
    });

    return HeaderView;
});
