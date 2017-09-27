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