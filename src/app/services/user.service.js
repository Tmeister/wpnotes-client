    ( function() {
        'use strict';
        angular
            .module( 'wpnotes' )
            .factory( 'User', function( $resource, API_URL ) {
                return $resource( API_URL + 'wp/v2/users/:id', {
                    id: '@id'
                }, {
                    get: {
                        method: 'GET',
                        params: {
                            id: 'me'
                        }
                    }
                } );
            } );
    } )();
