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
    .controller('ConsultantCtrl',['ConsultantService','$http','$mdEditDialog', '$scope','$mdDialog','$timeout','$mdBottomSheet', '$mdToast',
        function (
            ConsultantService,$http,$mdEditDialog, $scope,$mdDialog, $timeout,$mdBottomSheet, $mdToast) {

            $scope.villes = ["RABAT", "CASABLANCA", "TANGER", "FES", "Salé", "Marrakech", "Meknes"];
            $scope.selectedVilles;
            $scope.getselectedVilles = function() {
                if ($scope.selectedVilles !== undefined) {
                    return  $scope.selectedVilles;
                } else {
                    return "Ville";
                }
            };

            $scope.types = ["Personne Physique", "Personne Morale"];
            $scope.selectedTypes;
            $scope.getselectedTypes = function() {
                if ($scope.selectedTypes !== undefined) {
                    return  $scope.selectedTypes;
                } else {
                    return "Type";
                }
            };

            $scope.id = null;

            $scope.selected = [];
            $scope.limitOptions = [5, 10, 15, {
                label: 'All',
                value: function () {
                    return $scope.consultants ? $scope.consultants.count : 0;
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
                ConsultantService.getConsultants().$promise.then(function (data) {
                    $scope.consultants = {
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

            $scope.consultant = {};

            $scope.addConsultant = function (event) {
                $mdDialog.show({
                    controller: AddMissionController,
                    locals: {
                        items: $scope.consultants
                    },
                    parent: angular.element(document.body),
                    templateUrl: 'views/consultant/addconsultant.html',
                    controllerAs: 'ctrl',
                    clickOutsideToClose:true,
                    targetEvent: event
                }).then(function (add) {
                    $scope.init();
                   /* $mdToast.show(
                        $mdToast.simple()
                            .textContent("Consultant ajouté avec succès")
                            .position('top right')
                            .hideDelay(1500)
                    );*/

                }, function(cancel) {
                });
            };


            $scope.showConsultant = function (event) {
                $mdDialog.show({
                    locals: {
                        id: $scope.id
                    },
                    controller: function ($mdDialog,$scope,id) {
                        ConsultantService.getConsultant({id:id}).$promise.then(function (data) {
                            angular.forEach(data,function (value) {
                                $scope.datas = value;
                            })
                        });
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                    },
                    parent: angular.element(document.body),
                    templateUrl: 'views/consultant/seeconsultant.html',
                    clickOutsideToClose:true,
                    targetEvent: event
                });
            };


            $scope.editConsultant = function (event) {
                $mdDialog.show({
                    controller: EditConsultantController,
                    parent: angular.element(document.body),
                    templateUrl: 'views/consultant/editconsultant.html',
                    controllerAs: 'ctrl',
                    locals: {
                        items: $scope.consultants,id: $scope.id
                    },
                    clickOutsideToClose:true,
                    targetEvent: event
                }).then(function (edit) {
                    $scope.init();
                }, function(cancel) {
                });
            };

            function AddMissionController($scope, $mdDialog,items) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.add = function (consultant) {
                    if(consultant.nom != null){
                        consultant = {
                            nom : consultant.nom,
                            prenom: consultant.prenom || " ",
                            date_naissance: consultant.date_naissance || " ",
                            adresse: consultant.adresse || " ",
                            ville: consultant.ville || " ",
                            email: consultant.email || " ",
                            telephone: consultant.telephone || " ",
                            type: consultant.type || " ",
                            rib: consultant.rib || " ",
                            banque: consultant.banque || " ",
                            observations: consultant.observations || " "
                        };

                        ConsultantService.saveConsultant(consultant).$promise.then(
                            function(value) {
                                items.data.push(value);
                                $mdDialog.hide(consultant);
                            },function (data) {
                                console.log(data);
                            });
                    }
                    else {
                        console.log("error");
                    }

                };
            };

            function EditConsultantController($scope, $mdDialog,items,id) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                ConsultantService.getConsultant({id: id}).$promise.then(function (data) {
                    angular.forEach(data,function (value) {
                        $scope.datas = value;
                    })
                });

                $scope.edit = function (consultant) {
                    consultant = {
                        nom : consultant.nom,
                        prenom: consultant.prenom,
                        date_naissance: consultant.date_naissance,
                        adresse: consultant.adresse,
                        ville: consultant.ville,
                        email: consultant.email,
                        telephone: consultant.telephone,
                        type: consultant.type,
                        rib: consultant.rib,
                        banque: consultant.banque,
                        observations: consultant.observations
                    };
                    ConsultantService.editConsultant({id: id},consultant);
                    $mdDialog.hide(consultant);
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
                    var index =  $scope.consultants["data"].indexOf(
                        $scope.consultants["data"].find(function(e) {
                            return e.id == $scope.id;
                        }));

                    ConsultantService.deleteConsultant({id: $scope.id}).$promise.then(function (success) {
                        $scope.consultants["data"].splice(index,1);
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

            //Consultant Not Found

            $scope.serachConsultant = function (consultant) {
                $http({
                    method: 'POST',
                    url: 'http://localhost/hrm/public/api/serachConsultant',
                    data:  {nom: consultant.nom, prenom: consultant.prenom,email: consultant.email,telephone:consultant.telephone}
                }).success(function (data) {
                    console.log(data);
                    if(data != 'Consultant Not Found'){
                        angular.forEach(data,function (value) {
                            $scope.consultants["data"] = [];
                            $scope.consultants["data"].push(value);
                        });
                    }
                    else {
                        $scope.init();
                    }
                }).error(function (data) {
                    console.log(data);
                });
                consultant.nom = "";
                consultant.prenom = "";
                consultant.email = "";
                consultant.telephone = "";

            };

        }
    ]);

