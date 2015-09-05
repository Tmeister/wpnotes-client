( function() {
    'use strict';

    angular
        .module( 'wpnotes' )
        .controller( 'DashController', DashController );

    /** @ngInject */
    function DashController( $log, Auth, Notes, $mdSidenav ) {
        var vm = this;
        vm.notes = {};
        vm.currentNote = {};
        vm.editor = {};
        vm.editorVisible = false;
        vm.logout = Auth.logout;
        vm.setNoteView = setNoteView;

        Auth.isLoggedInAsync( loadNotes );

        vm.editor.toolbar = [
            [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ],
            [ 'bold', 'italics', 'underline', 'strikeThrough' ],
            [ 'ul', 'ol', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull' ],
            [ 'insertImage', 'insertLink' ]
        ];

        function loadNotes( loggedIn ) {
            if ( loggedIn ) {
                vm.notes = Notes.query( {
                    'filter[author]': Auth.getCurrentUser().id
                } );
                $log.log( vm.notes );
                vm.isLogged = true;
            } else {
                vm.isLogged = false;
            }
        }

        function setNoteView( index ) {
            vm.currentNote = vm.notes[ index ];
            vm.editorVisible = true;
        }
    }
} )();
