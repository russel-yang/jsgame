import { Player } from "./player";

export interface Mouse {
  x: number;
  y: number;
  clicked: boolean;
}

export class Game {
  canvas: HTMLCanvasElement;
  height: number;
  width: number;
  ctx: CanvasRenderingContext2D | null;
  mouse: Mouse;
  player: Player;

  constructor(canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    canvas.height = 500;
    canvas.width = 800;
    this.canvas = canvas;
    this.height = canvas.height;
    this.width = canvas.width;
    this.ctx = canvas.getContext("2d");
    this.mouse = {
      x: this.width / 2,
      y: this.height / 2,
      clicked: false,
    };

    this.canvas.addEventListener("mousedown", (e: MouseEvent) => {
      this.mouse.x = e.x - rect.left;
      this.mouse.y = e.y - rect.top;
      this.mouse.clicked = true;
    });

    this.canvas.addEventListener("mouseup", (e: MouseEvent) => {
      this.mouse.clicked = false;
    });

    this.player = new Player(this);
  }

  update() {
    this.player.update();
  }

  draw() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.player.draw(this.ctx);
    }
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}
