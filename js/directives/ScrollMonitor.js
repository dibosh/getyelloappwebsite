angular.module('Directives')
  .directive("scroll", function ($document, $window) {
    return function (scope) {
      scope.lastScrollTop = 0;
      scope.direction = 0; // Down, 1 for up.
      scope.frameIndex = 0; // Current viewable frame
      // Viewport height
      var vH = $(window).height();
      $document.bind("scroll", function () {
        var scrollAmount = $window.pageYOffset;
        if (scrollAmount > scope.lastScrollTop) {
          scope.direction = 0;
        } else {
          scope.direction = 1;
        }
        var delta = Math.abs(scrollAmount - scope.lastScrollTop);
        scope.lastScrollTop = scrollAmount;
        scope.frameIndex = Math.floor(scrollAmount / vH);

        // Generalized broadcast
        scope.$broadcast('scrolled',
          {
            direction: scope.direction === 0 ? 'down' : 'up',
            scrollAmount: scrollAmount,
            delta: delta,
            viewPortHeight: vH
          });
        scope.$apply();
      });
    };
  });