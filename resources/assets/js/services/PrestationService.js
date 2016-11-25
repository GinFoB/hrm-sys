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
    .factory('PrestationService',['$resource',
        function (
            $resource) {

            return $resource('http://localhost/hrm/public/api/prestations/:id',{},
                {
                    getPrestations: {method:'GET',isArray: true },
                    getPrestation: {method:'GET',isArray: true },
                    savePrestation: {method:'POST',interceptor: {response: function( response ) {return response;}}},
                    deletePrestation: {method:'DELETE'},
                    editPrestation: {method:'PUT',interceptor: {response: function( response ) {return response;}}}
                });
         /*   return $resource('https://shrm.herokuapp.com/api/prestations/:id',{},
                {
                    getPrestations: {method:'GET',isArray: true },
                    getPrestation: {method:'GET',isArray: true },
                    savePrestation: {method:'POST',interceptor: {response: function( response ) {return response;}}},
                    deletePrestation: {method:'DELETE'},
                    editPrestation: {method:'PUT',interceptor: {response: function( response ) {return response;}}}
                });*/
        }

    ]);

