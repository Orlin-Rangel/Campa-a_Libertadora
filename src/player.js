export class Player extends Phaser.Scene {
    constructor() {
        super({ key: "Player" });

        this.selected = false;
        this.startPos = { x: 0, y: 0 };
    }

    preload() {
        this.load.image("personaje", "./Personaje.png");
        this.cameras.main.setBackgroundColor("rgb(100, 20, 02, 0.1)");

    }

    create() {

        this.scene.launch('Mapa'); // Se agrega la escena Player
        this.scene.bringToTop('Player'); // Se trae la escena Escena1 al frente
        
        this.personaje = this.add
            .sprite(200, 200, "personaje")
            .setScale(0.3, 0.3)
            .setInteractive();

        // Seleccionar al personaje
        this.personaje.on("pointerdown", () => {
            this.selected = true;
            this.startPos.x = this.personaje.x;
            this.startPos.y = this.personaje.y;
            this.personaje.setTint(0x00ff00);
        });

        // Mover y rotar al personaje
        this.input.on("pointerdown", (pointer) => {
            if (this.selected) {
                const velocidad = 200; // 100 px/s
                const dx = pointer.x - this.personaje.x;
                const dy = pointer.y - this.personaje.y;
                const distancia = Math.sqrt(dx * dx + dy * dy);
                const duracion = distancia / velocidad * 1000;
                console.log(duracion);

                if (distancia > 50 && duracion) {
                    const angle = Phaser.Math.Angle.BetweenPoints(this.personaje, pointer) * 180 / Math.PI;
                    const rotateTween = this.tweens.add({
                        targets: this.personaje,
                        angle: angle,
                        ease: "Linear",
                        duration: distancia / velocidad * 80,
                    });

                    const moveTween = this.tweens.add({
                        targets: this.personaje,
                        x: pointer.x,
                        y: pointer.y,
                        ease: "Linear",
                        duration: duracion,
                        onComplete: () => {
                            this.selected = false;
                            this.personaje.setTint(0xffffff);
                            this.input.setDefaultCursor("default");
                        },
                    });

                    // Transición a la posición original después de la rotación
                    rotateTween.onComplete = () => {
                        this.tweens.add({
                            targets: this.personaje,
                            x: pointer.x,
                            y: pointer.y,
                            ease: "Linear",
                            duration: duracion,
                            onComplete: () => {
                                this.selected = false;
                                this.personaje.setTint(0xffffff);
                                this.input.setDefaultCursor("default");
                            },
                        });
                    }
                }
            }
        });
    }
}