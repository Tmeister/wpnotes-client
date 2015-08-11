    ( function() {
        'use strict';
        angular
            .module( 'wpnotes' )
            .filter( "htmlToPlainText", function() {
                return function( input ) {
                    return input.replace( /<[^>]+>/gm, '' );
                }
            } )
    } )();
