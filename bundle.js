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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');

  const easy_start_button = document.getElementById('easy-start'); 
  const medium_start_button = document.getElementById('medium-start');
  const hard_start_button = document.getElementById('hard-start');
  
  const game = new Game(ctx, canvas);

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
/* 1 */
/***/ (function(module, exports) {


class Minion {

  constructor(options) {
    this.position = options.position;  
    this.image = new Image();
    this.image.src = './assets/minion.png'; 
    this.width = 50;
    this.height = 50; 
    this.velocity = 10; 
  
  }

  render(ctx) {
    //this method will move minion's position, using jump(), then redraw minion using draw() 
    this.jump();
    this.draw(ctx);   
  }

  isCollidedWith(otherObject) {
    if (this.position[0] < (otherObject.position[0] + otherObject.width/3) && 
      (this.position[0] + this.width/3) > otherObject.position[0] &&
      this.position[1] < (otherObject.position[1] + otherObject.height) &&
      (this.position[1] + this.height) > otherObject.position[1]
      ) {
      console.log("collision"); 
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Minion = __webpack_require__(1); 
const Obstacle = __webpack_require__(5);
const Menu = __webpack_require__(6); 

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
      this.ctx.clearRect(0, 0, 800, 300);
      requestAnimationFrame(this.draw);
      this.menu.render(this.ctx)
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
    if (this.gameOver) {
      this.menu.drawGameOverText(this.ctx);
    }
  }

  generateMenu() {
    this.menu = new Menu();
  }

  generatePieces() {
    this.minion = new Minion({ position: [10, 250] });

    this.obstacle = new Obstacle({position: [725, 200], resetPosition: 1000, velocity: 4, width: 125, height: 100, src: './assets/skyscraper.png' });

    this.flyingObstacle = new Obstacle( { position: [2000, 100], resetPosition: 2000, velocity: 3, width: 50, height: 40, src: './assets/airplane.png'} ); 
  }

  start(difficulty) {
    console.log(difficulty);
    this.canvas.focus();
    this.difficulty = difficulty; 
    this.paused = false; 
    this.gameOver = false; 
    this.generateMenu(); 
    this.generatePieces();
    this.draw();
  }
}

module.exports = Game;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

class Menu {

  constructor() {
    this.position = [600, 50];
    this.width = 300;
    this.height = 300;
    this.score = 9;
  }

  render(ctx) {
    this.draw(ctx);
  }

  draw(ctx) {
    this.score += 1;
    ctx.font = '20px Work Sans';
    ctx.fillText(`Score: ${this.score}`, 650, 40);
  }

  drawGameOverText(ctx) {
    ctx.font = '20px Work Sans';
    ctx.fillText(`Final Score: ${this.score} Press r to restart game`, 200, 40);
  }

}

module.exports = Menu;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map