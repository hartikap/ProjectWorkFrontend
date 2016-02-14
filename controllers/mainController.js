main_module.controller('mainController', function($scope, factory) {
    
    // Connects to the raspberry with websocket. Enter the ip-address of Raspi and
    // the port raspi-server is listening as a parameter:
    var socket = io.connect('http://192.168.0.102:8088');

    $scope.measuredVoltage = 0;
    $scope.outputVoltage = 2.5;
    $scope.username = factory.username;
    $scope.outputVoltages = [];
    $scope.currentUserId = factory.currentUserId;
    
    
    
    for (i=0; i<8; i++) {$scope.outputVoltages[i]=0};
    
    // Sends the voltage out
    var knob1 = document.getElementById("knob1");
    var knob2 = document.getElementById("knob2");
    var knob3 = document.getElementById("knob3");
    var knob4 = document.getElementById("knob4");
    var knob5 = document.getElementById("knob5");
    var knob6 = document.getElementById("knob6");
    var knob7 = document.getElementById("knob7");
    var knob8 = document.getElementById("knob8");
    knob1.setAttribute("max", 4095)
    knob1.setAttribute("value", 2000)
    knob2.setAttribute("max", 4095)
    knob2.setAttribute("value", 2000)
    knob3.setAttribute("max", 4095)
    knob3.setAttribute("value", 2000)
    knob4.setAttribute("max", 4095)
    knob4.setAttribute("value", 2000)
    knob5.setAttribute("max", 4095)
    knob5.setAttribute("value", 2000)
    knob6.setAttribute("max", 4095)
    knob6.setAttribute("value", 2000)
    knob7.setAttribute("max", 4095)
    knob7.setAttribute("value", 2000)
    knob8.setAttribute("max", 4095)
    knob8.setAttribute("value", 2000)
    
    var readKnobValue = 0;
    knob1.onchange = function(){
        readKnobValue = Math.round(knob1.value);
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[0] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'A' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
        
        //$scope.outputVoltages[0] = readKnobValue;
        //$scope.outputVoltages[0] = 5*(~~knob1.value)/100;
         //var data = 'B' + (Math.round(knob1.value*2.55).toString());
    };
    knob2.onchange = function(){
        readKnobValue = Math.round(knob2.value);
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[1] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'B' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob3.onchange = function(){
        readKnobValue = Math.round(knob3.value);
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[2] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'C' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob4.onchange = function(){
        readKnobValue = Math.round(knob4.value);
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[3] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'D' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob5.onchange = function(){
        readKnobValue = Math.round(knob5.value);
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[4] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'E' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob6.onchange = function(){
        readKnobValue = Math.round(knob6.value);
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[5] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'F' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob7.onchange = function(){
        readKnobValue = Math.round(knob7.value);
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[6] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'G' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob8.onchange = function(){
        readKnobValue = Math.round(knob8.value);
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[7] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'H' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };

    
    socket.on('voltageIn', function (data) {
        $scope.measuredVoltage = (Math.round((data*5/1023)*100))/100;
        $scope.$apply();
    });
    
 
    
    $scope.saveClicked = function () {
        
        var presetObject = {
            presetname: $scope.presetname,
            cv1: $scope.outputVoltages[0],
            cv2: $scope.outputVoltages[1],
            cv3: $scope.outputVoltages[2],
            cv4: $scope.outputVoltages[3],
            cv5: $scope.outputVoltages[4],
            cv6: $scope.outputVoltages[5],
            cv7: $scope.outputVoltages[6],
            cv8: $scope.outputVoltages[7],
            userid: factory.currentUserId,
        }
        
        factory.savePreset(presetObject);
        
    }
    
    
    $scope.presetsClicked = function () {
        
        factory.getPresets($scope.currentUserId);
    
    }

    
    $scope.presetButtonClicked = function (cv) {
        
        console.log(cv);
        
        
    }
    
        
});
