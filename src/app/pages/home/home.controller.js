( function() {
    'use strict';

    angular
        .module( 'wpnotes' )
        .controller( 'HomeController', HomeController );

    /** @ngInject */
    function HomeController( $log, Auth, $location ) {
        //var vm = this;
        Auth.isLoggedInAsync( function( loggedIn ) {
            if ( loggedIn ) {
                $location.path( '/dashboard' );
            } else {
                $location.path( '/login' );
            }
        } );
    }
} )();
