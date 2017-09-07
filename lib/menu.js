class Menu {

  constructor() {
    this.position = [600, 50];
    this.width = 300;
    this.height = 300;
    this.score = 9;
  }

  render(ctx) {
    this.draw(ctx);
  }

  draw(ctx) {
    this.score += 1;
    ctx.font = '20px Work Sans';
    ctx.fillText(`Score: ${this.score}`, 650, 40);
  }

  drawGameOverText(ctx) {
    ctx.font = '20px Work Sans';
    ctx.fillText(`Final Score: ${this.score} Press r to restart game`, 200, 40);
  }

}

module.exports = Menu;