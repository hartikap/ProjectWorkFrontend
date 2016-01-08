main_module.controller('loginController', function($scope, factory, $location) {
    
    $scope.loginClicked = function () {
        
        console.log("button pressed");
    
        var userinfo = {
            username: $scope.inputName,
            password: $scope.inputPassword,
        }
        
        factory.loginUser(userinfo);
        $location.path('/control');
    
    };
    
    $scope.registerClicked = function () {
        
        console.log("button pressed");
    
        var userinfo = {
            username: $scope.user,
            password: $scope.pass,
        }
        
        factory.saveUser(userinfo);
        $location.path('/control');
    
    };
    
    
    
});