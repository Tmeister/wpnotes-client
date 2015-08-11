( function() {
    'use strict';

    angular
        .module( 'wpnotes' )
        .run( runBlock );

    /** @ngInject */
    function runBlock( $log, $rootScope, $location, Auth ) {
        $rootScope.$on( '$stateChangeStart', function( event, next ) {
            Auth.isLoggedInAsync( function( loggedIn ) {
                if ( next.authenticate && !loggedIn ) {
                    $location.path( '/' );
                }
            } );
        } );
    }

} )();
