import { createContext } from "vm";
import { Game } from "./game";

export class Bubble {
  game: Game;
  x: number;
  y: number;
  radius: number;
  speed: number;
  distance: number;
  counted: boolean;
  sound?: number;
  sprite: HTMLImageElement | null;

  constructor(game: Game) {
    this.game = game;
    this.radius = 20;
    this.x = Math.random() * this.game.width - 2 * this.radius;
    this.y = this.game.height;
    this.speed = Math.random() * 5 + 1;
    this.distance = 0;
    this.counted = false;
    if (this.game.assets.bubble) {
      this.sound = Math.floor(
        Math.random() * this.game.assets.bubble?.sounds.length
      );
    }
    this.sprite = document.getElementById("bubble-pop") as HTMLImageElement;
  }

  update() {
    this.y -= this.speed;
    const dx = this.x - this.game.player.x;
    const dy = this.y - this.game.player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw(ctx: CanvasRenderingContext2D) {
    // ctx.fillStyle = "blue";
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.closePath();
    // ctx.stroke();
    if (this.sprite) {
      ctx.drawImage(
        this.sprite,
        0,
        0,
        512,
        512,
        this.x - 30,
        this.y - 30,
        this.radius * 3,
        this.radius * 3
      );
    }
  }
}
