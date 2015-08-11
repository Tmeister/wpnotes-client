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
        vm.editorVisible = false;
        vm.editor = {};
        vm.logout = Auth.logout;
        vm.setNoteView = setNoteView;

        Auth.isLoggedInAsync( loadNotes );

        vm.editor.toolbar = [
            [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ],
            [ 'bold', 'italics', 'underline', 'strikeThrough' ],
            [ 'ul', 'ol', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull' ],
            [ 'insertImage', 'insertLink' ]
        ];

        function loadNotes() {
            console.log( Auth.getCurrentUser().id )
            vm.notes = Notes.query( {
                author: Auth.getCurrentUser().id
            } );
            $log.log( vm.notes );
        }

        function setNoteView( index ) {
            vm.currentNote = vm.notes[ index ];
            vm.editorVisible = true;
        }
    }
} )();
