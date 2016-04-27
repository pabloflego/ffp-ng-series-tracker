window.global = [];
(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'dataservice', 'logger', '$filter'];
    function Dashboard($q, dataservice, logger, $filter) {

        /*jshint validthis: true */
        var vm = this;

        activate();

        function activate() {
            var promises = [];

            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

    }
})();
