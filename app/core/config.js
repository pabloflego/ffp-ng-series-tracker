(function() {
    'use strict';

    var config = {
        appErrorPrefix: '[FFP Error] ', //Configure the exceptionHandler decorator
        appTitle: 'FFP Series Tracker',
        version: '1.0.0'
    };

    angular.module('app.core')
        .config(toastrConfig)
        .value('config', config)
        .config(configure);

    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    configure.$inject = ['$logProvider', '$routeProvider', 'routehelperConfigProvider', 'exceptionHandlerProvider'];
    function configure ($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'FFP Series Tracker: ';
        var resolveAlways = { /* @ngInject */
            // ready: function(dataservice) {
            //     return dataservice.ready();
            // }
            ready: ['dataservice', function (dataservice) {
               return dataservice.ready();
            }]
        };
        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }
})();
