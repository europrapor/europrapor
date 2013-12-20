define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone, MapModel) {
    var MapsCollection = Backbone.Collection.extend({
        url: 'http://api.europrapor.oxogamestudio.com/maps'
    });

    return MapsCollection;
});
