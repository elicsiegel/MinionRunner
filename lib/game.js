const Minion = require('./minion.js');

class Game {

  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;  
    this.minion = new Minion({ position: [50, 250], ctx: ctx });

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
    this.minion.move(this.ctx);
  }

  draw() {
    this.minion.draw(this.ctx); 
  }
}

module.exports = Game;