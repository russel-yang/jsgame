import { createContext } from "vm";
import { Game } from "./game";

export class Bubble {
  game: Game;
  x: number;
  y: number;
  radius: number;
  speed: number;
  distance: number;

  constructor(game: Game) {
    this.game = game;
    this.x = Math.random() * this.game.width;
    this.y = this.game.height;
    this.radius = 20;
    this.speed = Math.random() * 5 + 1;
    this.distance = 0;
  }

  update() {
    this.y -= this.speed;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}
