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
                'DASHBOARD.TABLE.HEADERS.ORDER',
                'DASHBOARD.TABLE.HEADERS.POSTER',
                'DASHBOARD.TABLE.HEADERS.TITLE',
                'DASHBOARD.TABLE.HEADERS.SEASON',
                'DASHBOARD.TABLE.HEADERS.EPISODE',
                'DASHBOARD.TABLE.HEADERS.LINK'
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
