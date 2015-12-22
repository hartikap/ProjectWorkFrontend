var main_module = angular.module('main_module', ['ngRoute', 'ngResource']);

main_module.config(function($routeProvider) {
    
    $routeProvider
    .when('/', {
        templateUrl: 'partial_control.html',
        controller: 'mainController'
    })
    ;
    
    
});