(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'logger', 'dataservice'];
    /**
     * Dashboard Controller Constructor
     * @param $q
     * @param logger
     * @param dataservice
     * @constructor
     */
    function Dashboard($q, logger, dataservice) {

        /*jshint validthis: true */
        var vm = this;

        vm.table = {
            headers: [
                'DASHBOARD.WIDGET_2.TABLE.HEADERS.ORDER',
                'DASHBOARD.WIDGET_2.TABLE.HEADERS.POSTER',
                'DASHBOARD.WIDGET_2.TABLE.HEADERS.TITLE',
                'DASHBOARD.WIDGET_2.TABLE.HEADERS.SEASON',
                'DASHBOARD.WIDGET_2.TABLE.HEADERS.EPISODE',
                'DASHBOARD.WIDGET_2.TABLE.HEADERS.LINK'
            ],
            series: []
        };
        vm.ta = {
            model: {
                omdb: null,
                season: 0,
                episode: 0,
                link: null
            },
            selected: null
        };
        vm.addSeries = addSeries;
        vm.listSelectCallback = listSelectCallback;
        vm.searchMatcher = searchMatcher;

        init();

        /**
         * Initialize Controller
         * @returns {*}
         */
        function init() {
            var promises = [_getSeries()];

            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        /**
         * Fetches the list of series
         * @private
         * @returns {Object} Promise
         */
        function _getSeries() {
            return dataservice.mlab.all()
                .then(function(response) {
                    return vm.table.series = response.data;
                });
        }

        /**
         * Typeahead matcher function to search using omdb api
         * @param term
         * @returns {Object} Promise
         */
        function searchMatcher(term) {
            return dataservice.omdb.search(term)
                .then(function(response) {
                    if (response.data.Response === 'True') {
                        return response.data.Search.map(function (item) {
                            return item;
                        });
                    }
                    return null;
                });
        }

        /**
         * Executed upon selecting an element in the typeahead list
         * @param item
         */
        function listSelectCallback(item) {
            vm.ta.model.omdb = item;

        }

        /**
         * Saves the selection
         */
        function addSeries() {
            dataservice.mlab.save([vm.ta.model])
                .then(init);
        }
    }
})();
