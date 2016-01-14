/**
 * Created by Ted on 2016/1/5.
 */
var teaApp = angular.module('demo', []);
teaApp.controller('MainController', ['$scope', 'teaWebService', function ($scope, teaWebService) {

    // Setup a view model
    var vm = {};
    vm.list = [];

    // Start the initial load of lists
    teaWebService.getItems().then(function (response) {
        vm.list = response.data.items;
    });

    vm.addItem = function () {
        var item = {
            //details: vm.newItemDetails   // ==>
            temperature1: vm.newItemTemperature1,
            minute1: vm.newItemMinute1,
            second1: vm.newItemSecond1,

            temperature2: vm.newItemTemperature2,
            minute2: vm.newItemMinute2,
            second2: vm.newItemSecond2,

            temperature3: vm.newItemTemperature3,
            minute3: vm.newItemMinute3,
            second3: vm.newItemSecond3,

            temperature4: vm.newItemTemperature4,
            minute4: vm.newItemMinute4,
            second4: vm.newItemSecond4,

            temperature5: vm.newItemTemperature5,
            minute5: vm.newItemMinute5,
            second5: vm.newItemSecond5,

            temperature6: vm.newItemTemperature6,
            minute6: vm.newItemMinute6,
            second6: vm.newItemSecond6,

            barcode: countBarcode(vm)
        };

        // Clear it from the UI
        vm.newItemTemperature1 = 100;
        vm.newItemMinute1 = 3;
        vm.newItemSecond1 = 0;

        vm.newItemTemperature2 = 100;
        vm.newItemMinute2 = '3';
        vm.newItemSecond2 = 0;

        vm.newItemTemperature3 = 100;
        vm.newItemMinute3 = '3';
        vm.newItemSecond3 = 0;

        vm.newItemTemperature4 = 100;
        vm.newItemMinute4 = '3';
        vm.newItemSecond4 = 0;

        vm.newItemTemperature5 = 100;
        vm.newItemMinute5 = '3';
        vm.newItemSecond5 = 0;

        vm.newItemTemperature6 = 100;
        vm.newItemMinute6 = '3';
        vm.newItemSecond6 = 0;

        // Send the request to the server and add the item once done
        teaWebService.addItem(item).then(function (response) {

            vm.list.push({
                _id: response.data.itemId,
                barcode: item.barcode,

                // details: item.details //==>
                temperature1: item.temperature1,
                minute1: item.minute1,
                second1: item.second1,

                temperature2: item.temperature2,
                minute2: item.minute2,
                second2: item.second2,

                temperature3: item.temperature3,
                minute3: item.minute3,
                second3: item.second3,

                temperature4: item.temperature4,
                minute4: item.minute4,
                second4: item.second4,

                temperature5: item.temperature5,
                minute5: item.minute5,
                second5: item.second5,

                temperature6: item.temperature6,
                minute6: item.minute6,
                second6: item.second6

            });
        });
    };

    vm.removeItem = function (itemToRemove) {
        // Remove it from the list and send the server request
        vm.list = vm.list.filter(function (item) {
            console.log(item._id);
            return item._id !== itemToRemove._id;
        });
        teaWebService.removeItem(itemToRemove);
    };

    // For new items:
    // vm.newItemDetails = ''; //==>
    vm.newItemTemperature1 = 100;
    vm.newItemMinute1 = 3;
    vm.newItemSecond1 = 0;

    vm.newItemTemperature2 = 100;
    vm.newItemMinute2 = 3;
    vm.newItemSecond2 = 0;

    vm.newItemTemperature3 = 100;
    vm.newItemMinute3 = 3;
    vm.newItemSecond3 = 0;

    vm.newItemTemperature4 = 100;
    vm.newItemMinute4 = 3;
    vm.newItemSecond4 = 0;

    vm.newItemTemperature5 = 100;
    vm.newItemMinute5 = 3;
    vm.newItemSecond5 = 0;

    vm.newItemTemperature6 = 100;
    vm.newItemMinute6 = 3;
    vm.newItemSecond6 = 0;

    // expose the vm using the $scope
    $scope.vm = vm;

    //Toggle for automatic ($scope.auto == true) / manual parameter mode ($scope.auto == false)
    $scope.auto = true;
    $scope.isAuto = function(){
        return $scope.auto;
    }
    $scope.switchAuto = function(){
        $scope.auto = !$scope.auto;
    }


}]);

teaApp.service('teaWebService', ['$http', function ($http) {
    var root = '/tea';
    return {
        getItems: function () {
            return $http.get(root);
        },
        addItem: function (item) {
            return $http.post(root, item);
        },
        removeItem: function (item) {
            return $http.delete(root + '/' + item._id);
        },
        updateItem: function (item) {                        // extra added
            return $http.get(root + '/' + item._id + '/' + item.barcode);
        }
    }
}]);

