angular.module('Directives')
  .directive('mobileDevice', function () {
    return {
      restrict: 'A',
      scope : {
        isMobile: '=',
      },
      link: function(scope) {
        var vW = $(window).width();
        if(vW <= 640) {
          scope.isMobile = true;
        } else {
          scope.isMobile = false;
        }
      }
    };
  });