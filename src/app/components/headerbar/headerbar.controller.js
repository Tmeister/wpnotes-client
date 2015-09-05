( function() {
    'use strict';

    angular
        .module( 'wpnotes' )
        .controller( 'HeaderController', HeaderController );

    /** @ngInject */
    function HeaderController( $log, Auth, $location ) {
        var vm = this;
        vm.isLoggedIn = Auth.isLoggedIn;
        vm.getCurrentUser = Auth.getCurrentUser;
        vm.getUserAvatar = getUserAvatar;
        vm.logout = logout;

        function getUserAvatar() {
            if ( vm.getCurrentUser().avatar_urls ) {
                return vm.getCurrentUser().avatar_urls[ 48 ]
            }
            return '';
        }

        function logout() {
            console.log( 'Out' );
            Auth.logout( true );
        }

    }
} )();
