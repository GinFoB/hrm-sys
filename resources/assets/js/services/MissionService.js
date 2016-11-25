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
    .factory('MissionService',['$resource',
        function (
            $resource) {
            return $resource('http://localhost/hrm/public/api/missions/:id',{},
                {
                    getMissions: {method:'GET',isArray: true },
                    getMission: {method:'GET',isArray: true },
                    saveMission: {method:'POST', interceptor: {response: function( response ) {return response;}}},
                    deleteMission: {method:'DELETE'},
                    editMission: {method:'PUT',interceptor: {response: function( response ) {return response;}}}
                });

           /* return $resource('https://shrm.herokuapp.com/api/missions/:id',{},
                {
                    getMissions: {method:'GET',isArray: true },
                    getMission: {method:'GET',isArray: true },
                    saveMission: {method:'POST', interceptor: {response: function( response ) {return response;}}},
                    deleteMission: {method:'DELETE'},
                    editMission: {method:'PUT',interceptor: {response: function( response ) {return response;}}}
                });*/
        }

    ]);

