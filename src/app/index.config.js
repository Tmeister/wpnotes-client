( function() {
    'use strict';

    angular
        .module( 'wpnotes' )
        .factory( 'authInterceptor', authInterceptor )
        .config( config );

    /** @ngInject */
    function config( $logProvider, $mdThemingProvider, $locationProvider, $httpProvider ) {
        $logProvider.debugEnabled( true );
        $locationProvider.html5Mode( true );
        $httpProvider.interceptors.push( 'authInterceptor' );
        $mdThemingProvider.theme( 'default' )
            .primaryPalette( 'blue' )
            .accentPalette( 'red' );

        /*$mdThemingProvider.theme( 'light' )
            .primaryPalette( 'light-blue' )
            .accentPalette( 'blue' );*/

    }

    function authInterceptor( $rootScope, $q, $cookieStore, $location ) {
        return {
            request: function( config ) {
                config.headers = config.headers || {};
                if ( $cookieStore.get( 'token' ) ) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get( 'token' );
                }
                return config;
            },
            // Intercept 401s and redirect you to login
            responseError: function( response ) {
                if ( response.status === 401 ) {
                    $location.path( '/' );
                    $cookieStore.remove( 'token' );
                    return $q.reject( response );
                } else {
                    return $q.reject( response );
                }
            }
        };
    }
} )();
