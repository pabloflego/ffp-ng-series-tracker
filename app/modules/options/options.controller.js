(function() {
    'use strict';

    angular
        .module('app.options')
        .controller('Options', Options);

    Options.$inject = ['lodash', '$q', 'logger', 'localStorageService', '$window', '$timeout', 'Flash'];
    /**
     * Options Controller Constructor
     * @param _
     * @param $q
     * @param logger
     * @param localStorageService
     * @constructor
     */
    function Options(_, $q, logger, localStorageService, $window, $timeout, flash) {

        /*jshint validthis: true */
        var vm = this;
        // Provide defaults (Needed to actually show each option)
        vm.options = {
            mlab: {
                apiKey: '',
                database: '',
                collection: ''
            },
            tmdb: {
                apiKey: ''
            }
        };


        vm.save = saveOptions;
        vm.getTranslationKey = getTranslationKey;

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
            return $q.when(_.assign(vm.options, localStorageService.get('options')));
        }

        /**
         * Persist Options through localStorage
         */
        function saveOptions() {
            localStorageService.set('options', vm.options);
            logger.info('Options successfully saved');

            flash.create('success', 'Options successfully saved');

            $timeout(function() {
                $window.location.reload();
            }, 1000);
        }

        /**
         * Build dynamically the translation key
         * @param id
         * @param suffix
         * @returns {string}
         */
        function getTranslationKey(id, suffix) {
            return 'OPTIONS.SECTIONS.' + id.toUpperCase() + '.' + suffix;
        }
    }
})();
