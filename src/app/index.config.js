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

        $mdThemingProvider.definePalette( 'water-green', {
            '50': 'edfaf9',
            '100': 'dcf6f3',
            '200': 'b9ede7',
            '300': '96e4da',
            '400': '73dbce',
            '500': '50d2c2',
            '600': '4bc7b8',
            '700': '42c5b5',
            '800': '3cbbab',
            '900': '36ae9f',
            'A100': 'b9ede7',
            'A200': '96e4da',
            'A400': '4bc7b8',
            'A700': '42c5b5',
            'contrastDefaultColor': 'light',
        } );

        $mdThemingProvider.theme( 'default' )
            .primaryPalette( 'water-green' )
            .accentPalette( 'red' );

        $mdThemingProvider.theme( 'light' )
            .primaryPalette( 'water-green' )
            .accentPalette( 'pink' );

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
