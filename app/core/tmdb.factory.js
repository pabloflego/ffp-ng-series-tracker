(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('tmdb', TMDBDataservice);

    TMDBDataservice.$inject = ['lodash', '$http', 'config', 'localStorageService'];
    function TMDBDataservice(_, $http, config, localStorageService) {
        var options  = localStorageService.get('options'),
            apiKey   = options.tmdb.apiKey,
            basePath = config.tmdb.baseURI,
            //TODO: make this a global config
            locale   = 'es';

        return {
            search: search,
            one: one,
            getImagePath: getImagePath
        };

        function search(term) {
            var path = basePath + 'search/tv';
            return $http.get(path, {
                'params': {
                    'api_key': apiKey,
                    'query': term,
                    'language': locale,
                    'page': 1
                },
                'headers': {'Content-Type': 'application/json'},
                'hideOverlay': true // Avoid showing main loading overlay
            });
        }

        function one(id) {
            var path = basePath + 'tv/' + id;
            return $http.get(path, {
                'params': {
                    'api_key': apiKey,
                    'language': locale
                },
                'headers': {'Content-Type': 'application/json'}
            });
        }

        /**
         * Builds an img path from TBDb
         * @param {String} size - Available Sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
         * @param {String} posterPath - Poster path given by the TMDb API
         * @returns {String}
         */
        function getImagePath(size, posterPath) {
            var path = config.defaultPoster;
            // Make sure to receive a valid string
            if (typeof posterPath == 'string' && posterPath.length) {
                // Get the tempalte and create the link path
                path = _.template(config.tmdb.images.basePath)({
                    size: size,
                    posterPath: posterPath,
                    apiKey: options.tmdb.apiKey
                });
            }

            return path;
        }

    }
})();
