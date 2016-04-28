(function() {
    'use strict';

    angular.module('app.core')
        .config(translate);

    translate.$inject = ['$translateProvider'];
    function translate($translateProvider) {
        //TODO: Move these to a language file

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/core/i18n/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
    }
})();
