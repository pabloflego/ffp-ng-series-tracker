(function() {
    'use strict';

    var config = {
        appErrorPrefix: '[FFP Error] ', //Configure the exceptionHandler decorator
        appTitle: 'FFP Series Tracker',
        version: '1.0.0',
        imdbUrl: 'http://www.imdb.com/title/'
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

    configure.$inject = ['$logProvider', '$routeProvider', 'routehelperConfigProvider', 'exceptionHandlerProvider',
        'localStorageServiceProvider'];
    function configure ($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider,
                        localStorageServiceProvider
    ) {
        // Setup localStorage provider
        localStorageServiceProvider.setPrefix('ffpSeriesTracker');

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'FFP Series Tracker: ';
        routehelperConfigProvider.config.resolveAlways = {
            /* @ngInject */
            // ready: function(dataservice) {
            //     return dataservice.ready();
            // }
            ready: ['dataservice', function (dataservice) {
                return dataservice.ready();
            }]
        };

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }
})();
