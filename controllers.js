var controllers = angular.module('controllers',['directives']);
controllers.controller('minesweeperCtrl', function($scope, $interval){

  var minefield = require('minefieldClass.js');
  $scope.minefield = new minefield();

//   function createMinefield() {
//     var minefield = {};
//     minefield.rows = [];

//     minefield.rows.forEach(function(i, index) {
//       var row = {};
//       row.spots = [];
      
//       row.spots.forEach(function(j, index) {
//         var spot = {};
//         spot.isCovered = true;
//         spot.content = 'empty'
//         spot.flag = false;
//         spot.isRevealed = false;
//         spot.mineBlast = false;
//         spot.wrongFlag = false;
//         row.spots.push(spot);
//       });
      
//       minefield.rows.push(row);
//     });

//     placeMines(minefield);
//     calculateAllNumbers(minefield);

//     return minefield;
//   }

//   function getSpot(minefield, row, column) {
//     return minefield.rows[row].spots[column];
//   }

//   function placeMines(minefield) {
//     forEach(function(i, index) {
//       while(true){
//         var row = Math.round(Math.random() * 8);
//         var column = Math.round(Math.random() * 8);
//         var spot = getSpot(minefield, row, column);
//         if (spot.content == "empty"){
//           break;
//         }
//       }
//       spot.content = "mine";
//     });
//   }

//   function calculateNumber(minefield, row, column) {
//     var thisSpot = getSpot(minefield, row, column);

//     if(thisSpot.content == "mine") {
//       return;
//     }

//     var mineCount = 0;

//     if(row > 0) {
//       if(column > 0) {
//       // top left spot
//       var spot = getSpot(minefield, row - 1, column - 1);
//       if(spot.content == "mine") {
//         mineCount++;
//       }
//     }
//   // top center spot
//   var spot = getSpot(minefield, row - 1, column);
//   if(spot.content == "mine") {
//     mineCount++;
//   }   
//   if(column < 8) {
//       // top right spot
//       var spot = getSpot(minefield, row - 1, column + 1);
//       if(spot.content == "mine") {
//         mineCount++;
//       }
//     }
//   }
//   if(column > 0) {
// // left spot
// var spot = getSpot(minefield, row, column - 1);
// if(spot.content == "mine") {
//   mineCount++;
// }
// }
// if(column < 8) {
// // right spot
// var spot = getSpot(minefield, row, column + 1);
// if(spot.content == "mine") {
//   mineCount++;
// }
// }
// if(row < 8) {
//   if(column > 0) {
//   // bottom left spot
//   var spot = getSpot(minefield, row + 1, column - 1);
//   if(spot.content == "mine") {
//     mineCount++;
//   }
// }
// // bottom center spot  
// var spot = getSpot(minefield, row + 1, column);
// if(spot.content == "mine") {
//   mineCount++;
// }
// if(column < 8) {
//   // bottom right
//   var spot = getSpot(minefield, row + 1, column + 1);
//   if(spot.content == "mine") {
//     mineCount++;
//   }
// }
// }

// if(mineCount > 0) {
//   thisSpot.content = mineCount;
// }
// }

// function calculateAllNumbers(minefield) {
//   forEach(function(y, index) {
//     forEach(function(x, index) {
//       calculateNumber(minefield, x, y);
//     });
//   });
// }

// function clearSpots(minefield) {
//   forEach(function(row, index) {
//     forEach(function(column, index) {
//       var spot = getSpot(minefield, row, column);
//       if(!spot.isCovered && spot.content == 'empty') {
//         if(row>0){
//           if(column>0){
//            x = getSpot(minefield, row - 1, column - 1);
//            $scope.uncoverSpot(x);
//          }
//           x = getSpot(minefield, row - 1, column - 1);
//            $scope.uncoverSpot(x);
//          if(column<8){
//           x = getSpot(minefield, row - 1, column - 1);
//            $scope.uncoverSpot(x);
//         }
//       }
//       if(column>0){
//         x = getSpot(minefield, row - 1, column - 1);
//            $scope.uncoverSpot(x);
//       }
//       if(column<8){
//         x = getSpot(minefield, row - 1, column - 1);
//            $scope.uncoverSpot(x);
//       }
//       if(row<8){
//         if(column>0){
//          x = getSpot(minefield, row - 1, column - 1);
//            $scope.uncoverSpot(x);
//         }
//         x = getSpot(minefield, row - 1, column - 1);
//            $scope.uncoverSpot(x);
//         if(column<8){
//           x = getSpot(minefield, row - 1, column - 1);
//            $scope.uncoverSpot(x);
//         }
//       }
//     }
//   });
// });
// }

// function hasWon(minefield) {
//   forEach(function(y, index) {
//     forEach(function(x, index) {
//       var spot = getSpot(minefield, y, x);
//       if(spot.isCovered && spot.content != "mine") {
//         return false;
//       }
//     }); 
//   });  
//   return true;
// } 

var gameInProgress = false;
var startTime;
$scope.init = true;

$scope.startGame = function() {
  $scope.minefield = createMinefield();
  gameInProgress = true;
  startTime = getTime();
  $scope.init = false;
}

$scope.flagSpot = function(spot) {
  if(spot.isCovered && spot.flag){
    spot.flag = false;
  }
  if(spot.isCovered && !spot.flag) {
    spot.flag = true;
  }
  
};

$scope.uncoverSpot = function(spot) {
  if(spot.flag) {spot.flag = false;}
  if (spot.isCovered) {spot.isCovered = false;
    if(spot.content == 'mine') {
      gameInProgress = false;
      $scope.loseMessage = true;
      $scope.losses++;
      forEach(function(y, index) {
        forEach(function(x, index) {
          getSpot($scope.minefield, y, x).isCovered = false;
          getSpot($scope.minefield, y, x).isRevealed = true;
          getSpot($scope.minefield, y, x).wrongFlag = true;
          getSpot($scope.minefield, y, x).mineBlast = true;
        }); 
      });
    } 
    else if(hasWon($scope.minefield)) {
      $scope.winMessage = true;
      $scope.wins++;
      gameInProgress = false;
      forEach(function(y, index) {
        forEach(function(x, index) {
          getSpot($scope.minefield, y, x).isCovered = false;
          getSpot($scope.minefield, y, x).flag = false;
          getSpot($scope.minefield, y, x).isRevealed = true;
        });
      }); 
    }
    else if(spot.flag) {
      spot.flag = false;
      spot.isCovered = false; 
      if(spot.content == 'empty') {
        clearSpots($scope.minefield);
      }
    }
    else if(spot.content == 'empty' && !spot.flag) {
      clearSpots($scope.minefield);    
    }
  }
};

$scope.wins = 0;
$scope.losses = 0;

// function getTime() {
//   return new Date();
// }

$scope.startTimer = function() {
        if(gameInProgress == true){
          var gameTime = getTime() - 300*6000;  //this is a patch. Timer shows 30 min delay.
          $scope.timer = gameTime - startTime;
      }
    }

    $interval( function(){ $scope.startTimer(); }, 1000);

$scope.quit = function() {
  $scope.winMessage = false;
  $scope.loseMessage = false;
  $scope.init = true;
};

$scope.resetMinefield = function() {
  $scope.minefield = createMinefield();
  $scope.winMessage = false;
  $scope.loseMessage = false;
  startTime = getTime();
  gameInProgress = true;
  $scope.init = false;

};

});