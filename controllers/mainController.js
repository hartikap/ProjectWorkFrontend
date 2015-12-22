main_module.controller('mainController', function($scope, factory) {
    
    // Connects to the raspberry with websocket. Enter the ip-address of Raspi and
    // the port raspi-server is listening as a parameter:
    var socket = io.connect('http://192.168.0.102:8088');

    $scope.measuredVoltage = 0;
    $scope.outputVoltage = 2.5;
    $scope.username = factory.username;
    
    var knob = document.getElementById("knob");
    knob.onchange = function(){
        $scope.outputVoltage = 5*(~~knob.value)/100;
        $scope.$apply();
        socket.emit('voltageOut', Math.round(knob.value*2.55).toString());
    };

    socket.on('voltageIn', function (data) {
        $scope.measuredVoltage = (Math.round((data*5/1023)*100))/100;
        $scope.$apply();
    });
    
});