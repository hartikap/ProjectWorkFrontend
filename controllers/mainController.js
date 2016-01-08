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
    
    knob1.onchange = function(){
        $scope.outputVoltages[0] = 5*(~~knob1.value)/100;
        $scope.$apply();
        var data = 'B' + (Math.round(knob1.value*2.55).toString());
        socket.emit('voltageOut', data);
    };
    knob2.onchange = function(){
        $scope.outputVoltages[1] = 5*(~~knob2.value)/100;
        $scope.$apply();
        var data = 'C' + (Math.round(knob2.value*2.55).toString());
        socket.emit('voltageOut', data);
    };
    knob3.onchange = function(){
        $scope.outputVoltages[2] = 5*(~~knob3.value)/100;
        $scope.$apply();
        var data = 'C' + (Math.round(knob3.value*2.55).toString());
        socket.emit('voltageOut', data);
    };
    knob4.onchange = function(){
        $scope.outputVoltages[3] = 5*(~~knob4.value)/100;
        $scope.$apply();
        var data = 'C' + (Math.round(knob4.value*2.55).toString());
        socket.emit('voltageOut', data);
    };
    knob5.onchange = function(){
        $scope.outputVoltages[4] = 5*(~~knob5.value)/100;
        $scope.$apply();
        var data = 'C' + (Math.round(knob5.value*2.55).toString());
        socket.emit('voltageOut', data);
    };
    knob6.onchange = function(){
        $scope.outputVoltages[5] = 5*(~~knob6.value)/100;
        $scope.$apply();
        var data = 'C' + (Math.round(knob6.value*2.55).toString());
        socket.emit('voltageOut', data);
    };
    knob7.onchange = function(){
        $scope.outputVoltages[6] = 5*(~~knob7.value)/100;
        $scope.$apply();
        var data = 'C' + (Math.round(knob7.value*2.55).toString());
        socket.emit('voltageOut', data);
    };
    knob8.onchange = function(){
        $scope.outputVoltages[7] = 5*(~~knob8.value)/100;
        $scope.$apply();
        var data = 'C' + (Math.round(knob8.value*2.55).toString());
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
