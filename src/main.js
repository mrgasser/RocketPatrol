// Game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let boarderUISize = game.config.height / 15;
let boarderPadding = boarderUISize / 3;
let starSpeed = 4;

// reserver keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT;