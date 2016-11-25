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
    .factory('ClientService',['$resource',
        function (
            $resource) {




       /*     return $resource('https://shrm.herokuapp.com/api/clients/:id',{},
                {
                    getClients: {method:'GET',isArray: true },
                    getClient: {method:'GET',isArray: true },
                    saveClient: {method:'POST', interceptor: {response: function( response ) {return response;}}},
                    deleteClient: {method:'DELETE'},
                    editClient: {method:'PUT',interceptor: {response: function( response ) {return response;}}}
                });
*/


            return $resource('http://localhost/hrm/public/api/clients/:id',{},
                {
                    getClients: {method:'GET',isArray: true },
                    getClient: {method:'GET',isArray: true },
                    saveClient: {method:'POST', interceptor: {response: function( response ) {return response;}}},
                    deleteClient: {method:'DELETE'},
                    editClient: {method:'PUT',interceptor: {response: function( response ) {return response;}}}
                });
        }

    ]);


//# sourceMappingURL=ClientService.js.map
