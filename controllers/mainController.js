main_module.controller('mainController', function($scope, factory) {
    
    // Connects to the raspberry with websocket. Enter the ip-address of Raspi and
    // the port raspi-server is listening as a parameter:
    var socket = io.connect('http://192.168.0.102:8088');

    $scope.measuredVoltage = 0;
    $scope.outputVoltage = 2.5;
    $scope.username = factory.username;
    $scope.outputVoltages = [];
    
    for (i=0; i<8; i++) {$scope.outputVoltages[i]=0};
    
    // Sends the voltage out
    var knob1 = document.getElementById("knob1");
    var knob2 = document.getElementById("knob2");
    //knob1.onchange = emitVoltage();
    knob1.onchange = function(){
        $scope.outputVoltages[0] = 5*(~~knob1.value)/100;
        $scope.$apply();
        var data = 'B' + (Math.round(knob1.value*2.55).toString());
        socket.emit('voltageOut', data);
    };
    knob2.onchange = function(){
        //$scope.outputVoltage = 5*(~~knob2.value)/100;
        $scope.outputVoltages[1] = 5*(~~knob2.value)/100;
        $scope.$apply();
        var data = 'C' + (Math.round(knob2.value*2.55).toString());
        socket.emit('voltageOut', data);

    };

    
    socket.on('voltageIn', function (data) {
        $scope.measuredVoltage = (Math.round((data*5/1023)*100))/100;
        $scope.$apply();
    });
    
 
    $scope.saveClicked = function () {
        
        var presetObject = {
            presetname: "Testipreset",
            cv1: $scope.outputVoltages[0],
            cv2: $scope.outputVoltages[1],
            cv3: $scope.outputVoltages[2],
            cv4: $scope.outputVoltages[3],
            cv5: $scope.outputVoltages[4],
            cv6: $scope.outputVoltages[5],
            cv7: $scope.outputVoltages[6],
            cv8: $scope.outputVoltages[7],    
        }
        
        factory.savePreset(presetObject);
        
    }

        
});
