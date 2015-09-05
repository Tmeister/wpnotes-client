( function() {
    'use strict';

    angular
        .module( 'wpnotes' )
        .factory( 'Auth', authentication );

    /** @ngInject */
    function authentication( $location, $rootScope, $http, $cookieStore, $q, $log, User, API_URL ) {

        var currentUser = {};
        var service = {};

        if ( $cookieStore.get( 'token' ) ) {
            currentUser = User.get();
        }

        service.login = login;
        service.logout = logout;
        service.register = register;
        service.getCurrentUser = getCurrentUser;
        service.isLoggedIn = isLoggedIn;
        service.isLoggedInAsync = isLoggedInAsync;

        return service;

        function login( user, callback ) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.post( API_URL + 'jwt-auth/v1/token', {
                    username: user.login,
                    password: user.password
                } )
                .success( function( data ) {
                    $cookieStore.put( 'token', data.token );
                    currentUser = User.get();
                    deferred.resolve( data );
                    return cb();
                } )
                .error( function( err ) {
                    logout( false );
                    deferred.reject( err[ 0 ] );
                    return cb( err );
                }.bind( this ) );

            return deferred.promise;
        }

        function register( user, callback ) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();
            $http.post( API_URL + 'wpnotes/v1/register', user )
                .success( function( data ) {
                    deferred.resolve( data );
                    return cb();
                } )
                .error( function( err ) {
                    deferred.reject( err[ 0 ] );
                    return cb( err );
                }.bind( this ) );

            return deferred.promise;
        }

        function logout( redirect ) {
            $cookieStore.remove( 'token' );
            currentUser = {};
            if ( redirect ) {
                $location.path( '/' );
            }
        }

        function getCurrentUser() {
            return currentUser;
        }

        function isLoggedIn() {
            return currentUser.hasOwnProperty( 'id' );
        }

        function isLoggedInAsync( cb ) {
            if ( currentUser.hasOwnProperty( '$promise' ) ) {
                currentUser.$promise.then( function() {
                    cb( true );
                } ).catch( function() {
                    cb( false );
                } );
            } else if ( currentUser.hasOwnProperty( 'id' ) ) {
                cb( true );
            } else {
                cb( false );
            }
        }
    }
} )();
