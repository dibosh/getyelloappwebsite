angular.module('Directives')
  .directive('activeLink', ['$location', function (location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var cssClass = attrs.activeLink;
        scope.$on("$routeChangeSuccess", function (event, current, previous) {
          if (attrs.href!=undefined) {
            var path = attrs.href;
            path = path.substring(1);
            if (location.path().indexOf(path) >= 0) {
              element.addClass(cssClass);
            } else {
              element.removeClass(cssClass);
            }
          }
        });
      }
    };
  }]);