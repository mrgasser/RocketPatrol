//Rocket (Player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;          // track rocket firing status
        this.moveSpeed = 2;             //rocket movement speed
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
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

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); //play sfx
        }
        // if fired move the rockey up
        if (this.isFiring && this.y >= boarderUISize * 3 + boarderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on a miss
        if (this.y <= boarderUISize * 3 + boarderPadding) {
            this.reset();
        }
    }

    // Reset rocket to ground
    reset() {
        this.isFiring = false;
        this.y = game.config.height - boarderUISize - boarderPadding;
    }
}