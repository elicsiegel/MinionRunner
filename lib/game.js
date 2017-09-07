const Minion = require('./minion.js'); 

class Game {

  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;  
    this.minion = new Minion({ position: [10, 250] });
    
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
      this.minion.render(this.ctx); 
    }
  }

  start(difficulty) {
    this.canvas.focus();
    this.difficulty = difficulty;  
    this.draw();
  }
}

module.exports = Game;