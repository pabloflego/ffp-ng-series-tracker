(function() {
    'use strict';

    //TODO: Move these to it's own file
    var config = {
        appErrorPrefix: '[FFP Error] ', //Configure the exceptionHandler decorator
        appTitle: 'FFP Series Tracker',
        version: '1.0.0',
        imdbUrl: 'http://www.imdb.com/title/',
        mlab: { baseURI: 'https://api.mlab.com/api/1/' },
        omdb: { baseURI: 'http://www.omdbapi.com/' },
        tmdb: {
            baseURI: 'https://api.themoviedb.org/3/',
            images: {
                basePath: 'http://image.tmdb.org/t/p/<%= size %><%= posterPath %>?api_key=<%= apiKey %>',
                sizes: {
                    '92' :'w92',
                    '154': 'w154',
                    '185': 'w185',
                    '342': 'w342',
                    '500': 'w500',
                    '780': 'w780',
                    original: "original"
                }
            }
        },
        defaultPoster: 'assets/img/default-poster.png'
    };

    angular.module('app.core')
        .config(toastrConfig)
        .config(flashConfig)
        .config(localStorageConfig)
        .value('config', config)
        .config(miscConfig);

    toastrConfig.$inject = ['toastr'];
    /**
     * Configure Toaster
     * @param toastr
     */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    flashConfig.$inject = ['FlashProvider'];
    /**
     * Configure Flash Message
     * @param FlashProvider
     */
    function flashConfig(FlashProvider) {
        // FlashProvider.setTimeout(5000);
        FlashProvider.setShowClose(true);
    }

    localStorageConfig.$inject = ['localStorageServiceProvider'];
    /**
     * Configure localStorage
     * @param localStorageProvider
     */
    function localStorageConfig(localStorageProvider) {
        // Setup localStorage provider
        localStorageProvider.setPrefix('ffpSeriesTracker');
    }

    miscConfig.$inject = ['$logProvider', '$routeProvider', 'routehelperConfigProvider', 'exceptionHandlerProvider'];
    /**
     * Configure Miscellaneous Providers
     * @param $logProvider
     * @param $routeProvider
     * @param routehelperConfigProvider
     * @param exceptionHandlerProvider
     */
    function miscConfig ($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider) {
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
