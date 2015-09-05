( function() {
    'use strict';

    angular
        .module( 'wpnotes' )
        .controller( 'SignupController', SignupController );

    /** @ngInject */
    function SignupController( $log, Auth, $location ) {
        var vm = this;
        vm.user = {};
        vm.errors = {};
        vm.isLoading = false;
        vm.create = create;

        Auth.isLoggedInAsync( function( loggedIn ) {
            if ( loggedIn ) {
                $location.path( '/dashboard' );
            } else {
                vm.isNotLogged = true;
            }
        } );

        function create( form ) {
            vm.submitted = true;
            if ( !form.$valid ) {
                return;
            }
            vm.errors = {};
            vm.isLoading = true;
            console.log( vm.user );
            Auth.register( vm.user )
                .then( function( data ) {
                    console.log( data );
                    if ( data.status == 'success' ) {
                        //register ok
                        doLogin();
                    }

                } )
                .catch( function( err ) {
                    vm.isLoading = false;
                    vm.errors.other = err.message;
                } );
        }

        function doLogin() {
            Auth.login( {
                    login: vm.user.email,
                    password: vm.user.password
                } )
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
