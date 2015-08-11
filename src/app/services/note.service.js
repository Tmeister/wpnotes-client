    ( function() {
        'use strict';
        angular
            .module( 'wpnotes' )
            .factory( 'Notes', function( $resource, API_URL ) {
                return $resource( API_URL + 'wp/v2/notes/:id', {
                    id: '@id'
                } );
            } );
    } )();
