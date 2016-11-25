/**
 * Created by akramkhalifa on 25/08/2016.
 */
hrmApp.controller('HomeCtrl',['$scope','$mdSidenav',
    function ($scope,$mdSidenav) {

            this.toggleNavigation = function() {
                    $mdSidenav('navigation-drawer').toggle();
            };

    }]);
//# sourceMappingURL=HomeCtrl.js.map
