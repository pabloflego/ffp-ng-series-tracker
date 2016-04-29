(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'lodash', 'logger', 'dataservice', 'config'];
    /**
     * Dashboard Controller Constructor
     * @param $q
     * @param logger
     * @param dataservice
     * @constructor
     */
    function Dashboard($q, _, logger, dataservice, config) {

        /*jshint validthis: true */
        var vm = this,
        //TODO: Move this to config?
            modelPrototype = {
                omdb: {
                    Title: undefined, Year: undefined, imdbID: undefined, Type: undefined, Poster: undefined
                },
                season: 0,
                episode: 0,
                link: null,
                getIMDBLink: function () {
                    return angular.isDefined(this.omdb.imdbID) ?
                    config.imdbUrl + this.omdb.imdbID : '#';
                },
                populate: function(model) {
                    if (angular.isDefined(model.omdb)) { this.omdb = model.omdb; }
                    if (angular.isDefined(model.season)) { this.season = model.season; }
                    if (angular.isDefined(model.episode)) { this.episode = model.episode; }
                    if (angular.isDefined(model.link)) { this.link = model.link; }
                }
            };

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
        vm.ta = {};
        vm.addSeries = addSeries;
        vm.cancelSelection = cancelSelection;
        vm.listSelectCallback = listSelectCallback;
        vm.searchMatcher = searchMatcher;

        init();

        /**
         * Initialize Controller
         * @returns {*}
         */
        function init() {
            var promises;

            // Reset Typeahead
            _resetTypeahead();

            promises = [_getSeries()];

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
            dataservice.omdb.one(item.imdbID)
                .then(function(response) {
                    vm.ta.model.populate({omdb: response.data});
                });
        }

        /**
         * Saves the selection
         */
        function addSeries() {
            dataservice.mlab.save([vm.ta.model])
                .then(init);
        }

        function cancelSelection() {
            _resetTypeahead();
        }

        /**
         * Resets to the default values
         * @private
         */
        function _resetTypeahead() {
            vm.ta = {
                model: Object.create(modelPrototype),
                selected: undefined
            };

            // vm.ta.model.populate(
            //     {omdb:{Title: "Vikings asdasdasdasd", Year: "2013–", imdbID: "tt2306299", Type: "series", Poster: "http://ia.media-imdb.com/images/M/MV5BOTEzNzI3MDc0N15BMl5BanBnXkFtZTgwMzk1MzA5NzE@._V1_SX300.jpg"}}
            // );
            // vm.ta.selected = "Vikings";
        }
    }
})();
