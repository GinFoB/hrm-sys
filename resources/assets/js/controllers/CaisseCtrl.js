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
    .controller('CaisseCtrl',['CaisseService','$http','$mdEditDialog', '$scope','$mdDialog','$timeout','$mdBottomSheet', '$mdToast',
        function (
            CaisseService,$http,$mdEditDialog, $scope,$mdDialog, $timeout,$mdBottomSheet, $mdToast) {



            $scope.caisses = [];

            $scope.selected = [];
            $scope.limitOptions = [5, 10, 15, {
                label: 'All',
                value: function () {
                    return $scope.caisses ? $scope.caisses.count : 0;
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

            $scope.myDate = new Date();
            $scope.firstDay = new Date(new Date().getFullYear(), 0, 1);


            $scope.init = function () {
                CaisseService.getCaisses().$promise.then(function (data) {
                    $scope.caisses = {
                        "count":data.length,
                        "data":data
                    };
                });
            };


            $scope.deselect = function (item) {
                console.log(item.id,'was deselected');
            };

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

            $scope.caisse = {};

            $scope.addCaisse = function (event) {
                $mdDialog.show({
                    controller: AddCaisseController,
                    locals: {
                        items: $scope.caisses
                    },
                    parent: angular.element(document.body),
                    templateUrl: 'views/caisse/addcaisse.html',
                    controllerAs: 'ctrl',
                    clickOutsideToClose:true,
                    targetEvent: event
                }).then(function (add) {
                    $scope.init();
                   /* $mdToast.show(
                        $mdToast.simple()
                            .textContent("Caisse ajouté avec succès")
                            .position('top right')
                            .hideDelay(1500)
                    );
                    */
                }, function(cancel) {
                });
            };


            $scope.showCaisse = function (event) {
                $mdDialog.show({
                    locals: {
                        id: $scope.id
                    },
                    controller: function ($mdDialog,$scope,id) {
                        CaisseService.getCaisse({id: id}).$promise.then(function (data) {
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
                    templateUrl: 'views/caisse/seecaisse.html',
                    clickOutsideToClose:true,
                    targetEvent: event
                });
            };


            $scope.editCaisse = function (event) {
                $mdDialog.show({
                    controller: EditCaisseController,
                    parent: angular.element(document.body),
                    templateUrl: 'views/caisse/editcaisse.html',
                    controllerAs: 'ctrl',
                    locals: {
                        items: $scope.caisses,id: $scope.id
                    },
                    clickOutsideToClose:true,
                    targetEvent: event
                }).then(function (edit) {
                    $scope.init();
                    /* $mdToast.show(
                     $mdToast.simple()
                     .textContent("Consultant modifié avec succès")
                     .position('top right')
                     .hideDelay(1500)
                     );*/

                }, function(cancel) {
                });
            };

            function AddCaisseController($scope, $mdDialog,items) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.add = function (caisse) {
                    caisse = {
                        designat : caisse.designat,
                        date_paiement: caisse.date_paiement ,
                        mode_paiement: caisse.mode_paiement,
                        montant: caisse.montant,
                        ref_paiement: caisse.ref_paiement,
                        type_opr: caisse.type_opr,
                        observations: caisse.observations
                    };

                    if(caisse != null){
                        CaisseService.saveCaisse(caisse).$promise.then(
                            function(data) {
                                items.data.push(data);
                            },function (data) {
                                console.log(data);
                            });
                        $mdDialog.hide(caisse);
                    }
                    else {
                        console.log('kflnvd');
                    }

                };
            };

            function EditCaisseController($scope, $mdDialog,items,id) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                CaisseService.getCaisse({id: id}).$promise.then(function (data) {
                    angular.forEach(data,function (value) {
                        $scope.datas = value;
                    })
                });

                $scope.edit = function (caisse) {
                    caisse = {
                        designat : caisse.designat,
                        date_paiement: caisse.date_paiement,
                        mode_paiement: caisse.mode_paiement,
                        montant: caisse.montant,
                        ref_paiement: caisse.ref_paiement,
                        type_opr: caisse.type_opr,
                        observations: caisse.observations
                    };
                    CaisseService.editCaisse({id: id},caisse);
                    $mdDialog.hide(caisse);
                }
            }

            $scope.showConfirm = function(ev) {
                var confirm = $mdDialog.confirm()
                    .title('Vous voulez vraiment supprimer?')
                    .textContent('')
                    .targetEvent(ev)
                    .ok('Effacer')
                    .cancel('Annuler');
                $mdDialog.show(confirm).then(function() {
                    var index =  $scope.caisses["data"].indexOf(
                        $scope.caisses["data"].find(function(e) {
                            return e.id == $scope.id;
                        }));

                    CaisseService.deleteCaisse({id: $scope.id}).$promise.then(function (success) {
                        $scope.caisses["data"].splice(index,1);
                    });

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Caisse a été supprimé")
                            .position('top right')
                            .hideDelay(1500)
                    );
                }, function() {
                });
            };
            $scope.init();

            $scope.serachCaisse = function (caisse) {
                console.log($scope.myDate);
                $http({
                    method: 'POST',
                    url: 'http://localhost/hrm/public/api/serachCaisse',
                    data:  {myDate: $scope.myDate, firstDay: $scope.firstDay,type:caisse.type_opr}
                }).success(function (data) {
                    console.log(data);
                    if(data != 'caisse not found'){
                        $scope.caisses["data"] = [];
                        $scope.caisses["data"].push(data);
                    }
                    else {
                        $scope.init();
                    }

                }).error(function (data) {
                    console.log(data);
                });
            };

        }
    ]);

