main_module.controller('mainController', function($scope, $timeout, factory) {
    
    // Connects to the raspberry with websocket. Enter the ip-address of Raspi and
    // the port raspi-server is listening as a parameter:
    var socket = io.connect('http://192.168.0.102:8088');

    $scope.measuredVoltage = 0;
    $scope.outputVoltage = 2.5;
    $scope.username = factory.username;
    $scope.outputVoltages = [];
    $scope.currentUserId = factory.currentUserId;
    
    $scope.outputVoltagesRaw = new Array(8);
    for (j=0; j<8; j++) { 
            $scope.outputVoltagesRaw[j]=0;
        }
  

  
    $scope.voltagesProgramMemory = new Array(8);
    for (j=0; j<8; j++) {  
        $scope.voltagesProgramMemory[j] = new Array(8);
        
    }; // Create array of arrays for storing voltages in different setups
    
    for (i=0; i<8; i++) {
        for (j=0; j<8; j++) { 
            $scope.voltagesProgramMemory[i][j]=0;
        }
    
    };
    
    
    for (i=0; i<8; i++) {$scope.outputVoltages[i]=0};
    
    // Sends the voltage out. (Knob-related code could be more modular)
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
        $scope.outputVoltagesRaw[0] = readKnobValue;
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[0] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'A' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob2.onchange = function(){
        readKnobValue = Math.round(knob2.value);
        $scope.outputVoltagesRaw[1] = readKnobValue;
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[1] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'B' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob3.onchange = function(){
        readKnobValue = Math.round(knob3.value);
        $scope.outputVoltagesRaw[2] = readKnobValue;
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[2] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'C' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob4.onchange = function(){
        readKnobValue = Math.round(knob4.value);
        $scope.outputVoltagesRaw[3] = readKnobValue;
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[3] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'D' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob5.onchange = function(){
        readKnobValue = Math.round(knob5.value);
        $scope.outputVoltagesRaw[4] = readKnobValue;
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[4] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'E' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob6.onchange = function(){
        readKnobValue = Math.round(knob6.value);
        $scope.outputVoltagesRaw[5] = readKnobValue;
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[5] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'F' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob7.onchange = function(){
        readKnobValue = Math.round(knob7.value);
        $scope.outputVoltagesRaw[6] = readKnobValue;
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[6] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'G' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };
    knob8.onchange = function(){
        readKnobValue = Math.round(knob8.value);
        $scope.outputVoltagesRaw[7] = readKnobValue;
        valueInVoltage = 5*(readKnobValue)/4095;
        $scope.outputVoltages[7] = Math.round(100*valueInVoltage)/100;
        $scope.$apply();
        var data = 'H' + Math.round(readKnobValue);
        socket.emit('voltageOut', data);
    };

    
    /*socket.on('voltageIn', function (data) {
        $scope.measuredVoltage = (Math.round((data*5/1023)*100))/100;
        $scope.$apply();
    });*/
    
 
    
    $scope.saveClicked = function () {
        
        // TBD: Testaa onko presetname jo käytössä (kaikki presetnamet pitää 
        // ladata etukäteen ohjelmamuistiin!)
        console.log($scope.presetname);
        console.log(factory.currentUserId);
        if (!(($scope.presetname == undefined) || ($scope.presetname == ""))) {
            
            
            var tempArray1 = [];
            var tempArray2 = [];
            var tempArray3 = [];
            var tempArray4 = [];
            var tempArray5 = [];
            var tempArray6 = [];
            var tempArray7 = [];
            var tempArray8 = [];
    
            var presetObject = {presetname: $scope.presetname,
                                cv1: new Array(8),
                                cv2: new Array(8),
                                cv3: new Array(8),
                                cv4: new Array(8),
                                cv5: new Array(8),
                                cv6: new Array(8),
                                cv7: new Array(8),
                                cv8: new Array(8),
                                userid: factory.currentUserId
                               };
            
            for (i=0; i<8; i++) {
                tempArray1[i] = $scope.voltagesProgramMemory[0][i];
                tempArray2[i] = $scope.voltagesProgramMemory[1][i];
                tempArray3[i] = $scope.voltagesProgramMemory[2][i];
                tempArray4[i] = $scope.voltagesProgramMemory[3][i];
                tempArray5[i] = $scope.voltagesProgramMemory[4][i];
                tempArray6[i] = $scope.voltagesProgramMemory[5][i];
                tempArray7[i] = $scope.voltagesProgramMemory[6][i];
                tempArray8[i] = $scope.voltagesProgramMemory[7][i];
            }
            presetObject.cv1 = tempArray1;
            presetObject.cv2 = tempArray2;
            presetObject.cv3 = tempArray3;
            presetObject.cv4 = tempArray4;
            presetObject.cv5 = tempArray5;
            presetObject.cv6 = tempArray6;
            presetObject.cv7 = tempArray7;
            presetObject.cv8 = tempArray8;
            

            factory.savePreset(presetObject);
   
        }
        else {
            console.log("please enter presetname!")
        }
        
    }

    $scope.presetsClicked = function () { 
        factory.getPresets($scope.currentUserId).then(function(response){
            console.log(response.data);
            
        }, function(response){
            console.log("error"+response);
            
        });
    }

    
    // Loads voltages from program-memory into the voltage-knobs (and from there
    // to the websocket)
    $scope.voltagesLoadButtonClicked = function (ch) {
    
        console.log("Loaded: "+ ch);
        $scope.settingLoaded = ch;
        
        //document.getElementById(knob+id).style.background-color = "#A3A3A3";
        document.getElementById("btn1").style.color = "#A3A3A3";
        
        // Updates are inside timeout to prevent multiple simultaneous $apply-  
        // operations. "At any point in time there can be only one $digest or 
        // $apply operation in progress."
        $timeout(function() {
            knob1.value = ~~$scope.voltagesProgramMemory[ch-1][0];
            knob2.value = ~~$scope.voltagesProgramMemory[ch-1][1];
            knob3.value = ~~$scope.voltagesProgramMemory[ch-1][2];
            knob4.value = ~~$scope.voltagesProgramMemory[ch-1][3];
            knob5.value = ~~$scope.voltagesProgramMemory[ch-1][4];
            knob6.value = ~~$scope.voltagesProgramMemory[ch-1][5];
            knob7.value = ~~$scope.voltagesProgramMemory[ch-1][6];
            knob8.value = ~~$scope.voltagesProgramMemory[ch-1][7];
        }, 0);
   
    }
    
    
    // This function saves all the voltages from control-knobs into 
    // program memory (into $scope.voltagesProgramMemory[ch-1] -array). 
    // Voltages are not transferred into database with this function.
    $scope.voltagesSaveButtonClicked = function (ch) {
        
        $scope.settingLoaded = ch;
        
        if (ch == "Empty" || ch == undefined) {
            $scope.errorMessage = "Please select channel!";
        }
        else {
            console.log("saved to channel "+ch);
            $scope.errorMessage = "";
            $scope.voltagesProgramMemory[ch-1] = [
                $scope.outputVoltagesRaw[0],
                $scope.outputVoltagesRaw[1],
                $scope.outputVoltagesRaw[2],
                $scope.outputVoltagesRaw[3],
                $scope.outputVoltagesRaw[4],
                $scope.outputVoltagesRaw[5],
                $scope.outputVoltagesRaw[6],
                $scope.outputVoltagesRaw[7]
            ]; 
        }
    }
    
});
