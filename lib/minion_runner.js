const Game = require('./game.js');
// const GameView = require('./game_view.js');

document.addEventListener('DOMContentLoaded', () => {
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');

  const easy_start_button = document.getElementById('easy-start'); 
  
  const game = new Game(ctx, canvas);

  easy_start_button.addEventListener('click', (e) => {
    setTimeout(() => game.start('easy'), 200);
  });

});