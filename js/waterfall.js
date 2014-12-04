var waterfall = angular.module('waterfall', ['firebase'])

waterfall.controller('WaterfallController', ['$scope', '$firebase',
  function($scope, $firebase) {
    var fb = $firebase(new Firebase('https://blinding-inferno-9332.firebaseio.com/'))
    $scope.messages = fb.$asArray()

    $scope.toss = function () {
      var rgb = []
        , i

      // Generate random RGB
      for (i = 0; i < 3; i++) {
        rgb.push(Math.round(Math.random()*255))
      }

      $scope.messages.$add({
          text: $scope.newMessage
        , rgb: rgb
        , fontSize: 10 + Math.round(Math.random()*40)
        , createdAt: Date.now()
      })
      $scope.newMessage = ''
    }
  }
])