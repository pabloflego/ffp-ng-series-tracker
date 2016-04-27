(function() {
    'use strict';

    angular.module('filters.range', [])
        .filter('range', rangeFilter);

    /**
     * Range Iterator filter
     * @returns {Function}
     */
    function rangeFilter() {
        return function(range, upper, lower) {
            upper = parseInt(upper) + 1;
            lower = parseInt(lower) || 0;

            for (var i = lower; i < upper; i++)  range.push(i);

            return range;
        };
    }
})();