//自創: countBarcode (學removeItem,)
var countBarcode = function(vm){
    /*
     (1) temperature-barcode:
     temperature-barcode = temperature - 70 °C (bottom temperature degree)
     and put as 30-digit calculation by "0123456789ABCDEFGHIGKLMNOPQRSTU (VWXYZ) "
     Ex:
     70 °C : "0"
     80 C : "A"
     100 °C : "U"
     (2) time-barcode:

     temperature-barcode = temperature - 70 °C (bottom temperature degree)
     and put as 36-digit number calculation by "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
     Ex:
     70 °C : "0"
     80 C : "A"
     100 °C : "U"
     */
    const temperatureDigitStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const bottomTemperature = 70;
    var tempResult1 = temperatureDigitStr.charAt( vm.newItemTemperature1 - bottomTemperature );
    var tempResult2 = temperatureDigitStr.charAt( vm.newItemTemperature2 - bottomTemperature );
    var tempResult3 = temperatureDigitStr.charAt( vm.newItemTemperature3 - bottomTemperature );
    var tempResult4 = temperatureDigitStr.charAt( vm.newItemTemperature4 - bottomTemperature );
    var tempResult5 = temperatureDigitStr.charAt( vm.newItemTemperature5 - bottomTemperature );
    var tempResult6 = temperatureDigitStr.charAt( vm.newItemTemperature6 - bottomTemperature );

    const timeDigitStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var timeSecond1 = 0,
        timeSecond2 = 0,
        timeSecond3 = 0,
        timeSecond4 = 0,
        timeSecond5 = 0,
        timeSecond6 = 0;
    var timeResult1 = "",
        timeResult2 = "",
        timeResult3 = "",
        timeResult4 = "",
        timeResult5 = "",
        timeResult6 = "";

    timeSecond1 = vm.newItemMinute1 * 60 + vm.newItemSecond1;
    var timeResult1 = timeDigitStr.charAt( timeSecond1 / 36 ) + timeDigitStr.charAt ( timeSecond1 % 36 );

    timeSecond2 = vm.newItemMinute2 * 60 + vm.newItemSecond2;
    var timeResult2 = timeDigitStr.charAt( timeSecond2 / 36 ) + timeDigitStr.charAt ( timeSecond2 % 36 );

    timeSecond3 = vm.newItemMinute3 * 60 + vm.newItemSecond3;
    var timeResult3 = timeDigitStr.charAt( timeSecond3 / 36 ) + timeDigitStr.charAt ( timeSecond3 % 36 );

    timeSecond4 = vm.newItemMinute4 * 60 + vm.newItemSecond4;
    var timeResult4 = timeDigitStr.charAt( timeSecond4 / 36 ) + timeDigitStr.charAt ( timeSecond4 % 36 );

    timeSecond5 = vm.newItemMinute5 * 60 + vm.newItemSecond5;
    var timeResult5 = timeDigitStr.charAt( timeSecond5 / 36 ) + timeDigitStr.charAt ( timeSecond5 % 36 );

    timeSecond6 = vm.newItemMinute6 * 60 + vm.newItemSecond6;
    var timeResult6 = timeDigitStr.charAt( timeSecond6 / 36 ) + timeDigitStr.charAt ( timeSecond6 % 36 );

    var barcodeResult = tempResult1 + timeResult1 +
        tempResult2 + timeResult2 +
        tempResult3 + timeResult3 +
        tempResult4 + timeResult4 +
        tempResult5 + timeResult5 +
        tempResult6 + timeResult6;
    alert(
        "/n tempResult1:" + tempResult1 +
        "/n tempResult2:" + tempResult2 +
        "/n tempResult3:" + tempResult3 +
        "/n tempResult4:" + tempResult4 +
        "/n tempResult5:" + tempResult5 +
        "/n tempResult6:" + tempResult6 +
        "/n timeResult1:[" + timeResult1 + "] timeSecond1: [" + timeSecond1 + "]" +
        "/n timeResult2:[" + timeResult2 + "] timeSecond2: [" + timeSecond2 + "]" +
        "/n timeResult3:[" + timeResult3 + "] timeSecond3: [" + timeSecond3 + "]" +
        "/n timeResult4:[" + timeResult4 + "] timeSecond4: [" + timeSecond4 + "]" +
        "/n timeResult5:[" + timeResult5 + "] timeSecond5: [" + timeSecond5 + "]" +
        "/n timeResult6:[" + timeResult6 + "] timeSecond6: [" + timeSecond6 + "]" +
        "/n Barcode:" + barcodeResult
    );
    //vm.newBarcode = barcodeResult;
    return barcodeResult;
};
