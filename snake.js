var Snake = function () {
    this.size           = 10;
    this.headPosition_x = null;
    this.headPosition_y = null;
    this.tailPosition_x = null;
    this.tailPosition_y = null;
    this.headDirection  = "up";
    this.tailDirection  = "up";
    this.is_eating      = false;
    this.headIcon       = "@";
    this.bodyIcon       = "O";
    /**
     * [[head], [body], [body], [body], [body]]
     * [[row, col]]
     */
    this.snakeCoordinate = [];
}


Snake.prototype.newSnake = function(grid, INITIAL_ROW = 10, INITIAL_COL = 10) {
    // inital position is 10
    this.snakeGrid = grid;
    for (var i = 0; i < this.size; i++) {
        /** set the head to "O" or body to "o" */
        grid[INITIAL_ROW][INITIAL_COL] = (i == 0) ? this.headIcon : this.bodyIcon;
        this.snakeCoordinate.push([INITIAL_ROW, INITIAL_COL]);
        INITIAL_ROW += 1;
    }
    
}

Snake.prototype.move = function(direction) {
    MAX_WIDTH = this.snakeGrid[0].length-1;
    MAX_HEIGHT = this.snakeGrid.length-1;
    let [headPosition_y, headPosition_x] = this.snakeCoordinate[0];

    switch (direction) {
        case "up":
            headPosition_y -=1;
            break;
        case "down":
            headPosition_y +=1;
            break;
        case "right":
            headPosition_x +=1;
            break;
        case "left":
            headPosition_x -=1;
            break;
    }

    if (this.snakeGrid[headPosition_y][headPosition_x] == "F") {
        // eat fuire
        this.eat([headPosition_y, headPosition_x]);
        this.is_eating = true;
    } else {
        // just move
        let [tailPosition_y, tailPosition_x] = this.snakeCoordinate.pop();
        this.snakeGrid[tailPosition_y][tailPosition_x] = " ";
        this.snakeGrid[this.snakeCoordinate[0][0]][this.snakeCoordinate[0][1]] = this.bodyIcon;
        try {
            checkCollision(this.snakeCoordinate, [headPosition_y, headPosition_x]);
            this.snakeCoordinate.unshift([headPosition_y, headPosition_x]);
            this.snakeGrid[headPosition_y][headPosition_x] = this.headIcon;
        } catch (err) {
            console.log(err);
            process.exit();
        }
    }
    
    function checkCollision (snakeCoordinate, cord) {
        for (var i = 0; i < snakeCoordinate.length; i++) {
            if (cord[0] == snakeCoordinate[i][0] && cord[1] == snakeCoordinate[i][1]
                || cord[0] == 0 || cord[1] == 0
                || cord[0] == MAX_HEIGHT || cord[1] == MAX_WIDTH) {
                throw new Error("Game Over");
            }
        }

    }
}

Snake.prototype.eat = function (fuirt){
    let [headPosition_y, headPosition_x] = this.snakeCoordinate[0];
    this.snakeGrid[headPosition_y][headPosition_x] = this.bodyIcon;
    this.snakeGrid[fuirt[0]][fuirt[1]] = this.headIcon;
    this.snakeCoordinate.unshift(fuirt);
    this.size += 1;
}



module.exports = Snake;