/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  
  var config = {
        apiKey: "AIzaSyBkc22wgBkJD-I-jOz20CbzBDLNm25mqnw",
        authDomain: "minionrunner-c5d40.firebaseapp.com",
        databaseURL: "https://minionrunner-c5d40.firebaseio.com",
        projectId: "minionrunner-c5d40",
        storageBucket: "",
        messagingSenderId: "522343975744"
      };

  firebase.initializeApp(config);
  const database = firebase.database();

  const game = new Game(ctx, canvas, database);

  const menu_start_buttons = document.querySelector('.menu-buttons');


  menu_start_buttons.addEventListener('click', (e) => {
    const gameArea = document.querySelector(".game-area");
    const menu = document.querySelector(".menu");

    gameArea.classList.remove('hide'); 
    menu.classList.add('hide');
    setTimeout(() => game.start(e.target.id), 200);
  });

});

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

const Minion = __webpack_require__(2); 
const Obstacle = __webpack_require__(3);
const Menu = __webpack_require__(4); 
const Database = __webpack_require__(112);

class Game {

  constructor(ctx, canvas, database) {
    this.ctx = ctx;
    this.canvas = canvas;  
    this.database = database;

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

  manageGameOver() {
    this.gameOver = true; 
    this.finalFrame = true;
    console.log(this.globalLeaderScores);
    this.setHighScores();
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
        this.manageGameOver();
      }

      if (this.difficulty === "medium-start" || this.difficulty === "hard-start")  {
        this.flyingObstacle.render(this.ctx);

        if (this.minion.isCollidedWith(this.flyingObstacle)) {
          this.manageGameOver();
        }
      }

      if (this.minion.isCollidedWith(this.obstacle)) {
        this.manageGameOver();
      }
      
    }
    if (this.finalFrame) {
      this.ctx.clearRect(0, 0, 800, 300);
      requestAnimationFrame(this.draw);
      this.menu.render(this.ctx);
      this.minion.image.src = './assets/surprised_minion.png'; 

      setTimeout(() => this.minion.render(this.ctx), 20);
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

  getHighScores() {
    Database.fetchHighScores(this.database, this);
  }

  setHighScores() {
    Database.setHighScores(this.database, this)
  }

  start(difficulty) {
    this.canvas.classList.remove('paused');

    console.log(this.prevHighScore);
    this.getHighScores();

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

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

const Database = {

    fetchHighScores(database, game) {
      database.ref(`scores/`).on('value', (snapshot) => {
        game.globalLeaderScores = snapshot.val();
        game.globalHighScore = game.globalLeaderScores.highscore
      })
    },

    setHighScores(database, game) {
      if (game.menu.score > game.globalLeaderScores.highscore) {
        database.ref(`scores/highscore`).set(game.menu.score);
      } else if (game.menu.score > game.globalLeaderScores.highscore2) {
        database.ref(`scores/highscore2`).set(game.menu.score);
      } else if (game.menu.score > game.globalLeaderScores.highscore3) {
        database.ref(`scores/highscore3`).set(game.menu.score);
      }
    }
    
}


module.exports = Database;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {


class Minion {

  constructor(options) {
    this.position = options.position;  
    this.image = new Image();
    this.image.src = './assets/minion.png'; 
    this.width = 50;
    this.height = 50; 
    this.velocity = 10; 
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.frameIndex = 0;
  }

  update() {
    this.tickCount += 1;

    if (!this.jumping) {
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;

        if (this.frameIndex === 0) {
          this.frameIndex = 1;
          setTimeout(() => this.image.src = "./assets/minion.png", 5);
        } else {
          this.frameIndex = 0;
          setTimeout(() => this.image.src = "./assets/minion2.png", 5);
        }
      }
      
    }
  }

  render(ctx) {
    //this method will move minion's position, using jump(), then redraw minion using draw()

    this.jump();
    this.draw(ctx);   
  }

  isCollidedWith(otherObject) {
    if (this.position[0] < (otherObject.position[0] + otherObject.width) && 
      (this.position[0] + this.width) > otherObject.position[0] &&
      this.position[1] < (otherObject.position[1] + otherObject.height) &&
      (this.position[1] + this.height) > otherObject.position[1]
      ) { 
      return true;
    } else {
      return false; 
    }
  }

  jump() {

    if (this.jumping) {
      if (this.velocity > -10) {
        this.position[1] -= this.velocity;     
        this.velocity -= .3;
      } else {
        this.position[1] = 250;
        this.velocity = 10;
        this.jumping = false;  
      }
    }
  }

  draw(ctx) { 
    ctx.drawImage(this.image, this.position[0], this.position[1], this.width, this.height);
  }
}

module.exports = Minion; 

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

class Obstacle {

  constructor(options) {
    this.position = options.position;  
    this.resetPosition = options.resetPosition; 
    this.image = new Image();
    this.image.src = options.src; 
    this.velocity = options.velocity;
    this.width = options.width;
    this.height = options.height;  
  }

  render(ctx) {

    this.move();
    this.draw(ctx);
  }

  move() {
    if (this.position[0] <= -45) {
      this.position[0] = this.resetPosition;
    } else {
      this.position[0] -= this.velocity;  
    }
  }

  draw(ctx) {
    //last two numbers of draw image are position, last two of draw image are size 
    ctx.drawImage(this.image, this.position[0], this.position[1], this.width, this.height);
  }
}

module.exports = Obstacle; 

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

class Menu {

  constructor(game) {
    this.game = game; 
    this.position = [600, 50];
    this.width = 300;
    this.height = 300;
    this.score = 0;
    this.highScore = null; 
  }


  render(ctx) {
    this.draw(ctx);
  }

  draw(ctx) {
    this.score += 1;
    ctx.font = '20px Work Sans';
    ctx.fillText(`Score: ${this.score}`, 650, 40);
    ctx.font = '15px Work Sans';
    ctx.fillText(`Current High Score: ${this.game.prevHighScore}`, 600, 20);

    if (this.game.globalHighScore !== undefined) {
      ctx.fillText(`Global High Score: ${this.game.globalHighScore}`, 350, 20);
    }
    if (this.game.muted) {
      ctx.font = '15px Work Sans';
      ctx.fillText('Muted (click screen to toggle mute)', 10, 20);
    } else {
      ctx.font = '15px Work Sans';
      ctx.fillText('Umuted (click screen to toggle mute)', 10, 20);
    }
  }

  drawGameOverText(ctx) {
    if (this.highScore === null) {
      this.highScore = this.score; 
    }

    if (this.score > this.highScore) {
      this.highScore = this.score; 
      ctx.fillText(`New High Score!: ${this.score}`, 200, 40);
    }

    ctx.font = '20px Work Sans';

    ctx.fillText(`Final Score: ${this.score} Press r to restart game`, 200, 40);
  }

}

module.exports = Menu;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map