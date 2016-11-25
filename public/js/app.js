/**
 * Created by akramkhalifa on 24/08/2016.
 */
var hrmApp = angular.module('hrmApp',['ngMaterial','ngFileUpload','ngResource','ngMessages','ngStorage','satellizer','sasrio.angular-material-sidenav','md.data.table','ui.router','ngRoute','ngCookies']);

hrmApp.config([
    '$mdThemingProvider',
    '$locationProvider',
    '$urlRouterProvider',
    '$stateProvider',
    'ssSideNavSectionsProvider',
    '$httpProvider','$urlRouterProvider','$authProvider',
    function (
        $mdThemingProvider,
        $locationProvider,
        $urlRouterProvider,
        $stateProvider,
        ssSideNavSectionsProvider,
        $httpProvider,$urlRouterProvider, $authProvider) {
/*
        $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
        $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();*/


        $mdThemingProvider
            .theme('default')
            .primaryPalette('light-blue').accentPalette('orange');

        $authProvider.loginUrl = 'https://shrm.herokuapp.com/authenticate';

        // Redirect to the auth state if any other states
        // are requested other than users
       // $urlRouterProvider.otherwise('/error');

        $urlRouterProvider.otherwise(function () {
            return '/';
        });



        $stateProvider.state({
            name: 'common',
            abstract: true,
            templateUrl: 'views/_common.html',
            controller: 'CommonCtrl'
        });

        $stateProvider.state({
            name: 'common.home',
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        });

        $stateProvider.state({
            name: 'common.toggle1',
            url: '/tab',
            abstract: true,
            template: '<ui-view/>'
        });

        $stateProvider.state({
            name: 'common.toggle1.item1',
            url: '/facture_en_retard',
            templateUrl: 'views/fenRetard.html',
            controller: 'factureRetatCtrl'

        });

        $stateProvider.state({
            name: 'common.toggle1.item2',
            url: '/facture_a_encaisser',
            templateUrl: 'views/facEncaisser.html',
            controller: 'factureEnCtrl'
        });

        $stateProvider.state({
            name: 'common.toggle1.item3',
            url: '/prestations_en_retard',
            templateUrl: 'views/prstatEnRet.html',
            controller: 'PrestationRetCtrl'
        });


        $stateProvider.state({
            name: 'common.toggle1.item4',
            url: '/prestations_a_payer',
            templateUrl: 'views/prstatPay.html',
            controller: 'PrestationPayCtrl'
        });


        $stateProvider.state({
            name: 'common.client',
            url: '/clients',
            templateUrl: 'views/client.html',
            controller: 'ClientCtrl'
        });

        $stateProvider.state({
            name: 'common.consultant',
            url: '/consultants',
            templateUrl: 'views/consultant/consultant.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Link 2'
                };
            }
        });

        $stateProvider.state({
            name: 'common.mission',
            url: '/missions',
            templateUrl: 'views/mission/mission.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Link 3'
                };
            }
        });

        $stateProvider.state({
            name: 'common.prest',
            url: '/prestations',
            templateUrl: 'views/prestation/prestation.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Link 4'
                };
            }
        });

        $stateProvider.state({
            name: 'common.caisse',
            url: '/caisse',
            templateUrl: 'views/caisse/caisse.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Link 5'
                };
            }
        });

        $stateProvider.state({
            name: 'common.stat',
            url: '/statistiques',
            templateUrl: 'views/default.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Link 6'
                };
            }
        });

        $stateProvider.state({
            name: 'common.admin',
            url: '/admin',
            templateUrl: 'views/admin/admin.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Link 7'
                };
            }
        });

        $stateProvider.state({
            name: 'common.link2',
            url: '/link2',
            templateUrl: 'views/default.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Link 2'
                };
            }
        });

        $stateProvider.state({
            name: 'common.link2.edit',
            url: '/edit',
            templateUrl: 'views/default.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Link 2'
                };
            }
        });

        $stateProvider.state({
            name: 'common.link3',
            url: '/link3',
            templateUrl: 'views/default.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Link 3'
                };
            }
        });

        $stateProvider.state({
            name: 'common.toggle2',
            url: '/toogle2',
            abstract: true,
            template: '<ui-view/>'
        });

        $stateProvider.state({
            name: 'common.toggle2.item1',
            url: '/item1',
            templateUrl: 'views/default.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Toogle 2 Item 1'
                };
            }
        });

        $stateProvider.state({
            name: 'common.toggle3',
            url: '/toogle3',
            abstract: true,
            template: '<ui-view/>'
        });

        $stateProvider.state({
            name: 'common.toggle3.item1',
            url: '/item1',
            templateUrl: 'views/default.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Toogle 3 Item 1'
                };
            }
        });

        $stateProvider.state({
            name: 'common.toggle3.item2',
            url: '/item2',
            templateUrl: 'views/default.html',
            controller: function ($scope) {
                $scope.model = {
                    title: 'Hello Toogle 3 Item 2'
                };
            }
        });

        ssSideNavSectionsProvider.initWithTheme($mdThemingProvider);

        ssSideNavSectionsProvider.initWithSections([{
            id: 'toogle_1',
            type: 'heading',
            children: [{
                name: 'Tableau de bord',
                type: 'toggle',
                pages: [{
                    id: 'toogle_1_link_1',
                    name: 'Factures en retard',
                    state: 'common.toggle1.item1'
                }, {
                    id: 'toogle_1_link_2',
                    name: 'Factures à encaisser',
                    state: 'common.toggle1.item2'
                }, {
                    id: 'toogle_1_link_3',
                    name: 'Prestations en retard',
                    state: 'common.toggle1.item3'
                },
                 {
                     id: 'toogle_1_link_4',
                     name:'Prestations à payer',
                     state: 'common.toggle1.item4'
                  }]
            }]
        },
            {
                id: 'link_1',
                name: 'Clients',
                state: 'common.client',
                type: 'link',
                icon: 'fa fa-users'
            },
            {
                id: 'link_2',
                name: 'Consultants',
                state: 'common.consultant',
                type: 'link',
                icon: 'fa fa-user'
            },
            {
                id: 'link_3',
                name: 'Missions',
                state: 'common.mission',
                type: 'link',
                icon: 'fa fa-tasks'

            },
            {
                id: 'link_4',
                name: 'Prestations',
                state: 'common.prest',
                type: 'link',
                icon:'fa fa-suitcase'
            },
            {
                id: 'link_5',
                name: 'Caisse',
                state: 'common.caisse',
                type: 'link',
                icon: 'fa fa-university'
            },
            {
                id: 'link_6',
                name: 'Statistiques',
                state: 'common.stat',
                type: 'link',
                icon: 'fa fa-area-chart'

            },
            {
                id: 'link_7',
                name: 'Administration',
                state: 'common.admin',
                type: 'link',
                icon:'fa fa-home'
            }]);

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $location.path('/');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }
]);