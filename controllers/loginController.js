main_module.controller('loginController', function($scope, factory, $location) {
    
    $scope.loginClicked = function () {
        
        console.log("button pressed");
    
        $location.path('/control');
    
    };
    
    
    
});