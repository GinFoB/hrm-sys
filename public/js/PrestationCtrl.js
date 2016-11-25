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
    .controller('PrestationCtrl',['PrestationService','Upload','$http','$mdEditDialog', '$scope','$mdDialog','$timeout','$mdBottomSheet', '$mdToast',
        function (
            PrestationService,Upload,$http,$mdEditDialog, $scope,$mdDialog, $timeout,$mdBottomSheet, $mdToast) {

            $scope.modes = ["Virement", "Espèce", "Chèque", "Carte"];

            $scope.yesOrNon = ["OUI", "NON"];

            $scope.types = ["D", "C"];

            $scope.id = null;
            $scope.prestations = [];

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

            $scope.missions =  $http({
                method: 'GET',
                url: 'http://localhost/hrm/public/api/getAllMissions'
            }).success(function (data) {
                $scope.missions = data;
            }).error(function (data) {
                console.log(data);
            });

            $scope.init = function () {
                PrestationService.getPrestations().$promise.then(function (data) {
                    $scope.prestations = {
                        "count": data.length,
                        "data": data
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

            $scope.addPrestation = function (event) {
                $mdDialog.show({
                    controller: AddPrestationController,
                    locals: {
                        items: $scope.prestations
                    },
                    parent: angular.element(document.body),
                    templateUrl: 'views/prestation/addprestation.html',
                    controllerAs: 'ctrl',
                    clickOutsideToClose:true,
                    targetEvent: event
                }).then(function (add) {
                    $scope.init();
                     $mdToast.show(
                     $mdToast.simple()
                     .textContent("Prestation ajouté avec succès")
                     .position('top right')
                     .hideDelay(1500)
                     );
                }, function(cancel) {
                });
            };

            $scope.showPrestation = function (event) {
                $mdDialog.show({
                    locals: {
                        id: $scope.id
                    },
                    controller: function ($mdDialog,$scope,id) {
                        PrestationService.get({id: id}).$promise.then(function (data) {
                            console.log(data);
                            $scope.datas = data;
                        });
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                    },
                    parent: angular.element(document.body),
                    templateUrl: 'views/prestation/seeprestation.html',
                    clickOutsideToClose:true,
                    targetEvent: event
                });
            };



            $scope.editPrestation = function (event) {
                $mdDialog.show({
                    controller: EditPrestationController,
                    parent: angular.element(document.body),
                    templateUrl: 'views/prestation/editprestation.html',
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

            function AddPrestationController($scope, $mdDialog,items) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.add = function (file) {
                    items.data.push(file);
                    file.upload = Upload.upload({
                        url: 'http://localhost/hrm/public/api/prestations',
                        data: file
                });
                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                    $mdDialog.hide(file);
                }
            };

          function EditPrestationController($scope, $mdDialog,items,id) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                  PrestationService.get({id: id}).$promise.then(function (data) {
                      console.log(data);
                      $scope.datas = data;
                  });
                $scope.edit = function (file) {
                    file.upload = Upload.upload({
                        url: 'http://localhost/hrm/public/api/editPermission/'+id,
                        data: file
                    });
                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                    $mdDialog.hide(file);
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
                    var index =  $scope.prestations["data"].indexOf(
                        $scope.prestations["data"].find(function(e) {
                            return e.id == $scope.id;
                        }));

                    PrestationService.deletePrestation({id: $scope.id}).$promise.then(function (success) {
                        $scope.prestations["data"].splice(index,1);
                    });

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Prestation a été supprimé")
                            .position('top right')
                            .hideDelay(1500)
                    );
                }, function() {
                });
            };
            $scope.init();

            $scope.serachPrestation = function (prestation) {
                $http({
                    method: 'POST',
                    url: 'http://localhost/hrm/public/api/serachPrestation',
                    data:  {
                        mission:prestation.mission,
                        date_effet:prestation.date_effet,
                        date_paiement_consultant:prestation.date_paiement_consultant,
                        date_paiement_client: prestation.date_paiement_client,
                        prestation_payee:prestation.prestation_payee,
                        facture_reglee:prestation.facture_reglee
                    }
                }).success(function (data) {
                    console.log(data);
                    if(data !='Prestation Not Found'){
                        $scope.prestations["data"] = [];
                        $scope.prestations["data"].push(data);
                    }
                    else {
                        $scope.init();
                    }

                }).error(function (data) {
                    console.log(data);
                });

                prestation.mission = '';
                prestation.date_effet = '';
                prestation.date_paiement_consultant ='';
                prestation.date_paiement_client='';
                prestation.prestation_payee='';
                prestation.facture_reglee='';
            };
        }
    ]);


//# sourceMappingURL=PrestationCtrl.js.map
