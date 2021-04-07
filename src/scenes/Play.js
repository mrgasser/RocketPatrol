class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
    }

    create() {
        //place starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 
        'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, boarderUISize + boarderPadding, game.config.width, 
        boarderUISize * 2, 0x00FF00).setOrigin(0, 0);
        //white boards
        //top rectangle
        this.add.rectangle(0, 0, game.config.width, boarderUISize, 0xFFFFFF).setOrigin
        (0, 0);
        //bottom rectangle
        this.add.rectangle(0, game.config.height - boarderUISize, game.config.width,
        boarderUISize, 0xFFFFFF).setOrigin(0, 0);
        // Left rectangle
        this.add.rectangle(0, 0, boarderUISize, game.config.height, 0xFFFFFF).setOrigin
        (0, 0);
        // right rectangle
        this.add.rectangle(game.config.width - boarderUISize, 0, boarderUISize, 
        game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width / 2,
        game.config.height - boarderUISize - boarderPadding, 'rocket').setOrigin(0.5, 0);
    }

    update() {
        this.starfield.tilePositionX -= starSpeed;
    }
}