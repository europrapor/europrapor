define([
    'jquery',
    'underscore',
    'backbone',
    'collections/maps',
    'text!templates/home.tpl'
], function ($, _, Backbone, MapsCollection, HomePageTemplate) {
    var HomePageView = Backbone.View.extend({
        el: '.maps',
        template: _.template(HomePageTemplate),
        render: function() {
            this.$el.html(this.template);
        }
    });

    return HomePageView;
});
