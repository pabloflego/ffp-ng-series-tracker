/**
 * Core module, contains the verticals of the app
 */
(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.vendors',
        'filters.range',
        /*
         * 3rd Party modules
         */
        'ngplus', 'pascalprecht.translate'
    ]);
})();
