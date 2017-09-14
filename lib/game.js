const Minion = require('./minion.js'); 
const Obstacle = require('./obstacle.js');
const Menu = require('./menu.js'); 

class Game {

  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;  
    
    this.gameOver = false; 
    this.draw = this.draw.bind(this);
    this.setKeyboardListeners();
    this.setEventListeners();
    this.muted = false; 
    this.jumpSound = new Audio('./assets/audio/jump1.m4a');
    this.gameOverSound = new Audio('./assets/audio/game_over.mp3');
    this.prevHighScore = 0;
  }

  setKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 32: 
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

  setEventListeners() {
    this.canvas.addEventListener('click', (e) => this.mute(e));
  }

  mute(e) {
    if (this.muted === false) {
      this.muted = true;
    } else {
      this.muted = false; 
    }
    console.log(this.muted);
  }

  resetGame() {
    if (this.menu.highScore > this.prevHighScore) {
      this.prevHighScore = this.menu.highScore; 
    }
    this.start(this.difficulty);
  }

  togglePause() {
    if (this.paused === false) {
      this.canvas.classList.add('paused'); 
      this.paused = true;
    } else {
      this.canvas.classList.remove('paused'); 
      this.paused = false;
      this.draw();
    } 
  }

  activateJump() {
    if (!this.muted) {
      this.jumpSound.play();
    }

    this.minion.jumping = true; 
    this.minion.imageCount = 0;
  }

  draw() {
    if (!this.gameOver && !this.paused) {
      this.ctx.clearRect(0, 0, 800, 300);
      requestAnimationFrame(this.draw);
      this.menu.render(this.ctx);
      this.minion.update();
      this.minion.render(this.ctx); 
      this.obstacle.render(this.ctx);
      this.obstacle2.render(this.ctx);

      if (this.minion.isCollidedWith(this.obstacle2)) {
        this.gameOver = true; 
        this.finalFrame = true;
      }

      if (this.difficulty === "medium-start" || this.difficulty === "hard-start")  {
        this.flyingObstacle.render(this.ctx);

        if (this.minion.isCollidedWith(this.flyingObstacle)) {
          this.gameOver = true; 
          this.finalFrame = true;
        }
      }

      if (this.minion.isCollidedWith(this.obstacle)) {
        this.gameOver = true; 
        this.finalFrame = true;
        console.log("OVER");
      }
      
    }
    if (this.finalFrame) {
      this.ctx.clearRect(0, 0, 800, 300);
      requestAnimationFrame(this.draw);
      this.menu.render(this.ctx);
      this.minion.image.src = './assets/surprised_minion.png'; 

      setTimeout(() => this.minion.render(this.ctx), 10);
      this.obstacle.render(this.ctx);
      this.obstacle2.render(this.ctx);
    }

    if (this.gameOver) {
      this.finalFrame = false;
      this.canvas.classList.add('paused');

      if (!this.muted) {
        this.gameOverSound.play();
      }
      this.menu.drawGameOverText(this.ctx);
    }
  }

  generateMenu() {
    this.menu = new Menu(this);
  }

  setDifficulty() {
    const defaultValues = {
      skyscraperVelocity: 4,
      airplaneVelocity: 4,
      skyscraperImage: './assets/skyscraper.png',
      skyscraperWidth: 80,
      skyscraper2Image: './assets/fat-tall-sky.png',
    }

    switch (this.difficulty) {
      case "easy-start": 
        return Object.assign({}, defaultValues);
        break;

      case "medium-start":
        let mediumValues = {
          skyscraperVelocity: 4,
          airplaneVelocity: 8,
        }

        return Object.assign({}, defaultValues, mediumValues);
        break;
      case "hard-start":
        let hardValues = {
          skyscraperVelocity: 5,
          airplaneVelocity: 10,
        }
        return Object.assign({}, defaultValues, hardValues);
        break;
    }
  }

  generatePieces() {
    const defaultValues = {
      skyscraperVelocity: 4,
      airplaneVelocity: 2
    }

    let gameValues = this.setDifficulty();

    this.minion = new Minion({ position: [10, 250] });

    this.obstacle = new Obstacle({position: [725, 200], resetPosition: 1000, velocity: gameValues.skyscraperVelocity, width: gameValues.skyscraperWidth, height: 100, src: gameValues.skyscraperImage });
    this.obstacle2 = new Obstacle({position: [1200, 200], resetPosition: 1000, velocity: gameValues.skyscraperVelocity, width: gameValues.skyscraperWidth, height: 100, src: gameValues.skyscraper2Image });

    if (this.difficulty === "medium-start" || this.difficulty === "hard-start") {

      this.flyingObstacle = new Obstacle( { position: [2000, 60], resetPosition: 2000, velocity: gameValues.airplaneVelocity, width: 50, height: 40, src: './assets/airplane.png'} );  
    }
  }

  start(difficulty) {
    this.canvas.classList.remove('paused');
    console.log(this.prevHighScore);
    this.canvas.focus();
    this.difficulty = difficulty; 
    this.paused = false; 
    this.gameOver = false; 
    this.generateMenu(this); 
    this.generatePieces();
    this.draw();
  }
}

module.exports = Game;