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
    .factory('ConsultantService',['$resource',
        function (
            $resource) {

            return $resource('http://localhost/hrm/public/api/consultants/:id',{},
                {
                    getConsultants: {method:'GET',isArray: true },
                    getConsultant: {method:'GET',isArray: true },
                    saveConsultant: {method:'POST', interceptor: {response: function( response ) {return response;}}},
                    deleteConsultant: {method:'DELETE'},
                    editConsultant: {method:'PUT',interceptor: {response: function( response ) {return response;}}}
                });
          /*  return $resource('https://shrm.herokuapp.com/api/consultants/:id',{},
                {
                    getConsultants: {method:'GET',isArray: true },
                    getConsultant: {method:'GET',isArray: true },
                    saveConsultant: {method:'POST', interceptor: {response: function( response ) {return response;}}},
                    deleteConsultant: {method:'DELETE'},
                    editConsultant: {method:'PUT',interceptor: {response: function( response ) {return response;}}}
                });*/
        }

    ]);


//# sourceMappingURL=ConsultantService.js.map
