(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('omdb', OMDBDataservice);

    OMDBDataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    function OMDBDataservice($http, $q, exception, logger) {
        //TODO: Move these to a config file
        var basePath = 'http://www.omdbapi.com/';


        return {
            search: search,
            one: one
        };

        function search(term) {

            return $http.get(basePath, {
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

            return $http.get(basePath, {
                'params': {
                    'i': imdbId,
                    'r': 'json',
                    'type': 'series',
                    'tomatoes': true
                },
                'headers': {'Content-Type': 'application/json'}
            });
        }

    }
})();
