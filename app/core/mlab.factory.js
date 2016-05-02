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
            basePath    = config.mlab.baseURI + 'databases/' + config.mlab.database + '/';

        return {
            all: all,
            save: save,
            getConfig: getConfig
        };

        /**
         * @description Retrieves all documents
         * @returns {Object} Promise
         */
        function all(collection) {
            collection = collection || config.mlab.collections.listing;
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
        function save(documents, collection) {
            collection = collection || config.mlab.collections.listing;
            var path = basePath + 'collections/' + collection;
            return $http.post(path, JSON.stringify(documents), {
                'params': {'apiKey': apiKey},
                'headers': {'Content-Type': 'application/json'}
            });
        }

        /**
         * Fetch configs from server
         * @returns {Object}
         */
        function getConfig() {
            return all(config.mlab.collections.config);
        }

    }
})();
