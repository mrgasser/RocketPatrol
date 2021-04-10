class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
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

        // add the spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + boarderUISize * 6,
            boarderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + boarderUISize * 3,
            boarderUISize * 5 + boarderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 
            boarderUISize * 6 + boarderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);


        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // configure animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion',{
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });
    }

    update() {
        this.starfield.tilePositionX -= starSpeed;

        // update rocket
        this.p1Rocket.update();

        // update spaceships
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        //check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB chekcing
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }

    }

    shipExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0;
        // create explosion at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
    }
}