(function() {
    'use strict';

    angular
        .module('app.options')
        .controller('Options', Options);

    Options.$inject = ['$q', 'logger'];
    /**
     * Options Controller Constructor
     * @param $q
     * @param logger
     * @constructor
     */
    function Options($q, logger) {

        /*jshint validthis: true */
        var vm = this;

        init();

        /**
         * Initialize Controller
         * @returns {*}
         */
        function init() {
            var promises = [];

            return $q.all(promises).then(function() {
                logger.info('Activated Options View');
            });
        }
    }
})();
