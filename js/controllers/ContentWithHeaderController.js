angular.module('Controllers')
  .controller('ContentWithHeaderCtrl', function ($scope, $rootScope, $routeParams) {
    // Global
    $rootScope.customBodyClass = 'about-page special-content'; // This helps page specific style override
    var CONTENT_BASE_URL = 'views/partials/';
    $scope.title = $routeParams.fileName === 'tandc' ? 'Terms & Conditions' : 'Privacy Policy';
    $scope.contentHTMLUrl = CONTENT_BASE_URL + $routeParams.fileName + '.html';
  });