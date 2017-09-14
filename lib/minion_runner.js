const Game = require('./game.js');

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