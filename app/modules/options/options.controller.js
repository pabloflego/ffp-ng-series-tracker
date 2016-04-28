(function() {
    'use strict';

    angular
        .module('app.options')
        .controller('Options', Options);

    Options.$inject = ['lodash', '$q', 'logger', 'localStorageService'];
    /**
     * Options Controller Constructor
     * @param _
     * @param $q
     * @param logger
     * @param localStorageService
     * @constructor
     */
    function Options(_, $q, logger, localStorageService) {

        /*jshint validthis: true */
        var vm = this;
        vm.omdb = {
            basePath: '',
            apiKey: '',
            collection: ''
        };
        vm.save = saveOptions;

        init();

        /**
         * Initialize Controller
         * @returns {*}
         */
        function init() {
            var promises = [getOptions()];
            return $q.all(promises).then(function() {
                logger.info('Activated Options View');
            });
        }

        /**
         * Get options from localStorage
         * @returns {Object} Promise
         */
        function getOptions() {
            return $q.all(
                $q.when(vm.omdb.basePath = localStorageService.get('basePath')),
                $q.when(vm.omdb.apiKey = localStorageService.get('apiKey')),
                $q.when(vm.omdb.collection = localStorageService.get('collection'))
            );
        }

        /**
         * Persist Options through localStorage
         */
        function saveOptions(optionSet) {
            _.each(optionSet, function(value, key) {
                localStorageService.set(key, value);
            });
            logger.info('Options successfully saved');
        }
    }
})();
