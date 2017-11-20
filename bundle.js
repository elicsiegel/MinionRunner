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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Database = {

    fetchHighScores(database, game) {
      database.ref(`scores/`).on('value', (snapshot) => {
        document.getElementById("highscore1").textContent = "1: " + snapshot.val().highscore;
        document.getElementById("highscore2").textContent = "2: " + snapshot.val().highscore2;
        document.getElementById("highscore3").textContent = "3: " + snapshot.val().highscore3;

        game.globalLeaderScores = snapshot.val();
        game.globalHighScore = game.globalLeaderScores.highscore
      });
    },

    setHighScores(database, game) {
      if (game.menu.score > game.globalLeaderScores.highscore) {
        database.ref(`scores/highscore3`).set(game.globalLeaderScores.highscore2);
        database.ref(`scores/highscore2`).set(game.globalLeaderScores.highscore);
        database.ref(`scores/highscore`).set(game.menu.score);
      } else if (game.menu.score > game.globalLeaderScores.highscore2) {
        database.ref(`scores/highscore3`).set(game.globalLeaderScores.highscore2);
        database.ref(`scores/highscore2`).set(game.menu.score);
      } else if (game.menu.score > game.globalLeaderScores.highscore3) {
        database.ref(`scores/highscore3`).set(game.menu.score);
      }
    }
    
}


