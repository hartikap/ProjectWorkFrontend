main_module.factory('factory', function($resource, $http) {
    
    var factory = {};
    
    factory.presets = [];
    
    // Save new user to database (register)
    factory.saveUser = function (userinfo) {
        return $http.post('presets/register', userinfo);
        
        
    }
    
    
    factory.loginUser = function (userinfo) {
         return $http.post('presets/login', userinfo);
         
         
        
    }
    
    
    
    
    
    factory.savePreset = function(preset) {
        
        
        return $http.post('presets', preset).success(function(data){
            //factory.presets.push(data); //add the new preset to the list of current users presets
            console.log("Tallennettu presetti: "+ data);
        }); 
    };
    
    
    // gets all presets for a certain user
    factory.getPresets = function(uid) {
        return $http.post('presets/getpresets', {userid: uid});
            
        
    }
        
    
    return factory;
})