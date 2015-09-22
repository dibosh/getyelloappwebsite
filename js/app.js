angular.module('Controllers', []);
angular.module('Directives', []);
// The application
var application = angular.module('YelloLandingApp',
  [
    'Controllers',
    'Directives',
    'ngRoute',
    'ngAnimate'
  ]
).filter('trustText', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }])
  .filter("trustUrl", ['$sce', function ($sce) {
    return function (url) {
      return $sce.trustAsResourceUrl(url);
    };
  }]);
// Routes
application.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'views/landing_main.html',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl : 'views/about.html',
      controller  : 'AboutCtrl'
    })
    .when('/content/:fileName', {
      templateUrl : 'views/content-with-header.html',
      controller  : 'ContentWithHeaderCtrl'
    })
    .otherwise({redirectTo: '/'});

  //$locationProvider.html5Mode(true);

}]);