module.exports = Database;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const Database = __webpack_require__(0);

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
    const jumpButton = document.querySelector(".jump-button");
    const globalHighScores = document.querySelector(".global-high-scores");

    gameArea.classList.remove('hide');
    jumpButton.classList.remove('hide'); 
    menu.classList.add('hide');
    globalHighScores.classList.add('hide');
    setTimeout(() => game.start(e.target.id), 200);
  });

});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Minion = __webpack_require__(3);
const Obstacle = __webpack_require__(4);
const Menu = __webpack_require__(5);
const Database = __webpack_require__(0);

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
    this.stageCount = 0;
    this.getHighScores();
  }

  setKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 32:
          this.activateJump();
          break;
        case 82:
          if (this.gameOver) {
            this.resetGame();
          }
          break;
        case 80:
          this.togglePause();
          break;
      }
    });

    const jumpButton = document.querySelector(".jump-button");
    jumpButton.addEventListener('click', (e) => {
      this.activateJump();
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
  }

  manageEvilMinion(evilMinion) {
    evilMinion.update();
    evilMinion.render(this.ctx);

    if (this.minion.isCollidedWith(evilMinion)) {
      this.manageGameOver();
    }

    if (evilMinion.timesPassed > 1) {
      evilMinion.activated = false
    }
  }

  unleashEvilMinions() {
      if (this.evilMinion.activated) {
        this.manageEvilMinion(this.evilMinion);
      }

      if (this.evilMinion2.activated) {
        this.manageEvilMinion(this.evilMinion2);
      }

      if (this.evilMinion3.activated) {
        this.manageEvilMinion(this.evilMinion3);
      }

      if (this.evilMinion4.activated) {
        this.manageEvilMinion(this.evilMinion4);
      }

  }

  prepareStageTwo() {
    if (this.stageCount > 880 && this.stageCount < 1000) {
      this.stage = 2;
      this.menu.renderStageCompletion(this.ctx);
      this.evilMinion.position = [900, 250];
      this.evilMinion2.position = [1200, 250];
      this.evilMinion3.position = [1500, 250];
      this.evilMinion4.position = [1800, 250];

      this.evilMinion.activated = true;
      this.evilMinion.timesPassed = 0;
      this.evilMinion2.activated = true;
      this.evilMinion2.timesPassed = 0;
      this.evilMinion3.activated = true;
      this.evilMinion3.timesPassed = 0;
      this.evilMinion4.activated = true;
      this.evilMinion4.timesPassed = 0;
    }
  }

  resetToStageOne() {
    if (this.stageCount > 1700) {
        this.menu.renderSurvivalCompletion(this.ctx);
      }

    if (this.stageCount > 1800) {

      this.stageCount = 0;
      this.stage = 1;
      this.obstacle.position = [725, 200];
      this.obstacle2.position = [1200, 200];

      this.obstacle.activated = true;
      this.obstacle2.activated = true;

      if (this.flyingObstacle) {
        this.flyingObstacle.position = [2000, 60];
        this.flyingObstacle.activated = true;
      }
    }
  }

  drawStageOne() {
    if (this.obstacle.activated) {
      this.obstacle.render(this.ctx);

      if (this.minion.isCollidedWith(this.obstacle)) {
        this.manageGameOver();
      }
      if (this.obstacle.timesPassed > 2) {
        this.obstacle.activated = false;
        this.obstacle.timesPassed = 0;
      }
    }

    if (this.obstacle2.activated) {
      this.obstacle2.render(this.ctx);
      if (this.minion.isCollidedWith(this.obstacle2)) {
        this.manageGameOver();
      }
      if (this.obstacle2.timesPassed > 2) {
        this.obstacle2.activated = false;
        this.obstacle2.timesPassed = 0;
      }
    }

    if (this.difficulty === "medium-start" || this.difficulty === "hard-start")  {
      if (this.flyingObstacle.activated) {
        this.flyingObstacle.render(this.ctx);

        if (this.minion.isCollidedWith(this.flyingObstacle)) {
          this.manageGameOver();
        }
        if (this.flyingObstacle.timesPassed > 2) {
          this.flyingObstacle.activated = false;
          this.flyingObstacle.timesPassed = 0;
        }
      }
    }
  }

  draw() {
    if (!this.gameOver && !this.paused) {
      this.stageCount += 1;

      this.ctx.clearRect(0, 0, 800, 300);
      requestAnimationFrame(this.draw);
      this.menu.render(this.ctx);
      this.minion.update();
      this.minion.render(this.ctx);

      this.prepareStageTwo();
      this.resetToStageOne();

      if (this.stage === 1) {
        this.drawStageOne();
      }

      if (this.stage === 2) {
        this.unleashEvilMinions();
      }
    }

    if (this.finalFrame) {
      this.ctx.clearRect(0, 0, 800, 300);
      this.menu.render(this.ctx);
      this.setHighScores();
      this.minion.frameIndex = 2;
      this.minion.render(this.ctx);

      if (this.stage === 1) {
        this.obstacle.render(this.ctx);
        this.obstacle2.render(this.ctx);

        if (this.difficulty === "medium-start" || this.difficulty === "hard-start") {
          this.flyingObstacle.render(this.ctx);
        }
      }
      if (this.stage === 2) {
        this.evilMinion.render(this.ctx);
        this.evilMinion2.render(this.ctx);
        this.evilMinion3.render(this.ctx);
        this.evilMinion4.render(this.ctx);
      }
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
      evilMinionHeight: 50,
      evilMinionWidth: 50,
      evilMinionVelocity: 4,
      skyscraperImage: './assets/skyscraper.png',
      skyscraperWidth: 80,
      skyscraper2Image: './assets/fat-tall-sky.png',
      evilMinionSrcs: ['./assets/evil_minion1.png', './assets/evil_minion2.png', './assets/evil_minion3.png', './assets/evil_minion4.png', './assets/evil_minion5.png', './assets/evil_minion6.png']
    }

    switch (this.difficulty) {
      case "easy-start":
        return Object.assign({}, defaultValues);
        break;

      case "medium-start":
        let mediumValues = {
          skyscraperVelocity: 4,
          airplaneVelocity: 10,
        }

        return Object.assign({}, defaultValues, mediumValues);
        break;
      case "hard-start":
        let hardValues = {
          skyscraperVelocity: 5,
          airplaneVelocity: 12,
        }
        return Object.assign({}, defaultValues, hardValues);
        break;
    }
  }

  generatePieces() {
    const defaultValues = {
      skyscraperVelocity: 4,
      airplaneVelocity: 2,
    }

    let gameValues = this.setDifficulty();

    this.minion = new Minion({ position: [10, 250] });

    this.obstacle = new Obstacle({position: [725, 200], resetPosition: 1100, velocity: gameValues.skyscraperVelocity, width: gameValues.skyscraperWidth, height: 100, srcs: [gameValues.skyscraperImage] });
    this.obstacle2 = new Obstacle({position: [1200, 200], resetPosition: 1100, velocity: gameValues.skyscraperVelocity, width: gameValues.skyscraperWidth, height: 100, srcs: [gameValues.skyscraper2Image] });

    this.evilMinion = new Obstacle({position: [900, 250], resetPosition: 1100, velocity: gameValues.evilMinionVelocity, width: gameValues.evilMinionWidth, height: gameValues.evilMinionHeight, srcs: gameValues.evilMinionSrcs });

    this.evilMinion2 = new Obstacle({position: [1200, 250], resetPosition: 1100, velocity: gameValues.evilMinionVelocity, width: gameValues.evilMinionWidth, height: gameValues.evilMinionHeight, srcs: gameValues.evilMinionSrcs });

    this.evilMinion3 = new Obstacle({position: [1500, 250], resetPosition: 1100, velocity: gameValues.evilMinionVelocity, width: gameValues.evilMinionWidth, height: gameValues.evilMinionHeight, srcs: gameValues.evilMinionSrcs });

    this.evilMinion4 = new Obstacle({position: [1800, 250], resetPosition: 1100, velocity: gameValues.evilMinionVelocity, width: gameValues.evilMinionWidth, height: gameValues.evilMinionHeight, srcs: gameValues.evilMinionSrcs });

    if (this.difficulty === "medium-start" || this.difficulty === "hard-start") {
      this.flyingObstacle = new Obstacle( { position: [2000, 60], resetPosition: 2000, velocity: gameValues.airplaneVelocity, width: 50, height: 40, srcs: ['./assets/airplane.png']} );
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
    this.canvas.focus();
    this.difficulty = difficulty;
    this.stage = 1;
    this.stageCount = 0;
    this.paused = false;
    this.gameOver = false;
    this.generateMenu(this);
    this.generatePieces();
    this.draw();
  }
}

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports) {


class Minion {

  constructor(options) {
    this.position = options.position; 
    this.images = [new Image(), new Image(), new Image()];
    this.images[0].src = "./assets/minion.png";
    this.images[1].src = "./assets/minion2.png";
    this.images[2].src = "./assets/surprised_minion.png";

    this.width = 50;
    this.height = 50; 
    this.velocity = 10; 
    this.tickCount = 0;
    this.ticksPerFrame = 4;
    this.frameIndex = 0;
  }

  update() {
    this.tickCount += 1;

    if (!this.jumping) {
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        if (this.frameIndex === 0) {
          this.frameIndex = 1;
        } else {
          this.frameIndex = 0;
        }
      }    
    }
    if (this.jumping) {
      this.frameIndex = 0;
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
    ctx.drawImage(this.images[this.frameIndex], this.position[0], this.position[1], this.width, this.height);
  }
}

module.exports = Minion; 

/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Obstacle {

  constructor(options) {
    this.position = options.position;  
    this.resetPosition = options.resetPosition; 
    
    this.velocity = options.velocity;
    this.width = options.width;
    this.height = options.height;  

    this.frameIndex = 0;
    this.srcs = options.srcs;
    this.generateImages(); 

    this.tickCount = 0;
    this.ticksPerFrame = 4;
    this.timesPassed = 0;
    this.activated = true;
  }

  generateImages() {
    this.images = [];

    for (let i=0; i < this.srcs.length; i++) {
      this.images.push(new Image);
      this.images[i].src = this.srcs[i];
    }
  }

  update() {
    if (this.images.length > 1) {
      this.tickCount += 1;

      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        this.frameIndex += 1; 

        if (this.frameIndex === 5) {
          this.frameIndex = 0;
        }
      }
    } else {
      this.frameIndex = 0; 
    }
  }

  render(ctx) {

    this.move();
    this.draw(ctx);
  }

  move() {
    if (this.position[0] <= -45) {
      this.position[0] = this.resetPosition;
      this.timesPassed += 1; 
    } else {
      this.position[0] -= this.velocity;  
    }
  }

  draw(ctx) {
    //last two numbers of draw image are position, last two of draw image are size 
    ctx.drawImage(this.images[this.frameIndex], this.position[0], this.position[1], this.width, this.height);
  }
}

module.exports = Obstacle; 

/***/ }),
/* 5 */
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

  renderStageCompletion(ctx) {
    ctx.font = '25px Work Sans';
    ctx.fillText(`Oh no! Evil Minions are on the loose!`, 200, 80);
  }

  renderSurvivalCompletion(ctx) {
    ctx.font = '25px Work Sans';
    ctx.fillText(`You survived the Evil Minions!`, 200, 80);
  }

  render(ctx) {
    this.draw(ctx);
  }

  draw(ctx) {
    this.score += 1;
    ctx.font = '20px Work Sans';
    ctx.fillText(`Score: ${this.score}`, 650, 40);
    ctx.font = '15px Work Sans';
    ctx.fillText(`Local High Score: ${this.game.prevHighScore}`, 600, 20);

    if (this.game.globalHighScore !== undefined) {
      ctx.fillText(`Global High Score: ${this.game.globalHighScore}`, 350, 20);
    }
    
    if (this.game.muted) {
      ctx.fillText('Muted (click screen to toggle mute)', 10, 20);
    } else {
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
/******/ ]);
//# sourceMappingURL=bundle.js.map