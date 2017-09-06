const Minion = require('./minion.js');

class Game {

  constructor(ctx) {
    this.ctx = ctx; 
    this.minion = new Minion({position: [100, 210] });
  }
}

module.exports = Game;