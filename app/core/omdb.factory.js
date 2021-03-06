(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('omdb', OMDBDataservice);

    OMDBDataservice.$inject = ['$http', 'config'];
    function OMDBDataservice($http, config) {

        return {
            search: search,
            one: one
        };

        function search(term) {

            return $http.get(config.omdb.baseURI, {
                'params': {
                    's': term,
                    'r': 'json',
                    'type': 'series',
                    'page': 1
                },
                'headers': {'Content-Type': 'application/json'}
            });
        }

        function one(imdbId) {

            return $http.get(config.omdb.baseURI, {
                'params': {
                    'i': imdbId,
                    'r': 'json',
                    'type': 'series',
                    'tomatoes': false
                },
                'headers': {'Content-Type': 'application/json'}
            });
        }

    }
})();
