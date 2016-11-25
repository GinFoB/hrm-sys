/**
 * Created by akramkhalifa on 18/09/2016.
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
    .factory('CaisseService',['$resource',
        function (
            $resource) {

          /*  return $resource('https://shrm.herokuapp.com/api/caisses/:id',{},
                {
                    getCaisses: {method:'GET',isArray: true },
                    getCaisse: {method:'GET',isArray: true },
                    saveCaisse: {method:'POST', interceptor: {response: function( response ) {return response;}}},
                    deleteCaisse: {method:'DELETE'},
                    editCaisse: {method:'PUT',interceptor: {response: function( response ) {return response;}}}
                });*/

            return $resource('http://localhost/hrm/public/api/caisses/:id',{},
                {
                    getCaisses: {method:'GET',isArray: true },
                    getCaisse: {method:'GET',isArray: true },
                    saveCaisse: {method:'POST', interceptor: {response: function( response ) {return response;}}},
                    deleteCaisse: {method:'DELETE'},
                    editCaisse: {method:'PUT',interceptor: {response: function( response ) {return response;}}}
                });
        }

    ]);

