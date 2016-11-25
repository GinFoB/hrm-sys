/**
 * Created by akramkhalifa on 03/09/2016.
 */
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
    .controller('AdminCtrl',['$http','$localStorage','$rootScope','$mdEditDialog', '$q', '$scope','$mdDialog','$timeout','$mdBottomSheet', '$mdToast',
        function (
            $http,$localStorage,$rootScope,$mdEditDialog, $q, $scope,$mdDialog, $timeout,$mdBottomSheet, $mdToast) {

            $scope.isRole = [];
            $scope.permsAll = [];
            $scope.users = [];

             $scope.init = function () {
                 var x = JSON.parse($localStorage.currentUser);
                    $http({
                        method: 'GET',
                        url: 'http://localhost/hrm/public/getUsers'
                    }).success(function (data) {
                        angular.forEach(data, function(item){
                            $scope.users.push(item);
                        });
                    }).error(function (data) {
                        console.log(data);
                    });

                $http({
                   method: 'POST',
                   url: 'http://localhost/hrm/public/checkRole',
                   data:  {email: x.email}
                   }).success(function (data) {

                       angular.forEach(data, function(item){
                         //  console.log(item);
                           $scope.isRole.push(item);
                       });
                   }).error(function (data) {
                       console.log(data);
                   });

               /* $http({
                    method: 'PUT',
                    url: 'http://localhost/hrm/public/api/clients/1',
                    data: {raisonSoc: 'dddv', add: 'ddf',ville:'akram@dd.com',email:'dd',tel:'es',nomResp:'dsd'}
                }).success(function (data) {
                    console.log('user',data);
                }).error(function (data) {
                    console.log(data);
                });*/
               console.log(x.email);
            };

            $scope.profilesNames = $http({
                method: 'GET',
                url: 'http://localhost/hrm/public/roles'
            }).success(function (data) {
                $scope.profilesNames = data;
            }).error(function (data) {
                console.log(data);
            });

            $scope.init();

            $scope.role = '';
            //clients
            $scope.addClient = false;
            $scope.readClient = false;
            $scope.editClient = false;
            $scope.removeClient = false;

            //Consultants
            $scope.addCons = false;
            $scope.readCons = false;
            $scope.editCons = false;
            $scope.removeCons = false;

            //Missions
            $scope.addMission = false;
            $scope.readMission = false;
            $scope.editMission = false;
            $scope.removeMission = false;

            //Prestations
            $scope.addPrest = false;
            $scope.readPrest = false;
            $scope.editPrest = false;
            $scope.removePrest = false;
            //caisse

            $scope.addCahrage = false;
            $scope.seeCahrage = false;
            $scope.editCahrage = false;
            $scope.removeCahrage = false;

            //user
            $scope.email = '';
            $scope.password= '';
            $scope.cpassword = '';
            //
            $scope.apassword = '';
            $scope.npassword = '';
            $scope.gpassword = '';

            $scope.rest = function () {
                $scope.x = JSON.parse($localStorage.currentUser);
                $http({
                    method: 'POST',
                    url: 'https://shrm.herokuapp.com/password/reset',
                    data:  {email: x.email,password: $scope.npassword}

                }).success(function (data) {
                }).error(function (data) {
                    console.log(data);
                });

            };

            $scope.addProfile = function (event) {
                $mdDialog.show({
                    controller: DialogController,
                    parent: angular.element(document.body),
                    templateUrl: 'views/admin/addProfile.html',
                    controllerAs: 'ctrl',
                    clickOutsideToClose:true,
                    targetEvent: event
                }).then(function (add) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Profile ajouté avec succès")
                            .position('top right')
                            .hideDelay(1500)
                    );
                }, function(cancel) {
                });
            };

            $scope.addUser = function (event) {
                $mdDialog.show({
                    controller: DialogController,
                    parent: angular.element(document.body),
                    templateUrl: 'views/admin/addUser.html',
                    controllerAs: 'ctrl',
                    clickOutsideToClose:true,
                    targetEvent: event
                }).then(function (addUser) {

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("User ajouté avec succès")
                            .position('top right')
                            .hideDelay(1500)
                    );
                }, function(cancel) {
                });
            };

            function DialogController($scope, $mdDialog) {
                $scope.profiles = [];


                $http({
                    method: 'GET',
                    url: 'http://localhost/hrm/public/roles'
                }).success(function(data){
                    $scope.profiles  =data;
                }).error(function(){
                    alert("error");
                });

                $scope.selectedItem;

                $scope.getSelectedText = function() {
                    if ($scope.selectedItem !== undefined) {
                        return $scope.selectedItem;
                    } else {
                        return "Please select an item";
                    }
                };

                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.addUser = function () {
                    if($scope.password == $scope.cpassword){
                        $http({
                            method: 'POST',
                            url: 'http://localhost/hrm/public/saveUser',
                            data:  {email: $scope.email,password: $scope.password}
                        }).success(function (data) {
                            $http({
                                method: 'POST',
                                url: 'http://localhost/hrm/public/assign-role',
                                data: {email: $scope.email, name: $scope.selectedItem}
                            }).success(function (data) {
                               /* $scope.$on('categoryAdded', function (event, args) {
                                    $scope.users.push(data);
                                    console.log($scope.users);
                                });*/
                            });
                        });
                    }
                    else  {
                        console.log("password error");
                    }

                    $mdDialog.hide();
                };
                $scope.add = function () {

                    // permissions
                    $scope.perms = [];

                    if($scope.addClient == true){
                        $scope.perms.push('create-client');
                    }
                    if($scope.editClient ==true){
                        $scope.perms.push('edit-client');
                    }
                    if($scope.readClient == true){
                        $scope.perms.push('read-client');
                    }
                    if($scope.removeClient == true){
                        $scope.perms.push('delete-client');
                    }

                    if($scope.addCons == true){
                        $scope.perms.push('add-cons');
                    }
                    if($scope.editCons == true){
                        $scope.perms.push('edit-cons');
                    }
                    if($scope.readCons == true){
                        $scope.perms.push('read-cons')
                    }
                    if($scope.removeCons == true){
                        $scope.perms.push('delete-cons');
                    }

                    if($scope.addMission == true){
                        $scope.perms.push('add-mission');
                    }
                    if($scope.readMission == true){
                        $scope.perms.push('read-mission');
                    }
                    if($scope.editMission == true){
                        $scope.perms.push('edit-mission');
                    }
                    if($scope.removeMission == true){
                        $scope.perms.push('delete-mission');
                    }

                    if($scope.addPrest == true){
                        $scope.perms.push('add-pert');
                    }
                    if($scope.editPrest == true){
                        $scope.perms.push('edit-pert');
                    }
                    if($scope.readPrest == true){
                        $scope.perms.push('read-pert');
                    }
                    if($scope.removePrest == true){
                        $scope.perms.push('delete-pert');
                    }

                    if($scope.addCahrage == true){
                        $scope.perms.push('add-caisse');
                    }

                    if($scope.seeCahrage == true){
                        $scope.perms.push('edit-caisse');
                    }

                    if($scope.editCahrage == true){
                        $scope.perms.push('delete-caisse');
                    }

                    if($scope.removeCahrage == true){
                        $scope.perms.push('read-caisse');
                    }

                    var x = JSON.parse($localStorage.currentUser);

                    $http({
                        method: 'POST',
                        url: 'http://localhost/hrm/publicrole',
                        data:  {name: $scope.role}
                    }).success(function (data) {
                        $http({
                            method: 'POST',
                            url: 'http://localhost/hrm/public/assign-role',
                            data: {email: x.email, name: $scope.role}
                        }).success(function (data) {
                            $http({
                                method: 'POST',
                                url: 'http://localhost/hrm/public/attach-permission',
                                data: {role: $scope.role, name: $scope.perms}
                            }).success(function (data) {
                                console.log(data);
                            }).error(function (err) {
                                console.log(err);
                            });
                        });
                    });

                    $mdDialog.hide();
                };
                $scope.edit = function (client) {
                    console.log(client);
                    $mdDialog.hide(client);
                };
            };
            
            $scope.serachUser = function (user) {
                $http({
                    method: 'POST',
                    url: 'http://localhost/hrm/public/searchUser',
                    data: {email: user.email}
                }).success(function (data) {
                    console.log(data);
                    $scope.users = [];
                    $scope.users.push(data);
                });
            }

        }

    ]);

