(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('mlab', MLabDataStore);

    MLabDataStore.$inject = ['$http', 'localStorageService', 'config'];
    /**
     * Constructor for mLab Mongo DataStore
     * @param $http
     * @param localStorageService
     * @param config
     * @returns {{all: all, save: save}}
     * @constructor
     */
    function MLabDataStore($http, localStorageService, config) {
        var options     = localStorageService.get('options'),
            apiKey      = options.mlab.apiKey,
            collection  = options.mlab.collection,
            basePath    = config.mlab.baseURI + 'databases/' + options.mlab.database + '/';

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
