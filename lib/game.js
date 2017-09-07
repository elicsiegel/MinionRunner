const Minion = require('./minion.js');

class Game {

  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;  
    this.minion = new Minion({ position: [10, 250], ctx: ctx });
    this.gamePlaying = false;
    this.gameOver = false; 
    this.draw = this.draw.bind(this);
    this.setKeyboardListeners();
  }

  setKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 32: 
          console.log("Jump");
          this.jump(); 
          break;
      }
    });
  }

  jump() {
    this.minion.jumping = true; 
  }

  draw() {
    if (!this.gameOver) {
      requestAnimationFrame(this.draw);
      this.minion.move(this.ctx);  
    }
  }

  start(difficulty) {
    this.gamePlaying = true;
    this.difficulty = difficulty;  
    this.draw();
  }
}

module.exports = Game;