var fb = new Firebase('https://blinding-inferno-9332.firebaseio.com/')

var waterfall = angular.module('waterfall', [])

waterfall.controller('WaterfallController', ['$scope', function($scope) {
  $scope.messages = [/*'initial','state'*/]

  fb.on('child_added', function (snap) {
    console.log('adding ' + snap.val())
    $scope.messages.push(snap.val())
  })

  $scope.toss = function () {
    console.log('pushing ' + $scope.newMessage)
    fb.push($scope.newMessage)
    $scope.newMessage = ''
  }
}])