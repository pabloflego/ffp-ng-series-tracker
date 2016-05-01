(function() {
    'use strict';

    angular
        .module('app.options')
        .run(appRun);

    appRun.$inject = ['routehelper'];
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/options',
                config: {
                    templateUrl: 'app/modules/options/options.html',
                    controller: 'Options',
                    controllerAs: 'vm',
                    title: 'Options',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-cogs"></i> Options'
                    }
                }
            }
        ];
    }
})();
