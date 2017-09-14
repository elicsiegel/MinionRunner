const Database = {

    fetchHighScores(database, game) {
      database.ref(`scores/`).on('value', (snapshot) => {
        game.globalLeaderScore = snapshot.val()
      })
    },

    setHighScores(database, game) {
      if (game.menu.score > game.globalLeaderScore.highscore) {
        database.ref(`scores/highscore`).set(game.menu.score);
      } else if (game.menu.score > game.globalLeaderScore.highscore2) {
        database.ref(`scores/highscore2`).set(game.menu.score);
      } else if (game.menu.score > game.globalLeaderScore.highscore3) {
        database.ref(`scores/highscore3`).set(game.menu.score);
      }
    }
    
}


module.exports = Database;