export class Player extends Phaser.Scene {
    constructor() {
        super({ key: "Player" });

        this.velocity = 200; 
    }

    preload() {
        this.load.image("personaje", "./Personaje.png"); 
    }

    create() {
        this.scene.launch('Mapa');
        this.scene.bringToTop('Player'); 

        this.personaje = this.add
            .sprite(200, 200, "personaje")
            .setScale(0.3, 0.3)
            .setInteractive();
    }

    update(time, delta) {

        //MOVIMIENTO DEL PERSONAJE. 
        let dx = 0, dy = 0;
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
            dx -= 1;
        }
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
            dx += 1;
        }
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
            dy -= 1;
        }
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
            dy += 1;
        }

        if (dx !== 0 || dy !== 0) {
            const distance = Math.sqrt(dx * dx + dy * dy);
            const normalizedX = dx / distance;
            const normalizedY = dy / distance;
            this.personaje.x += normalizedX * this.velocity * delta  / 1000;
            this.personaje.y += normalizedY * this.velocity * delta / 1000;
            const angle = Phaser.Math.Angle.Between(0, 0, normalizedX, normalizedY);
            this.personaje.angle = angle * 180 / Math.PI;
        }
    }
}
