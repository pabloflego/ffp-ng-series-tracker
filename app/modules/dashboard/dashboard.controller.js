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
        vm.searchMatcher = searchMatcher;
        vm.listSelectCallback = listSelectCallback;
        vm.addSeries = addSeries;

        init();

        function init() {
            var promises = [getSeries()];

            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getSeries() {
            return dataservice.mlab.all()
                .then(function(response) {
                    return vm.table.series = response.data;
                });
        }

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

        function listSelectCallback(item) {
            vm.ta.model.omdb = item;

        }

        function addSeries() {
            dataservice.mlab.save([vm.ta.model])
                .then(init);
        }
    }
})();
