const Minion = require('./minion.js'); 
const Obstacle = require('./obstacle.js'); 

class Game {

  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;  
    
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
        case 82:
          if (this.gameOver === true) {
            this.resetGame();
          }
          break;
        case 80:
          this.togglePause();
          break;
        default:
          console.log(e.keyCode);
      }
    });
  }

  resetGame() {
    this.start(this.difficulty);
  }

  togglePause() {
    if (this.paused === false) {
      this.paused = true;
    } else {
      this.paused = false;
      this.draw();
    } 
  }

  activateJump() {
    this.minion.jumping = true; 
  }

  draw() {
    if (!this.gameOver && !this.paused) {
      requestAnimationFrame(this.draw);
      this.ctx.clearRect(0, 0, 800, 300);
      this.minion.render(this.ctx); 
      this.obstacle.render(this.ctx);
      this.flyingObstacle.render(this.ctx);

      if (this.minion.isCollidedWith(this.obstacle)) {
        this.gameOver = true; 
        console.log("OVER");
      }
      
      if (this.minion.isCollidedWith(this.flyingObstacle)) {
        this.gameOver = true; 
      }

    }
  }

  generatePieces(difficulty) {
    this.minion = new Minion({ position: [10, 250] });

    this.obstacle = new Obstacle({position: [725, 200], resetPosition: 1000, velocity: 4, width: 125, height: 100, src: './assets/skyscraper.png' });

    this.flyingObstacle = new Obstacle( { position: [2000, 100], resetPosition: 2000, velocity: 3, width: 50, height: 40, src: './assets/airplane.png'} ); 
  }

  start(difficulty) {
    this.canvas.focus();
    this.difficulty = difficulty; 
    this.paused = false; 
    this.gameOver = false; 
    this.generatePieces(difficulty); 
    this.draw();
  }
}

module.exports = Game;