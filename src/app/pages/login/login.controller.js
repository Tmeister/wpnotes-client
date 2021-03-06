( function() {
    'use strict';

    angular
        .module( 'wpnotes' )
        .controller( 'LoginController', LoginController );

    /** @ngInject */
    function LoginController( $log, Auth, $location ) {
        var vm = this;
        vm.login = login;
        vm.user = {};
        vm.errors = {};
        vm.isLoading = false;

        Auth.isLoggedInAsync( function( loggedIn ) {
            if ( loggedIn ) {
                $location.path( '/dashboard' );
            } else {
                vm.isNotLogged = true;
            }
        } );

        function login( form ) {
            vm.submitted = true;
            if ( !form.$valid ) {
                return;
            }
            vm.errors = {};
            vm.isLoading = true;
            Auth.login( vm.user )
                .then( function() {
                    vm.isLoading = false;
                    $location.path( '/dashboard' );
                } )
                .catch( function( err ) {
                    vm.isLoading = false;
                    vm.errors.other = err.message;
                } );
        }
    }
} )();
