class MineField {

  constructor () {
    this.grid = {
      rows: []
    }
  }
  create() {
    for(var i = 0; i < 9; i++) {
      var row = {};
      row.spots = [];

      for(var j = 0; j < 9; j++) {
        var spot = {};
        spot.isCovered = true;
        spot.content = 'empty'
        spot.flag = false;
        spot.reveal = false;
        spot.mineBlast = false;
        spot.wrongFlag = false;
        row.spots.push(spot);
      }

      this.grid.rows.push(row);
    }
    this.placeMines();
    this.calculateAllNumbers();
  }

  getSpot(row, column) {
    return this.grid.rows[row].spots[column];
  }

  placeMines() {
    for(var i = 0; i < 10; i++) {
      while(true){
        var row = Math.round(Math.random() * 8);
        var column = Math.round(Math.random() * 8);
        var spot = getSpot(row, column);
        if (spot.content == "empty"){
          break;
        }
      }
      spot.content = "mine";
    }
  }

  calculateNumber(row, column) {
    var thisSpot = getSpot(row, column);

    if(thisSpot.content == "mine") {
      return;
    }
   var mineCount = 0;

    if(row > 0) {
        if(column > 0) {
            // top left spot
            var spot = getSpot(row - 1, column - 1);
            if(spot.content == "mine") {
              mineCount++;
            }
          }
        // top center spot
        var spot = getSpot(row - 1, column);
        if(spot.content == "mine") {
          mineCount++;
        }
        if(column < 8) {
            // top right spot
            var spot = getSpot(row - 1, column + 1);
            if(spot.content == "mine") {
              mineCount++;
            }
          }
        }
    if(column > 0) {
        // left spot
        var spot = getSpot(row, column - 1);
        if(spot.content == "mine") {
          mineCount++;
        }
      }
    if(column < 8) {
        // right spot
        var spot = getSpot(row, column + 1);
        if(spot.content == "mine") {
          mineCount++;
        }
      }
    if(row < 8) {
        if(column > 0) {
            // bottom left spot
            var spot = getSpot(row + 1, column - 1);
            if(spot.content == "mine") {
              mineCount++;
            }
          }
        // bottom center spot
        var spot = getSpot(row + 1, column);
        if(spot.content == "mine") {
          mineCount++;
        }
        if(column < 8) {
            // bottom right
            var spot = getSpot(row + 1, column + 1);
            if(spot.content == "mine") {
              mineCount++;
            }
          }
        }

        if(mineCount > 0) {
          thisSpot.content = mineCount;
        }
    }
  
  clearSpots() {
    for(var row = 0; row < 9; row++) {
      for(var column = 0; column < 9; column++) {
        var spot = getSpot(minefield, row, column);
        if(!spot.isCovered && spot.content == 'empty') {
          if(row>0){
            if(column>0){
             getSpot(minefield, row - 1, column - 1).isCovered = false;
           }
           getSpot(minefield, row - 1, column).isCovered = false;
           if(column<8){
            getSpot(minefield, row -1, column + 1).isCovered = false;
          }
        }
          if(column>0){
            getSpot(minefield, row, column - 1).isCovered = false;
          }
          if(column<8){
            getSpot(minefield, row, column + 1).isCovered = false;
          }
          if(row<8){
            if(column>0){
              getSpot(minefield, row + 1, column - 1).isCovered = false;
            }
            getSpot(minefield, row + 1, column).isCovered = false;
            if(column<8){
              getSpot(minefield, row + 1, column + 1).isCovered = false;
            }
          }
        }
      }
    }
  }

  hasWon() {
    for(var y = 0; y < 9; y++) {
      for(var x = 0; x < 9; x++) {
        var spot = getSpot(y, x);
        if(spot.isCovered && spot.content != "mine") {
          return false;
        }
      } 
    }  
    return true;
  }

   
}




// use
var mineField = new MineField();
// use grid from
mineField.grid
