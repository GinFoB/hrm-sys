/**
 * Created by akramkhalifa on 29/08/2016.
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
    .controller('factureEnCtrl',['$mdEditDialog', '$q', '$scope',
        function (
            $mdEditDialog, $q, $scope, $timeout) {

            $scope.myDate = new Date();
            $scope.minDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() - 2,
                $scope.myDate.getDate());
            $scope.maxDate = new Date(
                $scope.myDate.getFullYear(),
                $scope.myDate.getMonth() + 2,
                $scope.myDate.getDate());
            $scope.onlyWeekendsPredicate = function(date) {
                var day = date.getDay();
                return day === 0 || day === 6;
            };


            $scope.selected = [];
            $scope.limitOptions = [5, 10, 15];

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
                order: 'name',
                limit: 5,
                page: 1
            };

            $scope.fact_retard = {
                "count": 9,
                "data": [
                    {
                        "mission": "IT",
                        "date_paiement": "15/09/2015",
                        "modedepm": "Virement",
                        "montant": "80000"
                    },
                    {
                        "mission": "IT Tech",
                        "date_paiement": "11/09/2014",
                        "modedepm": "Carte",
                        "montant": "15000"
                    },
                    {
                        "mission": "RelIo",
                        "date_paiement": "09/12/2013",
                        "modedepm": "Cheque",
                        "montant": "7899"
                    },
                    {
                        "mission": "BW",
                        "date_paiement": "11/05/2017",
                        "modedepm": "Virement",
                        "montant": "1500"
                    },
                    {
                        "mission": "ISW",
                        "date_paiement": "11/05/2013",
                        "modedepm": "Virement",
                        "montant": "1800"
                    }, {
                        "mission": "BPW",
                        "date_paiement": "11/05/2017",
                        "modedepm": "Virement",
                        "montant": "1500"
                    }, {
                        "mission": "VIP",
                        "date_paiement": "11/05/2017",
                        "modedepm": "Virement",
                        "montant": "30000"
                    }, {
                        "mission": "SSBW",
                        "date_paiement": "11/05/2017",
                        "modedepm": "Virement",
                        "montant": "1500"
                    }, {
                        "mission": "HDlS",
                        "date_paiement": "11/05/2017",
                        "modedepm": "Virement",
                        "montant": "14900"
                    }
                ]
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



        }

    ]);