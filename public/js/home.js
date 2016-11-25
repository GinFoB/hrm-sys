'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the demoApp
 */
hrmApp
    .controller('HomeCtrl', [
        '$scope',
        '$http',
        '$localStorage',
        '$mdDialog',
        '$mdToast',
        '$timeout',
        '$auth',
        '$state',
        'ssSideNav','$window','$location','$rootScope',
        function (
            $scope,
            $http,
            $localStorage,
            $mdDialog,
            $mdToast,
            $timeout,
            $auth,
            $state,
            ssSideNav, $q, $log,$window,$location,$rootScope) {

           $scope.currentUser = {};

            $scope.user = {};

            $scope.$on("$viewContentLoaded", function(event){
                $mdDialog.show({
                    controller: DialogController,
                    parent: angular.element(document.body),
                    templateUrl: 'views/admin/login.html',
                    controllerAs: 'ctrl',
                    clickOutsideToClose:false,
                    targetEvent: event
                }).then(function (add) {
                }, function(loginAA) {
                });
            });


            function DialogController($scope, $mdDialog) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.add = function (client) {
                    console.log(client);
                    $mdDialog.hide(client);
                };
                $scope.edit = function (client) {
                    console.log(client);
                    $mdDialog.hide(client);
                };
                $scope.loginAA = function (user) {
                    var formData = {
                        email: $scope.user.email,
                        password: $scope.user.password
                    };

                    $auth.login(formData).then(function(data) {
                        $http.get('http://localhost/hrm/public/api/users').success(function(users) {
                            var x = JSON.stringify(users.auth);
                            $localStorage.currentUser = x;
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent("Welcome")
                                    .position('top right')
                                    .hideDelay(1500)
                            );
                            $mdDialog.hide(user);

                        }).error(function(error) {
                            console.log(error);

                        });
                    }, function(error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent("Email ou Mot de pass invalide")
                                .position('top right')
                                .hideDelay(1500)
                        );
                    });

                   /* if($scope.user.email === "admin" && $scope.user.password === "admin"){

                    }
                    else {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent("Email ou Mot de pass invalide")
                                .position('top right')
                                .hideDelay(1500)
                        );
                    }*/
                };
            };

                var self = this;
                self.simulateQuery = false;
                self.isDisabled    = false;
                // list of `state` value/display objects
                self.states        = loadAll();
                self.querySearch   = querySearch;
                self.selectedItemChange = selectedItemChange;
                self.searchTextChange   = searchTextChange;
                self.newState = newState;

                function newState(state) {
                        alert("Sorry! You'll need to create a Constitution for " + state + " first!");
                }

                function querySearch (query) {
                        var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
                            deferred;
                        if (self.simulateQuery) {
                                deferred = $q.defer();
                                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                                return deferred.promise;
                        } else {
                                return results;
                        }
                }

                function searchTextChange(text) {
                        $log.info('Text changed to ' + text);
                }

                function selectedItemChange(item) {
                        $log.info('Item changed to ' + JSON.stringify(item));
                }
                /**
                 * Build `states` list of key/value pairs
                 */
                function loadAll() {
                        var allStates = '2016, 2015, 2014, 2013, 2012, 2011, 201O, 2009,\
              2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000';
                        return allStates.split(/, +/g).map( function (state) {
                                return {
                                        value: state.toLowerCase(),
                                        display: state
                                };
                        });
                }
                /**
                 * Create filter function for a query string
                 */
                function createFilterFor(query) {
                        var lowercaseQuery = angular.lowercase(query);
                        return function filterFn(state) {
                                return (state.value.indexOf(lowercaseQuery) === 0);
                        };




	   }
    }

    ]);
//# sourceMappingURL=home.js.map
