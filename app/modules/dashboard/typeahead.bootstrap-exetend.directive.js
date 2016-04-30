(function () {
    'use strict';

    /**
     * This is to extend Bootstrap original directives functionality
     **/
    angular
        .module('app.dashboard')
        .directive('uibTypeaheadMatch', typeaheadMatch);

    typeaheadMatch.$inject = ['dataservice'];
    /**
     * Add extra functionality to typeahead match template
     * @param dataservice
     * @returns {Object}
     */
    function typeaheadMatch(dataservice) {
        return {
            restrict: 'EA',
            link: function typeaheadMatchLink(scope, el, attr, ctrl) {
                var innerScope = angular.element(el).isolateScope();

                innerScope.getImagePath = function() {
                    return dataservice.utils.getImagePath(
                        'w92', innerScope.match.model.poster_path
                    );
                };
            }
        };
    }
})();
