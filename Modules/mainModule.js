var main_module = angular.module('main_module', ['ngRoute', 'ngResource', 'flash']);

main_module.config(function($routeProvider) {
    
    $routeProvider
    .when('/control', {
        templateUrl: 'partial_control.html',
        controller: 'mainController'
    })
    .when('/', {
        templateUrl: 'partial_login.html',
        controller: 'loginController'
    })
    ;
    
    
});