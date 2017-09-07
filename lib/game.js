const Minion = require('./minion.js'); 
const Obstacle = require('./obstacle.js'); 

class Game {

  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;  
    this.minion = new Minion({ position: [10, 250] });
    this.obstacle = new Obstacle({position: [725, 250], velocity: 3, width: 125, height: 80 });

    this.gameOver = false; 
    this.draw = this.draw.bind(this);
    this.setKeyboardListeners();
  }

  setKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 32: 
          console.log("Jump");
          this.activateJump(); 
          break;
      }
    });
  }

  activateJump() {
    this.minion.jumping = true; 
  }

  draw() {
    if (!this.gameOver) {
      requestAnimationFrame(this.draw);
      this.ctx.clearRect(0, 0, 800, 300);
      this.minion.render(this.ctx); 
      this.obstacle.render(this.ctx);
      this.minion.isCollidedWith(this.obstacle);
    }
  }

  start(difficulty) {
    this.canvas.focus();
    this.difficulty = difficulty;  
    this.draw();
  }
}

module.exports = Game;