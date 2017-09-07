const Game = require('./game.js');

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