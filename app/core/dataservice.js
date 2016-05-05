(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['lodash', '$q', 'exception', 'logger', 'localStorageService', 'mlab', 'tmdb'];
    function dataservice(_, $q, exception, logger, localStorageService, mlab, imdb) {
        var isPrimed = false,
            primePromise,
            options = localStorageService.get('options');

        return {
            ready: ready,
            mlab: {
                all: mlab.all,
                save: mlab.save
            },
            imdb: {
                search: imdb.search,
                one: imdb.one
            },
            utils: {
                getImagePath: imdb.getImagePath
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
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
