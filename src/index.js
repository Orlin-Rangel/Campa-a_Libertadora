import { Mapa } from "./game.js";
import { Player } from "./player.js";

const config = {
  type: Phaser.AUTO,
  width: 1345,
  height: 604,
  scene: [Player, Mapa],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);