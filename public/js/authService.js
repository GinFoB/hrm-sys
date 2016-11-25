/**
 * Created by akramkhalifa on 07/09/2016.
 */
'use strict';
hrmApp
    .factory('Auth', ['$http', '$localStorage', function ($http, $localStorage) {
    function urlBase64Decode(str) {

        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getClaimsFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    var tokenClaims = getClaimsFromToken();

    return {
        signup: function (data, success, error) {
            $http.post('/signup', data).success(success).error(error)
        },
        signin: function (data, success, error) {
            $http.post('http://localhost/hrm/public/authenticate', data).then(function(response) {

                    // Stringify the returned data to prepare it
                    // to go into local storage
                    var user = JSON.stringify(response.data.user);

                    // Set the stringified user data into local storage
                    localStorage.setItem('user', user);

                console.log(user);

                    // The user's authenticated state gets flipped to
                    // true so we can now show parts of the UI that rely
                    // on the user being logged in
                   /* $rootScope.authenticated = true;

                    // Putting the user's data on $rootScope allows
                    // us to access it anywhere across the app
                    $rootScope.currentUser = response.data.user;*/

                    // Everything worked out so we can now redirect to
                    // the users state to view the data
                    //$state.go('users');
            });
        },
        logout: function (success) {
            tokenClaims = {};
            delete $localStorage.token;
            success();
        },
        getTokenClaims: function () {
            return tokenClaims;
        }
    };
}
]);
//# sourceMappingURL=authService.js.map
