(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('mlab', MLabDataservice);

    MLabDataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    function MLabDataservice($http, $q, exception, logger) {
        //TODO: Move these to a config file
        var basePath = 'https://api.mlab.com/api/1/databases/ffp/',
            apiKey = 'sR0pFh8gOD59B8ld8ygL7Yyj8SWK767C',
            collection = 'Series';


        return {
            all: all,
            save: save
        };

        /**
         * @description Retrieves all documents
         * @returns {Object} Promise
         */
        function all() {
            var path = basePath + 'collections/' + collection;
            return $http.get(path, {
                'params': {'apiKey': apiKey},
                'headers': {'Content-Type': 'application/json'}
            });
        }

        /**
         * @description Saves documents
         * @param {Array} documents
         * @returns {Object} Promise
         */
        function save(documents) {
            var path = basePath + 'collections/' + collection;
            return $http.post(path, JSON.stringify(documents), {
                'params': {'apiKey': apiKey},
                'headers': {'Content-Type': 'application/json'}
            });
        }

    }
})();
