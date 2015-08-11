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

        Auth.isLoggedInAsync( function( loggedIn ) {
            if ( loggedIn ) {
                $location.path( '/dashboard' );
            }
        } );

        function login( form ) {
            vm.submitted = true;
            if ( !form.$valid ) {
                return;
            }
            Auth.login( vm.user )
                .then( function() {
                    $location.path( '/dashboard' );
                } )
                .catch( function( err ) {
                    vm.errors.other = err.message;
                } );
        }
    }
} )();
