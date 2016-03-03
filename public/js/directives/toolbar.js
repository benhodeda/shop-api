/**
 * Created by Elad on 2/20/16.
 */

(function() {
    'use strict';

    angular
        .module('shopApp')
        .directive('toolbar', toolbarDirective);

    function toolbarDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'js/directives/toolbar.html'
        };

        return directive;
    }
})();