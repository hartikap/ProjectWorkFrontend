main_module.factory('factory', function($resource, $http) {
    
    var factory = {};
    
    factory.presets = [];
    
    
    
    factory.savePreset = function(preset) {
        return $http.post('presets', preset).success(function(data){
            factory.presets.push(data); //add the new preset to the list of current users presets
            console.log("Tallennettu presetti: "+ data);
        });  
    };
    
    
    // gets all presets for a certain user
    factory.getPresets = function(user_id) {
        return $http.get('presets', user_id).success(function(data){
            
            
        })
        
    }
    
    return factory;
})