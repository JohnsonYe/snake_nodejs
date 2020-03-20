const Utils = require("./utils");
var Grid = function (width = 50, height = 30) {
    this.width  = width;
    this.height = height;
    this.grid   = null;
}

Grid.prototype.constructGrid = function() {
    var grid = [];
    var columns = new Array(this.width);
    for (var i = 0; i < this.height; i++) {
        grid.push(JSON.parse(JSON.stringify(columns)));
    }
    for (var row = 0; row < this.height; row++) {
        for (var col = 0; col < this.width; col++) {
            grid[row][col] = (col == 0 || col == this.width-1 || row == 0 || row == this.height-1) ? "#" : " ";
        }
    }
    this.grid = grid;
    return grid;
}

Grid.prototype.displayGrid = function (grid = this.grid ? this.grid : this.constructGrid()) {
    for (var row = 0; row < this.height; row++) {
        var line = "";
        for (var col = 0; col < this.width; col++) {
            line += grid[row][col];
        }
        console.log(line);
    }
}

Grid.prototype.setFood = function () {
    var utils = new Utils();
    var foodCoor = utils.random(this.grid);
    this.grid[foodCoor[0]][foodCoor[1]] = "F";
    
}

module.exports = Grid;