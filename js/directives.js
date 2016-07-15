var directives = angular.module('directives',['controllers', 'ngAnimate']);
directives.directive('ngRightClick', function($parse) {
  return function(scope, element, attrs) {
    var fn = $parse(attrs.ngRightClick);
    element.bind('contextmenu', function(event) {
      scope.$apply(function() {
        event.preventDefault();
        fn(scope, {$event:event});
      });
    });
  };
});

directives.directive('notification', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            template:"<div class='alert alert-{{alertData.type}}' ng-show='alertData.message' role='alert' data-notification='{{alertData.status}}'>{{alertData.message}}</div>",
            scope:{
              alertData:"="
            }
        };
    }]);