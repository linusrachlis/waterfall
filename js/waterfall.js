var fb = new Firebase('https://blinding-inferno-9332.firebaseio.com/')

var waterfall = angular.module('waterfall', [])

waterfall.controller('WaterfallController', ['$scope', '$timeout',
  function($scope, $timeout) {
    $scope.messages = []

    fb.on('child_added', function (snap) {
      $scope.$apply(function () {
        $scope.messages.push(snap.val())
      })
    })

    $scope.toss = function () {
      var newMessage = $scope.newMessage
      $timeout(function() {
        fb.push(newMessage)
      }, 0)
      $scope.newMessage = ''
    }
  }
])