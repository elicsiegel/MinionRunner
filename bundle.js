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
  
  const game = new Game(ctx, canvas);

  easy_start_button.addEventListener('click', (e) => {
    const gameArea = document.querySelector(".game-area");
    const menu = document.querySelector(".menu");

    gameArea.classList.remove('hide'); 
    menu.classList.add('hide');
    
    setTimeout(() => game.start('easy'), 200);
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
    this.velocity = 65; 
    
  }

  render(ctx) {
    //this method will move minion's position, using jump(), then redraw minion using draw() 
    this.jump();
    this.draw(ctx);   
  }

  onGround() {
    return this.position[0] === 10 && this.position[1] >= 250;
  }

  jump() {
    if (this.jumping) {
      if (this.velocity > -100) {
        this.position[1] -= this.velocity;    
        this.velocity -= 10;
      } else {
        this.position[1] = 250;
        this.velocity = 65;
        this.jumping = false; 
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 800, 300); 
    ctx.drawImage(this.image, this.position[0], this.position[1], 50, 50);
  }
}

module.exports = Minion; 

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Minion = __webpack_require__(1); 

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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map