var keypress = require('keypress');
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        "up":
            
            break;
        "down":
            break;
        "left":
            break;
        "right":
            break;
        default:
            if (key && key.ctrl && key.name == 'c' || key.name == "escape") {
                process.stdin.pause();
            }
    }
    
});

process.stdin.setRawMode(true);