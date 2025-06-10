(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
    $scope.lunchItems = "";
    $scope.lunchMessage="";
    $scope.checkLunch = function () {
        var numberOfItems = $scope.lunchItems.split(",")
            .map(function (item) {
                return item.trim();
            })
            .filter(function (item) {
                return item.length > 0;
            }); // removes empty items
    
        if (numberOfItems.length > 3) {
                $scope.lunchMessage = "Too much!";
            } else if (numberOfItems.length === 0 || $scope.lunchItems === "") {
                $scope.lunchMessage = "Please enter data first.";
            } else {
                $scope.lunchMessage = "Enjoy!";
            }
    };
}

})();
