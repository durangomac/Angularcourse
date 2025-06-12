(function () {
'use strict';

angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {

        var narrow = this;
        narrow.searchTerm = "";
        narrow.found = [];
        narrow.narrowItDown = function () {
            if (!narrow.searchTerm) {
            narrow.found = [];
            return;
            }
            
            MenuSearchService.getMatchedMenuItems(narrow.searchTerm).then(function (result) {
            narrow.found = result;
            });
        };

        narrow.removeItem = function (index) {
            narrow.found.splice(index, 1);
        };
    };

    function FoundItemsDirective() {
    return {
        restrict: 'E',
        templateUrl: 'foundItems.html',
        scope: {
            found: '<',
            onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: 'narrow',
        bindToController: true
    };
  }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var menuList = this;

        menuList.getMatchedMenuItems = function (searchTerm) {

            return $http({
                method: "GET",
                url: ApiBasePath + "/menu_items.json"
            }).then(function (response) {
                var allCategories = response.data;
                var foundItems = [];

                angular.forEach(allCategories, function (category) {
                    if (category.menu_items && category.menu_items.length) {
                        category.menu_items.forEach(function (item) {
                            if (
                                item.description &&
                                item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
                            ) {
                                foundItems.push(item);
                            }
                        });
                    }
                });

                return foundItems;
            });
        };
    }


})();