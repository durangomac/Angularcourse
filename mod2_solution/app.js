(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService)

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var showList = this;

        showList.items = ShoppingListCheckOffService.GetToBuyItems();
        showList.boughtItem = function (index) {
            ShoppingListCheckOffService.boughtItem(index);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var showList = this;

        showList.items = ShoppingListCheckOffService.GetBoughtItems();
    }

    function ShoppingListCheckOffService(){
        var listCheckOff = this;

        var toBuy = [
            { name: "Cookies", quantity: 10 },
            { name: "Chips", quantity: 5 },
            { name: "Soda", quantity: 2 },
            { name: "Bread", quantity: 1 },
            { name: "Milk", quantity: 3 },
            { name: "Ice Cream", quantity: 5}
        ];
        var bought = [];

        listCheckOff.boughtItem = function(index) {
            var item = {
                name: toBuy[index].name,
                quantity: toBuy[index].quantity
            };

            bought.push(item);
            toBuy.splice(index,1);
        };

        listCheckOff.GetToBuyItems = function () {
            return toBuy;
        };
        listCheckOff.GetBoughtItems = function () {
            return bought;
        };


    }
})();
