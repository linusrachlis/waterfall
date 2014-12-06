angular.module('waterfall', ['firebase'])
.filter('getFontSize', function () {
  return function (message) {
    return message.scaleFactor * 40 + 10
  }
})
.filter('getPercentProgress', function () {
  return function (message, now) {
    return message.scaleFactor * (now - message.createdAt) * 0.0001
  }
})
.filter('getOpacity', function () {
  return function (message, now) {
    return 1 - (message.scaleFactor * (now - message.createdAt) * 0.000001)
  }
})
.controller('WaterfallController', ['$scope', '$firebase',
  function($scope, $firebase) {
    var fb = new Firebase('https://blinding-inferno-9332.firebaseio.com/waterfall')
          .orderByChild('createdAt')
          .limitToLast(10)
      , af = $firebase(fb)
    $scope.messages = af.$asArray()

    $scope.toss = function () {
      var rgb = []
        , i

      // Generate random RGB
      for (i = 0; i < 3; i++) {
        rgb.push(Math.round(Math.random() * 255))
      }

      $scope.messages.$add({
          text: $scope.newMessage
        , rgb: rgb
        , scaleFactor: Math.random()
        , createdAt: Date.now()
      })
      $scope.newMessage = ''
    }

    function heartbeat() {
      $scope.$apply(function () {
        $scope.now = Date.now()
      })
    }
    setInterval(heartbeat, 100)
  }
])