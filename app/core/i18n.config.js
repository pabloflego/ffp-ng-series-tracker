(function() {
    'use strict';

    angular.module('app.core')
        .config(translate);

    translate.$inject = ['$translateProvider'];
    function translate($translateProvider) {
        // Load translation files
        $translateProvider.useStaticFilesLoader({
            prefix: 'app/core/i18n/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
    }
})();
