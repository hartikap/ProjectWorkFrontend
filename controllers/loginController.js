main_module.controller('loginController', function($scope, factory, $location, Flash) {
    
    $scope.loginClicked = function () {
    
        var userinfo = {
            username: $scope.user,
            password: $scope.pass,
        }
        
        factory.loginUser(userinfo)
            .then(function(data){
                factory.currentUserId = data._id;
            $location.path('/control');
            }, function(data){
                Flash.create('danger', 'Wrong user name or password given', 'custom-class'); 
                console.log("wrong username or password");
         });
        
    
    };
    
    $scope.registerClicked = function () {
        
        console.log("button pressed");
    
        var userinfo = {
            username: $scope.user,
            password: $scope.pass,
        }
        
        var response = factory.saveUser(userinfo);
        
            response.then(function(data){
                Flash.create('success', 'New user added!', 'custom-class'); 
                console.log("New user added");
            },
            function(data){
                Flash.create('danger', 'Username already in use!', 'custom-class');
                console.log("username already in use");
        });
        
    
    };
    
    
    
});