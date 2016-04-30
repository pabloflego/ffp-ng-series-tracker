(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('tmdb', TMDBDataservice);

    TMDBDataservice.$inject = ['$http', 'config', 'localStorageService'];
    function TMDBDataservice($http, config, localStorageService) {
        var options     = localStorageService.get('options'),
            apiKey      = options.tmdb.apiKey,
            basePath    = config.tmdb.baseURI;

        return {
            search: search,
            one: one
        };

        function search(term) {
            var path = basePath + 'search/tv';
            return $http.get(path, {
                'params': {
                    'api_key': apiKey,
                    'query': term,
                    'page': 1
                },
                'headers': {'Content-Type': 'application/json'}
            });
        }

        function one(id) {
            var path = basePath + 'tv/' + id;
            return $http.get(path, {
                'params': {
                    'api_key': apiKey
                },
                'headers': {'Content-Type': 'application/json'}
            });
            // return $q.resolve(imdbId);
        }

    }
})();
