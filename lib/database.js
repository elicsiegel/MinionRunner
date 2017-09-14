const Database = {

    fetchHighScores(database, game) {
      database.ref(`scores/`).on('value', (snapshot) => {
        game.globalLeaderScores = snapshot.val();
        game.globalHighScore = game.globalLeaderScores.highscore
      })
    },

    setHighScores(database, game) {
      if (game.menu.score > game.globalLeaderScores.highscore) {
        database.ref(`scores/highscore`).set(game.menu.score);
      } else if (game.menu.score > game.globalLeaderScores.highscore2) {
        database.ref(`scores/highscore2`).set(game.menu.score);
      } else if (game.menu.score > game.globalLeaderScores.highscore3) {
        database.ref(`scores/highscore3`).set(game.menu.score);
      }
    }
    
}


module.exports = Database;