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
    .controller('MissionCtrl',['MissionService','$http','$mdEditDialog', '$scope','$mdDialog','$timeout','$mdBottomSheet', '$mdToast',
        function (
            MissionService,$http,$mdEditDialog, $scope,$mdDialog, $timeout,$mdBottomSheet, $mdToast) {

            $scope.typesContrat = ["Freelance", "CDI"];
           /* $scope.selectedTypes;
            $scope.getselectedTypes = function() {
                if ($scope.selectedTypes !== undefined) {
                    return  $scope.selectedTypes;
                } else {
                    return "Type";
                }
            };*/
            $scope.clients = $http({
                                method: 'GET',
                                url: 'http://localhost/hrm/public/api/raisons'
                                }).success(function (data) {
                                    $scope.clients = data;
                                }).error(function (data) {
                                    console.log(data);
                                });

            $scope.selectedClients;
            $scope.getselectedClients = function() {
                if ($scope.selectedClients !== undefined) {
                    return  $scope.selectedClients;
                } else {
                    return "Client";
                }
            };
            $scope.consultants =  $http({
                                        method: 'GET',
                                        url: 'http://localhost/hrm/public/api/getConsultants'
                                    }).success(function (data) {
                                        $scope.consultants = data;
                                    }).error(function (data) {
                                        console.log(data);
                                    });
            $scope.selectedConsultants;
            $scope.getselectedConsultants = function() {
                if ($scope.selectedConsultants !== undefined) {
                    return  $scope.selectedConsultants;
                } else {
                    return "Consultant";
                }
            };

            $scope.id = null;
            $scope.missions = [];

            $scope.selected = [];
            $scope.limitOptions = [5, 10, 15, {
                label: 'All',
                value: function () {
                    return $scope.missions ? $scope.missions.count : 0;
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
                MissionService.getMissions().$promise.then(function (data) {
                    $scope.missions = {
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

            $scope.mission = {};

            $scope.addMission = function (event) {
                $mdDialog.show({
                    controller: AddConsultantController,
                    locals: {
                        items: $scope.missions
                    },
                    parent: angular.element(document.body),
                    templateUrl: 'views/mission/addmission.html',
                    controllerAs: 'ctrl',
                    clickOutsideToClose:true,
                    targetEvent: event
                }).then(function (add) {
                    $scope.init();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Mission ajouté avec succès")
                            .position('top right')
                            .hideDelay(1500)
                    );

                }, function(cancel) {
                });
            };

            $scope.showMission = function (event) {
                $mdDialog.show({
                    locals: {
                        id: $scope.id
                    },
                    controller: function ($mdDialog,$scope,id) {
                        MissionService.get({id: id}).$promise.then(function (data) {
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
                    templateUrl: 'views/mission/seemission.html',
                    clickOutsideToClose:true,
                    targetEvent: event
                });
            };

            $scope.editMission = function (event) {
                $mdDialog.show({
                    controller: EditMissionController,
                    parent: angular.element(document.body),
                    templateUrl: 'views/mission/editmission.html',
                    locals: {
                        items: $scope.missions,id: $scope.id
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

            function AddConsultantController($scope, $mdDialog,items) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.add = function (mission) {
                    $scope.errMessage = '';
                    //  var curDate = new Date();

                    if(new Date(mission.date_debut) > new Date(mission.date_fin)){
                        $scope.errMessage = 'Date de fin doit être supérieure à la date de début';
                        return false;
                    }

                    if(mission.titre != null && mission.client !=null && mission.consultant != null && mission.type_contrat != null) {
                        mission = {
                            titre: mission.titre,
                            date_debut: mission.date_debut || " ",
                            date_fin: mission.date_fin || " ",
                            tjm: mission.tjm || " ",
                            prix_vente: mission.prix_vente || " ",
                            assurance: mission.assurance || " ",
                            charges_sociales: mission.charges_sociales || " ",
                            ref_contrat: mission.ref_contrat || " ",
                            delai_paiement: mission.delai_paiement || " ",
                            type_contrat: mission.type_contrat,
                            salaire : mission.salaire || " ",
                            cli_id: mission.client,
                            nom : mission.consultant
                        };



                        MissionService.saveMission(mission).$promise.then(
                            function(value) {
                                items.push(value);
                            },function (data) {
                                console.log(data);
                            });
                        $mdDialog.hide(mission);
                    }
                    else {
                        console.log('what');
                    }

                };
            };

            function EditMissionController($scope, $mdDialog,items,id) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                MissionService.get({id: id}).$promise.then(function (data) {
                    console.log(data);
                    $scope.datas = data;
                });

                $scope.edit = function (mission) {
                    mission = {
                        titre: mission.titre,
                        date_debut: mission.date_debut,
                        date_fin: mission.date_fin,
                        tjm: mission.tjm,
                        prix_vente: mission.prix_vente,
                        assurance: mission.assurance,
                        charges_sociales: mission.charges_sociales,
                        ref_contrat: mission.ref_contrat,
                        delai_paiement: mission.delai_paiement,
                        type_contrat: mission.type_contrat,
                        salaire : mission.salaire,
                        cli_id: mission.client,
                        nom : mission.consultant
                    };
                    MissionService.editMission({id: id},mission);
                    $mdDialog.hide(mission);
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
                    var index =  $scope.missions["data"].indexOf(
                        $scope.missions["data"].find(function(e) {
                            return e.id == $scope.id;
                        }));

                    MissionService.deleteMission({id: $scope.id}).$promise.then(function (success) {
                        $scope.missions["data"].splice(index,1);
                    });

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Mission a été supprimé")
                            .position('top right')
                            .hideDelay(1500)
                    );
                }, function() {
                });
            };
            $scope.init();

            $scope.serachMission = function (mission) {
                console.log(mission);
                $http({
                    method: 'POST',
                    url: 'http://localhost/hrm/public/api/serachMission',
                    data:  {date_debut: mission.date_debut, date_fin: mission.date_fin,cli_id: mission.client,nom:mission.consultant}
                }).success(function (data) {
                    if(data !='Mission Not Found'){
                        $scope.missions["data"] = [];
                        $scope.missions["data"].push(data);
                    }
                   else {
                       $scope.init();
                    }
                }).error(function (data) {
                    console.log(data);
                });
                mission.date_debut = "";
                mission.date_fin = "";
                mission.client = "";
                mission.consultant = "";
            };

        }
    ]);

