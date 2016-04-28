(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('mlab', MLabDataStore);

    MLabDataStore.$inject = ['$http', 'localStorageService'];
    /**
     * Constructor for mLab Mongo DataStore
     * @param $http
     * @param localStorageService
     * @returns {{all: all, save: save}}
     * @constructor
     */
    function MLabDataStore($http, localStorageService) {
        var basePath    = localStorageService.get('basePath'),
            apiKey      = localStorageService.get('apiKey'),
            collection  = localStorageService.get('collection');

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
