import { Game } from "./game";

export class Backdrop {
  sprite: HTMLImageElement | null;
  game: Game;
  x1: number;
  x2: number;
  y: number;
  width: number;
  height: number;

  constructor(game: Game) {
    this.game = game;
    this.sprite = document.getElementById("backdrop") as HTMLImageElement;
    this.x1 = 0;
    this.x2 = this.game.width;
    this.y = 0;
    this.width = this.game.width;
    this.height = this.game.height;
  }
  update() {
    this.x1 -= this.game.speed;
    if (this.x1 < -this.width) {
      this.x1 = this.width;
    }
    this.x2 -= this.game.speed;
    if (this.x2 < -this.width) {
      this.x2 = this.width;
    }
  }
  draw() {
    const { ctx } = this.game;
    if (ctx && this.sprite) {
      ctx.drawImage(this.sprite, this.x1, this.y, this.width, this.height);
      ctx.drawImage(this.sprite, this.x2, this.y, this.width, this.height);
    }
  }
}
