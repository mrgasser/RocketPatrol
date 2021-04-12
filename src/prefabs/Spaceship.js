class Spaceship extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, texture, frame, pointValue) {
        super (scene, x, y, texture, frame);

        // add to existing scene
        scene.add.existing(this);
        this.points = pointsValue;   // Store pointvalue
        this.movesSpeed = 3;        // piixel per frame
    }

    update() {
        // move spaceship left
        this.x -= this.movesSpeed;

        // wrap around from left to right edge
        if (this.x <= 0 - this.width) {
            this.reset()
        }
    }

    //position reset
    reset() {
        this.x = game.config.width;
    }

}