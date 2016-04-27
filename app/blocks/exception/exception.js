(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    exception.$inject = ['logger'];
    function exception(logger) {
        return {
            catcher: catcher
        };

        function catcher(message) {
            return function(reason) {
                logger.error(message, reason);
            };
        }
    }
})();