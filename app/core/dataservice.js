(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q', 'exception', 'logger', 'mlab', 'omdb'];
    function dataservice($q, exception, logger, mlab, omdb) {
        var isPrimed = false;
        var primePromise;

        return {
            ready: ready,
            mlab: {
                all: mlabAll,
                save: mlabSave
            },
            omdb: {
                search: omdbSearch,
                one: omdbOne
            }
        };

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

        function mlabAll() {
            return mlab.all();
        }

        function mlabSave(documents) {
            return mlab.save(documents);
        }

        function omdbSearch(term) {
            return omdb.search(term);
        }

        function omdbOne(imdbId) {
            return omdb.one(imdbId);
        }

    }
})();
