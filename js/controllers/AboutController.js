angular.module('Controllers')
  .controller('AboutCtrl', function ($scope, $rootScope) {
    // Global
    $rootScope.customBodyClass = 'about-page'; // This helps page specific style override
    $rootScope.showShouldScrollArrow = false // This controls the should-scroll-arrow visibility
    // Replication of Data, will think about it later
    $rootScope.isMobileMenuVisible = false;
    $rootScope.showMobileMenu = function () {
      $rootScope.isMobileMenuVisible = !$rootScope.isMobileMenuVisible;
    }
    $scope.section = {
      sectionID: 'about',
      title: 'Share the love.',
      subTitle: '<strong>Y\'ello!</strong> is developed by a small bunch of people who design and code. The team' +
      ' is based in Dhaka and all of them are superstar geeks. Watch our short video to learn more about the product' +
      ' we loved to build!',
      videoUrl: '../assets/videos/updated_yello.mp4',
      cssClass: 'content-gray'
    };
  });