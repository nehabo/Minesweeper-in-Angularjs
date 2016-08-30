var controllers = angular.module('controllers',['directives', 'ngAnimate']);
controllers.controller('minesweeperCtrl', function($scope, $interval){

  // var MineField = require('minefieldClass.js');
  // $scope.Minefield = new MineField();
  
  $scope.levels = [
      {name:'Easy', size: 5, totalMines: 6},
      {name:'Medium', size: 9, totalMines: 10},
      {name:'Hard', size: 14, totalMines: 22},
    ];

  $scope.difficulty = $scope.levels[0];    
  
  function createMinefield() {
    var d = $scope.difficulty.size;
    var minefield = {};
    minefield.rows = [];

    for(var i = 0; i < d; i++) {
      var row = {};
      row.spots = [];
                                      
      for(var j = 0; j < d; j++) {
        var spot = {};
        spot.isCovered = true;
        spot.content = 'empty'   
        spot.flag = false;
        spot.reveal = false;
        spot.mineBlast = false;
        spot.wrongFlag = false;
        row.spots.push(spot);
      }
      
      minefield.rows.push(row);
    }

    placeMines(minefield);
    calculateAllNumbers(minefield);

    return minefield;
  }

  function getSpot(minefield, row, column) {
    return minefield.rows[row].spots[column];
  }

  function placeMines(minefield) {
    var d = $scope.difficulty.size;
    var m = $scope.difficulty.totalMines;
    for(var i = 0; i < m; i++) {
      while(true){
        var row = Math.round(Math.random() * (d-1));
        var column = Math.round(Math.random() * (d-1));
        var spot = getSpot(minefield, row, column);
        if (spot.content == "empty"){
          break;
        }
      }
      spot.content = "mine";
    }
  }

  function calculateNumber(minefield, row, column) {
    var d = $scope.difficulty.size;
    var thisSpot = getSpot(minefield, row, column);

    if(thisSpot.content == "mine") {
      return;
    }

    var mineCount = 0;

    if(row > 0) {
      if(column > 0) {
        // top left spot
        var spot = getSpot(minefield, row - 1, column - 1);
        if(spot.content == "mine") {
          mineCount++;
        }
      }
      // top center spot
      var spot = getSpot(minefield, row - 1, column);
      if(spot.content == "mine") {
        mineCount++;
      }   
      if(column < (d-1)) {
        // top right spot
        var spot = getSpot(minefield, row - 1, column + 1);
        if(spot.content == "mine") {
          mineCount++;
        }
      }
    }
    if(column > 0) {
      // left spot
      var spot = getSpot(minefield, row, column - 1);
      if(spot.content == "mine") {
        mineCount++;
      }
    }
    if(column < (d-1)) {
    // right spot
      var spot = getSpot(minefield, row, column + 1);
      if(spot.content == "mine") {
        mineCount++;
      }
    }
    if(row < (d-1)) {
      if(column > 0) {
      // bottom left spot
        var spot = getSpot(minefield, row + 1, column - 1);
        if(spot.content == "mine") {
          mineCount++;
        }
      }
      // bottom center spot  
      var spot = getSpot(minefield, row + 1, column);
      if(spot.content == "mine") {
          mineCount++;
        }
        if(column < (d-1)) {
          // bottom right
          var spot = getSpot(minefield, row + 1, column + 1);
          if(spot.content == "mine") {
            mineCount++;
          }
        }
      }

    if(mineCount > 0) {
      thisSpot.content = mineCount;
    }
  }

  function calculateAllNumbers(minefield) {
    var d = $scope.difficulty.size;
    for(var y = 0; y < d; y++) {
      for(var x = 0; x < d; x++) {
        calculateNumber(minefield, x, y);
      }
    }
  }

  function clearSpots(minefield) {
    var d = $scope.difficulty.size;
    for(var row = 0; row < d; row++) {
      for(var column = 0; column < d; column++) {
        var spot = getSpot(minefield, row, column);
        if(!spot.isCovered && spot.content == 'empty') {
          if(row>0){
            if(column>0){
             getSpot(minefield, row - 1, column - 1).isCovered = false;
            }
            getSpot(minefield, row - 1, column).isCovered = false;
            if(column<(d-1)){
              getSpot(minefield, row -1, column + 1).isCovered = false;
            }
          }
          if(column>0){
            getSpot(minefield, row, column - 1).isCovered = false;
          }
          if(column<(d-1)){
            getSpot(minefield, row, column + 1).isCovered = false;
          }
          if(row<(d-1)){
            if(column>0){
              getSpot(minefield, row + 1, column - 1).isCovered = false;
            }
            getSpot(minefield, row + 1, column).isCovered = false;
            if(column<(d-1)){
              getSpot(minefield, row + 1, column + 1).isCovered = false;
            }
          }
        }
      }
    }
  }

  function hasWon(minefield) {
    var d = $scope.difficulty.size;
    for(var y = 0; y < d; y++) {
      for(var x = 0; x < d; x++) {
        var spot = getSpot(minefield, y, x);
        if(spot.isCovered && spot.content != "mine") {
          return false;
        }
      } 
    }  
    return true;
  }

  function winMsg(spot) {
    var d = $scope.difficulty.size;
    $scope.winMessage = true;
    $scope.wins++;
    gameInProgress = false;
      for(var y = 0; y < d; y++) {
        for(var x = 0; x < d; x++) {
          getSpot($scope.minefield, y, x).isCovered = false;
          getSpot($scope.minefield, y, x).flag = false;
          getSpot($scope.minefield, y, x).reveal = true;
        }
      }
  }

  function hasLost(spot) {
    var d = $scope.difficulty.size;
    gameInProgress = false;
      $scope.loseMessage = true;
      $scope.losses++;
      for(var y = 0; y < d; y++) {
        for(var x = 0; x < d; x++) {
          getSpot($scope.minefield, y, x).isCovered = false;
          getSpot($scope.minefield, y, x).reveal = true;
          getSpot($scope.minefield, y, x).wrongFlag = true;
          getSpot($scope.minefield, y, x).mineBlast = true;
        } 
      }
    }

  var gameInProgress = false;
  var startTime;
  $scope.init = true;

  $scope.startGame = function() {
    $scope.minefield = createMinefield($scope.size);
    gameInProgress = true;
    startTime = getTime();
    $scope.init = false;

  }

  $scope.flagSpot = function(spot) {
    if (spot.isCovered) {
      spot.flag = true;
    }
  };

  $scope.uncoverSpot = function(spot) {
    if (spot.isCovered) {
      spot.isCovered = false;
      if(spot.content == 'mine') {
        hasLost($scope.spot);
      } 
      else if(hasWon($scope.minefield)) {
        winMsg($scope.spot);
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

  function getTime() {
    return new Date();
  }

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