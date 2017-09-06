const Game = require('./game.js');

document.addEventListener('DOMContentLoaded', () => {
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');

  const game = new Game(ctx, canvas);
  // debugger
  // game.draw(); 
  
  // var playerImg = new Image(); 
  // playerImg.src = './assets/minion.png';

  // playerImg.onload = function() {
  //   ctx.drawImage(playerImg, 50, 250, 50, 50); 
  // }
  
  // document.addEventListener('keydown', (e) => {
  //   switch (e.keyCode) {
  //     case 32: 
  //       console.log("Jump");
  //       game.minion.move(ctx);
  //       // ctx.drawImage(playerImg, 100, 250, 50, 50)
  //       break;
  //   }
  // });
});