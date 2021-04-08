//Rocket (Player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;          // track rocket firing status
        this.moveSpeed = 2;             //rocket movement speed
    }

    update() {
        // left and right movement
        if (!this.isFiring) {
            if(keyLEFT.isDown && this.x >= boarderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - boarderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
    }
}