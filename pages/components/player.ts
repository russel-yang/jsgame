import { Game } from "./game";

export class Player {
  game: Game;
  x: number;
  y: number;
  radus: number;
  direction: number;
  speed: number;

  frame: number;
  frameX: number;
  frameY: number;
  spriteWidth: number;
  spriteHeight: number;

  constructor(game: Game) {
    this.game = game;
    this.x = game.width;
    this.y = game.height / 2;
    this.radus = 20;
    this.direction = 0;
    this.speed = 10; // the smaller, the faster

    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;

    this.spriteWidth = 498;
    this.spriteHeight = 327;
  }
  update() {
    const dx = this.x - this.game.mouse.x;
    const dy = this.y - this.game.mouse.y;

    if (this.x !== this.game.mouse.x) {
      this.x -= dx / this.speed;
    }
    if (this.y !== this.game.mouse.y) {
      this.y -= dy / this.speed;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.mouse.clicked) {
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.game.mouse.x, this.game.mouse.y);
      ctx.stroke();
    }
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radus, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
