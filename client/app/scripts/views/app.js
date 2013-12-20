define([
    'jquery',
    'underscore',
    'backbone',
    'vm',
    'text!templates/layout.html'
], function ($, _, Backbone, Vm, LayoutTemplate) {
    var AppView = Backbone.View.extend({
        el: '.app',
        render: function() {
            var self = this;

            this.$el.html(LayoutTemplate);

            require(['views/header'], function (HeaderView) {
                var headerView = Vm.create('HeaderView', function() {
                    return new HeaderView();
                });
                headerView.render();
            });
        }
    });

    return AppView;
});
