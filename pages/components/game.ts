import { Bubble } from "./bubble";
import { Player } from "./player";

export interface Mouse {
  x: number;
  y: number;
  clicked: boolean;
}

export interface gameAssets {
  bubble?: {
    sounds: HTMLAudioElement[];
    sprite?: HTMLImageElement;
  };
  player?: {
    sprite?: HTMLImageElement;
  };
}

export class Game {
  canvas: HTMLCanvasElement;
  height: number;
  width: number;
  ctx: CanvasRenderingContext2D | null;
  mouse: Mouse;
  player: Player;
  bubbles: Bubble[];
  frame: number;
  score: number;
  assets: gameAssets;

  constructor(canvas: HTMLCanvasElement, assets: gameAssets) {
    const rect = canvas.getBoundingClientRect();
    canvas.height = 500;
    canvas.width = 800;
    this.canvas = canvas;
    this.height = canvas.height;
    this.width = canvas.width;
    this.ctx = canvas.getContext("2d");
    this.assets = assets;
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

    this.frame = 0;
    this.player = new Player(this);
    this.score = 0;

    this.bubbles = [];
  }

  update() {
    this.player.update();
    if (this.frame % 50 === 0) {
      this.bubbles.push(new Bubble(this));
    }
    this.bubbles = this.bubbles.filter((bubble) => bubble.x > 0);
    this.bubbles.forEach((bubble, index) => {
      bubble.update();
      if (bubble.distance < bubble.radius + this.player.radus) {
        if (!bubble.counted) {
          this.score++;
          if (bubble.sound !== undefined) {
            this.assets.bubble?.sounds[bubble.sound].play();
          }
          this.bubbles.splice(index, 1);
          bubble.counted = true;
        }
      }
    });
  }

  draw() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.player.draw(this.ctx);
      this.bubbles.forEach((bubble) => bubble.draw(this.ctx));
      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = "black";
      this.ctx.fillText(`score: ${this.score}`, 10, 30);
    }
  }

  loop() {
    this.frame++;
    this.draw();
    this.update();
    requestAnimationFrame(() => this.loop());
  }
}
