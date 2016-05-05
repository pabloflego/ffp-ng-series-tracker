(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$q', 'lodash', 'logger', 'dataservice', 'config', 'localStorageService'];
    /**
     * Dashboard Controller Constructor
     * @param $q
     * @param _
     * @param logger
     * @param dataservice
     * @param config
     * @param localStorageService
     * @constructor
     */
    function Dashboard($q, _, logger, dataservice, config, localStorageService) {

        /*jshint validthis: true */
        var vm = this,
            options = localStorageService.get('options'),
        //TODO: Move this to config?
            modelPrototype = {
                imdb: {
                    id: undefined,
                    original_name: undefined,
                    first_air_date: undefined,
                    poster_path: undefined,
                    imdbID: undefined
                },
                season: 0,
                episode: 0,
                link: null,
                getIMDBLink: function () {
                    return angular.isDefined(this.imdb.imdbID) ?
                    config.imdbUrl + this.imdb.imdbID : '#';
                },
                populate: function(model) {
                    this.imdb = angular.isDefined(model.imdb) ? model.imdb : this.imdb;
                    this.season = angular.isDefined(model.season) ? model.season : this.season;
                    this.episode = angular.isDefined(model.episode) ? model.episode : this.episode;
                    this.link = angular.isDefined(model.link) ? model.link : this.link;
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
        vm.getImagePath = getImagePath;
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
            window.d = dataservice;

            promises = [_getSeries()];

            return $q.all(promises);
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
         * Typeahead matcher function to search using imdb api
         * @param term
         * @returns {Object} Promise
         */
        function searchMatcher(term) {
            return dataservice.imdb.search(term)
                .then(function(response) {
                    var results = response.data.results;
                    if (results && results.length > 0) {
                        return results.map(function (item) {
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
            dataservice.imdb.one(item.id)
                .then(function(response) {
                    vm.ta.model.populate({imdb: response.data});
                });
        }

        /**
         * Get the image path
         * @returns {*}
         */
        function getImagePath(size, path) {
            return dataservice.utils.getImagePath(size, path);
        }

        /**
         * Saves the selection
         */
        function addSeries() {
            dataservice.mlab.save([vm.ta.model])
                .then(init);
        }

        /**
         * Cancel current selection
         */
        function cancelSelection() {
            _resetTypeahead();
        }

        /**
         * Resets to the default values
         * @private
         */
        function _resetTypeahead() {
            vm.ta = {
                isLoading: false, // Whether to show or not loading icon
                selected: undefined, // selected item text
                model: Object.create(modelPrototype) // Selected item model
            };
        }
    }
})();
