var waterfall = angular.module('waterfall', ['firebase'])

waterfall.controller('WaterfallController', ['$scope', '$firebase',
  function($scope, $firebase) {
    var fb = $firebase(new Firebase('https://blinding-inferno-9332.firebaseio.com/'))
    $scope.messages = fb.$asArray()

    $scope.toss = function () {
      $scope.messages.$add($scope.newMessage)
      $scope.newMessage = ''
    }
  }
])