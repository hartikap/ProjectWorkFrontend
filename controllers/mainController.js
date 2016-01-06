main_module.controller('mainController', function($scope, factory) {
    
    // Connects to the raspberry with websocket. Enter the ip-address of Raspi and
    // the port raspi-server is listening as a parameter:
    var socket = io.connect('http://192.168.0.102:8088');

    $scope.measuredVoltage = 0;
    $scope.outputVoltage = 2.5;
    $scope.username = factory.username;
    $scope.outputVoltages = [];
    
    // Sends the voltage out
    var knob1 = document.getElementById("knob1");
    var knob2 = document.getElementById("knob2");
    //knob1.onchange = emitVoltage();
    knob1.onchange = function(){
        $scope.outputVoltage = 5*(~~knob1.value)/100;
        $scope.$apply();
        var data = 'B' + (Math.round(knob1.value*2.55).toString());
        socket.emit('voltageOut', data);
    };
    knob2.onchange = function(){
        //$scope.outputVoltage = 5*(~~knob2.value)/100;
        $scope.outputVoltages[0] = 5*(~~knob2.value)/100;
        $scope.$apply();
        var data = 'C' + (Math.round(knob2.value*2.55).toString());
        socket.emit('voltageOut', data);

    };

    
    
    
    /*var numKnobs = 8;
      window.addEventListener('WebComponentsReady', function(){
        var knobs = [];
        var i;
        var changing = false;
        for(i = 0; i < numKnobs; i++) {
          var knob = document.createElement('x-knobjs-knob')
          knobs.push(knob);
          document.body.appendChild(knob);
        }
        for(i = 0; i < numKnobs; i++) { (function(j){
          knobs[i].addEventListener('change', function(){
            var i;
            if(changing) return;
            changing = true;
            for(i = 0; i < numKnobs; i++) {
              knobs[i].value = knobs[j].value;
                $scope.outputVoltages[i] = knobs[j].value;
                $scope.$apply();
            }
            changing = false;
          });
        })(i);}
      });*/
    
    

    
    
    
    
    socket.on('voltageIn', function (data) {
        $scope.measuredVoltage = (Math.round((data*5/1023)*100))/100;
        $scope.$apply();
    });
    
     $scope.emitVoltage = function() {
        console.log("moro");
        
    };
    
   //var emitVoltage = function(knob) {
        /*$scope.outputVoltage = 5*(~~knob.value)/100;
        $scope.$apply();
        socket.emit('voltageOut', Math.round(knob.value*2.55).toString());
        */
    //};
    

    
    
});
