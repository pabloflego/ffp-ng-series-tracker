(function() {
    'use strict';

    angular.module('app.core')
        .config(translate);

    translate.$inject = ['$translateProvider'];
    function translate($translateProvider) {
        var en = {
                'GLOBAL': {
                    'APP_NAME': "FFP Series Tracker"
                },
                'DASHBOARD': {
                    'WIDGET_1': {
                        'TITLE': 'Resumen',
                        'THEAD': [
                            'Concepto', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                        ],
                        'TFOOT': [ 'Totales:' ]
                    },
                    'WIDGET_2': {
                        'TITLE': 'Nuevo'
                    }
                }
            },
            es = {
                'GLOBAL': {
                    'APP_NAME': en.GLOBAL.APP_NAME
                }
            };

        $translateProvider.translations('en', en);
        $translateProvider.translations('es', es);
        $translateProvider.preferredLanguage('en');
    }
})();
