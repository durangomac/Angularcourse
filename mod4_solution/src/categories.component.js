(function () {
"use strict";

angular.module('data')
.component('categories', {
  templateUrl: 'templates/categories.template.html',
  bindings: {
    categories: '<'
  }
});

})();
