var Utils = function () {

}

Utils.prototype.clear = function () {
    // 1. Print empty lines until the screen is blank.
    process.stdout.write('\033[2J');
    // 2. Clear the scrollback.
    // process.stdout.write('\u001b[H\u001b[2J\u001b[3J');
}

Utils.prototype.message = function () {
    console.log("Hello world");
}

Utils.prototype.random = function (grid) {
    var row = Math.floor(Math.random() * Math.floor(grid.length-1));
    var col = Math.floor(Math.random() * Math.floor(grid[0].length-1));
    if (row == 0 || col == 0 || grid[row][col] != " " ) {
        return this.random(grid);
    }
    return [row, col];
}

module.exports = Utils;