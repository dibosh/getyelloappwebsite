angular.module('Controllers')
  .controller('MainCtrl', function ($scope, $rootScope, $interval, $http, $timeout) {
    // Global
    $rootScope.customBodyClass = 'home-page'; // This helps page specific style override
    $rootScope.changeSection = function () {
      var index = $rootScope.upArrow ? $scope.visibleSection - 1 : $scope.visibleSection + 1;
      setVisibleSection(index);
    }
    $rootScope.showShouldScrollArrow = true // This controls the should-scroll-arrow visibility
    $rootScope.upArrow = false; // Up or down arrow? Now it,s downward facing arrow.
    $rootScope.isMobileMenuVisible = false;
    $rootScope.showMobileMenu = function () {
      $rootScope.isMobileMenuVisible = !$rootScope.isMobileMenuVisible;
    }
    //
    $scope.subscription = {
      inputGotFocus: false,
      baseUrl: 'http://mailapp.lantastech.com/mails/',
      showMessage: false,
      isOngoing: false,
      okButtonText: 'Submit',
      shouldBlockSlider: false // Used to keep slideshow still on slide 3 for mobile views
    };

    // User started interacting or not
    $scope.subscriptionInputGotFocus = function (flag) {
      $scope.subscription.inputGotFocus = flag;
    }

    // Gives user a textual response regarding subscription success or failure
    var _updateSubscriptionState = function (message) {
      $scope.subscription.showMessage = true;
      $scope.subscription.successText = message;
      $timeout( function(){
        /* Reset it back */
        $scope.subscription.showMessage = false;
        $scope.subscription.successText = '';
        $scope.subscription.email = '';
        if ($scope.subscription.shouldBlockSlider) $scope.subscription.shouldBlockSlider = false;
      }, 4000);
    }

    var _resetSubscriberState = function () {
      $scope.subscription.isOngoing = false;
      $scope.subscription.okButtonText = 'Submit';
    }

    // Subscibes a user
    $scope.subsribeEmail = function () {
      $scope.subscription.shouldBlockSlider = true;
      if ($scope.subscription.email && $scope.subscription.email.trim().length > 0) {
        $scope.subscription.isOngoing = true;
        $scope.subscription.okButtonText = 'Submitting'
        //console.log('Subscribing ' + $scope.subscription.email);
        // Cross server calls
        $http.get($scope.subscription.baseUrl + $scope.subscription.email)
          .then(function (result) {
            $scope.subscription.email = '';
            _updateSubscriptionState('Thanks for your interest! We are excited too, you will know as soon as we release.');
          }, function (error) {
            _updateSubscriptionState('Oops! Something failed to work! Would you mind retrying please?');
          }).finally(function () { _resetSubscriberState(); });
      }
    };


    var backgrounds = ['one', 'two', 'three'];
    $scope.visibleSection = 0;
    $scope.sectionObjectList = [
      {
        sectionID: 0,
        title: 'Yet another contacts manager.',
        subTitle: 'It\'s not something new but we really worked on the experience that you might love.',
        screenUrl: 'assets/images/demo/1.jpg',
        bgImageUrl: '',
        backgroundClass: 'scroll-section-' + backgrounds[0],
        isVisible: true
      },
      {
        sectionID: 1,
        title: 'Organize your contacts using list and tags.',
        subTitle: 'We introduced easy to create tags and lists to keep your contacts consolidated based on your needs.',
        screenUrl: 'assets/images/demo/1.gif',
        bgImageUrl: '',
        backgroundClass: 'scroll-section-' + backgrounds[1],
        isVisible: false
      },
      {
        sectionID: 2,
        title: 'Sharing is just a click away.',
        subTitle: 'It was never so easy to share a single contact or multiple- we gave it another thought.',
        screenUrl: 'assets/images/demo/2.gif',
        bgImageUrl: '',
        backgroundClass: 'scroll-section-' + backgrounds[2],
        isVisible: false
      }
    ];

    $scope.backgroundClass = $scope.sectionObjectList[$scope.visibleSection].backgroundClass;

    function setVisibleSection(newVisibleIndex) {
      newVisibleIndex = newVisibleIndex >= $scope.sectionObjectList.length ? $scope.sectionObjectList.length -1 : (newVisibleIndex < 0 ? 0 : newVisibleIndex);
      if (newVisibleIndex != $scope.visibleSection) {
        $scope.sectionObjectList[$scope.visibleSection].isVisible = false; // Hide previous one
        $scope.visibleSection = newVisibleIndex;
        $scope.sectionObjectList[$scope.visibleSection].isVisible = true; // Show current one
        $scope.backgroundClass = $scope.sectionObjectList[$scope.visibleSection].backgroundClass;
        // Last section is visible, no need to show the arrow indicating user to scroll down.
        if ($scope.visibleSection === $scope.sectionObjectList.length - 1) $rootScope.upArrow = true;
        else $rootScope.upArrow = false;
      }
    }

    $scope.$on('scrolled', function(event, args) {
      var newVisibleIndex = Math.ceil(args.scrollAmount / ((args.viewPortHeight*3)/4)) - 1;
      setVisibleSection(newVisibleIndex);
    });

    //The slideshow should be automatic in mobile
    $scope.slideShow = function () {
      // The third screen on the monitor
      if($scope.visibleSection === 2 && ($scope.subscription.inputGotFocus || $scope.subscription.shouldBlockSlider)) return; // Don't do anything, user is interacting with subscription field
      var index = $scope.visibleSection + 1;
      index = index >= $scope.sectionObjectList.length ? 0 : index; // Circular
      setVisibleSection(index);
    };
    if ($rootScope.isMobileDevice) {
      $interval( function(){ $scope.slideShow(); }, 5000);
    }
  });