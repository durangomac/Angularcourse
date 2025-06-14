(function () {
"use strict";

angular.module("data")
.service("MenuDataService", MenuDataService);

MenuDataService.$inject = ["$http", "MenuPath"];
function MenuDataService($http, MenuPath) {
  var service = this;

  // Retrieve all menu categories
  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: MenuPath + "/categories.json"
    })
    .then(function (response) {
      return response.data;
    });
  };

  // Retrieve menu items for a specific category
  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: MenuPath + "/menu_items/" + categoryShortName + ".json"
    })
    .then(function (response) {
      return response.data.menu_items;
    });
  };
}
})();