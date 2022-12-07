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
  spriteLeft: HTMLImageElement | null;
  spriteRight: HTMLImageElement | null;

  constructor(game: Game) {
    this.game = game;
    this.x = game.width;
    this.y = game.height / 2;
    this.radus = 50;
    this.direction = 0;
    this.speed = 20; // the smaller, the faster

    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;

    this.spriteLeft = document.getElementById(
      "fish-idle-left"
    ) as HTMLImageElement;
    this.spriteRight = document.getElementById(
      "fish-idle-right"
    ) as HTMLImageElement;
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
    this.direction = Math.atan2(dy, dx);
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.mouse.clicked) {
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.game.mouse.x, this.game.mouse.y);
      ctx.stroke();
    }
    // ctx.fillStyle = "red";
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radus, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction);
    if (this.spriteLeft && this.spriteRight) {
      if (this.game.mouse.x < this.x) {
        ctx.drawImage(
          this.spriteLeft,
          this.frameX * this.spriteWidth,
          this.frameY * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight,
          -60,
          -40,
          this.spriteWidth / 4,
          this.spriteHeight / 4
        );
      } else {
        ctx.drawImage(
          this.spriteRight,
          this.frameX * this.spriteWidth,
          this.frameY * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight,
          -60,
          -40,
          this.spriteWidth / 4,
          this.spriteHeight / 4
        );
      }
    }
    ctx.restore();
  }
}
