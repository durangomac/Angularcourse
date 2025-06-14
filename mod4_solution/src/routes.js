(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.template.html'
  })

  // Categories list
.state('categories', {
  url: '/categories',
  template: '<categories categories="$ctrl.categories"></categories>',
  controller: ['categories', function (categories) {
    this.categories = categories;
  }],
  controllerAs: '$ctrl',
  resolve: {
    categories: ['MenuDataService', function (MenuDataService) {
      return MenuDataService.getAllCategories();
    }]
  }
})

// Items for a specific category
.state('items', {
  url: '/items/{categoryShortName}',
  template: '<items items="$ctrl.items" category-short-name="{{ $ctrl.categoryShortName }}"></items>',
  controller: ['items', 'categoryShortName', function (items, categoryShortName) {
    this.items = items;
    this.categoryShortName = categoryShortName;
  }],
  controllerAs: '$ctrl',
  resolve: {
    items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
      return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
    }],
    categoryShortName: ['$stateParams', function ($stateParams) {
      return $stateParams.categoryShortName;
    }]
  }
})
}

})();