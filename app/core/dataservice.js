(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['lodash', '$q', 'exception', 'logger', 'config', 'localStorageService', 'mlab', 'tmdb'];
    function dataservice(_, $q, exception, logger, config, localStorageService, mlab, imdb) {
        var isPrimed = false,
            primePromise,
            options = localStorageService.get('options');

        return {
            ready: ready,
            mlab: {
                all: mlabAll,
                save: mlabSave
            },
            imdb: {
                search: search,
                one: one
            },
            utils: {
                getImagePath: getImagePath
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

        function search(term) {
            return imdb.search(term);
        }

        function one(imdbId) {
            return imdb.one(imdbId);
        }

        /**
         * Buils an img path
         * @param size
         * @param posterPath
         * @param useDefault - If true will return default poster
         * @returns {*}
         */
        function getImagePath(size, posterPath) {
            var path = config.defaultPoster;
            if (!!posterPath) {
                path = _.template(config.tmdb.images.basePath)({
                    size: size,
                    posterPath: posterPath,
                    apiKey: options.tmdb.apiKey
                });
            }

            return path;
        }

    }
})();
