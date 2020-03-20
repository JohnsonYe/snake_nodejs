const Grid  = require("./grid");
const Utils = require("./utils");
const Snake = require("./snake");
var keypress = require('keypress');
keypress(process.stdin);


function game() {
    var grid = new Grid();
    var snake = new Snake();
    var utils = new Utils();
    var score = 0;
    /** this follow action is pass the grid by reference */
    playground = grid.constructGrid();
    snake.newSnake(playground);
    grid.setFood();
    grid.displayGrid();
    /** game interval */
    var gameInterval = setInterval(function() {
        snake.move(snake.headDirection);
        if (snake.is_eating) {
            score += 100;
            grid.setFood();
            snake.is_eating = false;
        }
        console.log("score:",score);
        grid.displayGrid();
    },200);

    /** key board control */
    process.stdin.on('keypress', function (ch, key) {
        switch (key.name) {
            case "up":
            case "w":
                if (snake.headDirection == "down") {
                    return;
                }
                snake.headDirection = "up";
                break;
            case "down":
            case "s":
                if (snake.headDirection == "up") {
                    return;
                }
                snake.headDirection = "down";
                break;
            case "left":
            case "a":
                if (snake.headDirection == "right") {
                    return;
                }
                snake.headDirection = "left";
                break;
            case "right":
            case "d":
                if (snake.headDirection == "left") {
                    return;
                }
                snake.headDirection = "right";
                break;
            default:
                if (key && key.ctrl && key.name == 'c' || key.name == "escape") {
                    console.log("pause")
                    process.stdin.pause();
                    clearInterval(gameInterval);
                    return;
                }
        }
    });

    
}

game();



process.stdin.setRawMode(true);