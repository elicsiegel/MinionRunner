const Game = require('./game.js');

document.addEventListener('DOMContentLoaded', () => {
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');
  var playerImg = new Image(); 
  playerImg.src = './assets/minion.png';
  playerImg.onload = function() {
    ctx.drawImage(playerImg, 50, 250, 50, 50); 
  }
  // debugger
});