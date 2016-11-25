/**
 * Created by akramkhalifa on 29/08/2016.
 */
'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the demoApp
 */
hrmApp
    .controller('ClientCtrl',['ClientService','$http','$mdEditDialog', '$scope','$mdDialog','$timeout','$mdBottomSheet', '$mdToast',
        function (
            ClientService,$http,$mdEditDialog, $scope,$mdDialog, $timeout,$mdBottomSheet, $mdToast) {

            $scope.rasions =  $http({
                            method: 'GET',
                            url: 'http://localhost/hrm/public/api/raisons'
                            }).success(function (data) {
                                    $scope.rasions = data;
                            }).error(function (data) {
                                console.log(data);
                        });

            $scope.selectedRasions;
            $scope.getselectedRasions = function() {
                if ($scope.selectedRasions !== undefined) {
                    return  $scope.selectedRasions;
                } else {
                    return "Raison Sociale";
                }
            };

        /* select villes */

            $scope.villes = [" ","RABAT", "CASABLANCA", "TANGER", "FES", "Salé", "Marrakech", "Meknes"];
            $scope.selectedVilles;
            $scope.getselectedVilles = function() {
                if ($scope.selectedVilles !== undefined) {
                    return  $scope.selectedVilles;
                } else {
                    return "Ville";
                }
            };

        /* delete row in table*/

            var bookmark;

            $scope.errors = [];

            $scope.id = null;
            $scope.clients = [];
            $scope.huge = [];

            $scope.selected = [];
            $scope.limitOptions = [5, 10, 15, {
                label: 'All',
                value: function () {
                    return $scope.clients ? $scope.clients.count : 0;
                }
            }];

            $scope.options = {
                rowSelection: true,
                multiSelect: true,
                autoSelect: true,
                decapitate: false,
                largeEditDialog: false,
                boundaryLinks: false,
                limitSelect: true,
                pageSelect: true
            };

            $scope.query = {
                order: 'raison',
                limit: 5,
                page: 1
            };


            $scope.init = function () {
                ClientService.getClients().$promise.then(function (data) {
                        $scope.clients = {
                         "count":data.length,
                         "data":data
                         };
                });
                $scope.rasions =  $http({
                    method: 'GET',
                    url: 'http://localhost/hrm/public/api/raisons'
                }).success(function (data) {
                    $scope.rasions = data;
                }).error(function (data) {
                    console.log(data);
                });
            };


            $scope.deselect = function (item) {
                console.log(item.id,'was deselected');
            };

            $scope.oneClient = {};

            $scope.id = 0;

            $scope.log = function (item) {
                console.log(item.id,'was selected');
                $scope.id = item.id;
            };


            $scope.loadStuff = function () {
                $scope.promise = $timeout(function () {

                }, 2000);
            };

            $scope.toggleLimitOptions = function () {
                $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
            };

            $scope.loadStuff = function () {
                $scope.promise = $timeout(function () {
                    // loading
                }, 2000);
            };

            $scope.logPagination = function (page, limit) {
                console.log('page: ', page);
                console.log('limit: ', limit);
            };

            $scope.client = {};

            $scope.addClient = function (event) {
                $mdDialog.show({
                    controller: AddClientController,
                    locals: {
                        items: $scope.clients, errors: $scope.errors
                    },
                    parent: angular.element(document.body),
                    templateUrl: 'views/client/addclient.html',
                    controllerAs: 'ctrl',
                    clickOutsideToClose:true,
                    targetEvent: event
                }).then(function (add) {
                   $scope.init();
                }, function(cancel) {
                });
            };

            $scope.showClient = function (event) {
                    $mdDialog.show({
                        locals: {
                            id: $scope.id
                        },
                        controller: function ($mdDialog,$scope,id) {
                            ClientService.getClient({id: id}).$promise.then(function (data) {
                                angular.forEach(data,function (value) {
                                     $scope.datas = value;
                                });
                            });
                            $scope.hide = function () {
                                $mdDialog.hide();
                            };
                            $scope.cancel = function () {
                                $mdDialog.cancel();
                            };
                        },
                        parent: angular.element(document.body),
                        templateUrl: 'views/client/seeClient.html',
                        clickOutsideToClose:true,
                        targetEvent: event
                    });
            };

            $scope.editClient = function (event) {
                $mdDialog.show({
                    controller: EditClientController,
                    parent: angular.element(document.body),
                    templateUrl: 'views/client/editClient.html',
                    locals: {
                        items: $scope.clients,id: $scope.id
                    },
                    clickOutsideToClose:true,
                    targetEvent: event
                }).then(function (edit) {
                    $scope.init();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Client modifié avec succès")
                            .position('top right')
                            .hideDelay(1500)
                    );

                }, function(cancel) {
                });
            };

            function AddClientController($scope, $mdDialog,items,errors) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.add = function (client) {
                    if(client.raison != null){
                        client = {
                            raisonSoc : client.raison,
                            add: client.addresse || " ",
                            ville: client.ville || " ",
                            email: client.email || " ",
                            tel: client.tel|| " ",
                            nomResp: client.name_resp || " "
                        };
                        ClientService.saveClient(client).$promise.then(
                            function(value) {
                                items.push.data(value);
                            },function (data) {
                                errors.push(data);
                                console.log(data);
                            });
                        $mdDialog.hide(client);
                    }
                   else {
                       console.log("wj-hat");
                   }
                };
            };

            function EditClientController($scope, $mdDialog,items,id) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                ClientService.getClient({id: id}).$promise.then(function (data) {
                    angular.forEach(data,function (value) {
                        $scope.datas = value;
                    })
                });
                $scope.edit = function (client) {
                    client = {
                        raisonSoc : client.raison,
                        add: client.addresse,
                        ville: client.ville,
                        email: client.email,
                        tel: client.tel,
                        nomResp: client.name_resp
                    };
                    ClientService.editClient({id: id},client);
                    $mdDialog.hide(client);
                }
            }

            // a des mission auxquelles il est relié. Ces missions doivent étre supprimées avant de supprimer ce client

            $scope.showConfirm = function(ev) {
                var confirm = $mdDialog.confirm()
                    .title('Vous voulez vraiment supprimer?')
                    .textContent('Ce client')
                    .targetEvent(ev)
                    .ok('Effacer')
                    .cancel('Annuler');
                $mdDialog.show(confirm).then(function() {
                     var index =  $scope.clients["data"].indexOf(
                         $scope.clients["data"].find(function(e) {
                         return e.id == $scope.id;
                     }));

                    ClientService.deleteClient({id: $scope.id}).$promise.then(function (success) {
                        $scope.clients["data"].splice(index,1);
                    });

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Le client a été supprimé")
                            .position('top right')
                            .hideDelay(1500)
                    );
                }, function() {
                });
            };
            $scope.init();

            $scope.serachClient = function () {
                $http({
                    method: 'POST',
                    url: 'http://localhost/hrm/public/api/searchClient',
                    data:  {raisonSoc: $scope.selectedRasions, ville: $scope.selectedVilles}
                }).success(function (data) {
                   // console.log(data.match('No Clinet Found'));
                    if(data != 'No Clinet Found'){
                        $scope.clients["data"] = [];
                        $scope.clients["data"].push(data);
                    }
                    else {
                        $scope.init();
                    }
                }).error(function (data) {
                    console.log(data);
                });


            }
        }
    ]);


//# sourceMappingURL=ClientCtrl.js.map
