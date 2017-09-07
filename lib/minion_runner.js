const Game = require('./game.js');

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  
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