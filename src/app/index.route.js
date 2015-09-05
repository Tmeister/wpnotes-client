( function() {
    'use strict';

    angular
        .module( 'wpnotes' )
        .config( routeConfig );

    /** @ngInject */
    function routeConfig( $stateProvider, $urlRouterProvider ) {
        $stateProvider
            .state( 'home', {
                url: '/',
                templateUrl: 'app/pages/home/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            } )
            .state( 'login', {
                url: '/login',
                templateUrl: 'app/pages/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            } )
            .state( 'signup', {
                url: '/signup',
                templateUrl: 'app/pages/signup/signup.html',
                controller: 'SignupController',
                controllerAs: 'signup'
            } )
            .state( 'dash', {
                url: '/dashboard',
                templateUrl: 'app/pages/dashboard/dashboard.html',
                controller: 'DashController',
                controllerAs: 'dash',
                authenticate: true
            } );

        $urlRouterProvider.otherwise( '/' );
    }

} )();
