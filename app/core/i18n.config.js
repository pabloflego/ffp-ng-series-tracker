(function() {
    'use strict';

    angular.module('app.core')
        .config(translate);

    translate.$inject = ['$translateProvider'];
    function translate($translateProvider) {
        var en = {
                "GLOBAL": {
                    "APP_NAME": "FFP Series Tracker"
                },
                "DASHBOARD": {
                    "TABLE": {
                        "HEADERS": {
                            "ORDER": "#",
                            "POSTER": "Poster",
                            "TITLE": "Title",
                            "SEASON": "Season",
                            "EPISODE": "Episode",
                            "LINK": "Watch"
                        }
                    },
                    "TYPEAHEAD": {
                        "MATCH": {
                            "YEAR": "Year: "
                        }
                    }
                }
            },
            es = {
                "GLOBAL": {
                    "APP_NAME": en.GLOBAL.APP_NAME
                }
            };

        $translateProvider.translations('en', en);
        // $translateProvider.translations('es', es);
        $translateProvider.preferredLanguage('en');
    }
})();
