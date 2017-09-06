
class Minion {

  constructor(options) {
    this.position = options.position; 
    this.ctx = options.ctx; 
    this.image = new Image();
    this.image.src = './assets/minion.png';

    this.image.onload = () => {
      this.ctx.drawImage(this.image, this.position[0], this.position[1], 50, 50);
    }
  }

  move(ctx) {
    //this method will move minion's position, using jump(), then redraw minion using draw()
    // debugger
    this.jump();
    this.draw(ctx); 
  }

  jump() {
    this.position[0] += 100;  
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 800, 300); 
    ctx.drawImage(this.image, this.position[0], this.position[1], 50, 50);
  }
}

module.exports = Minion; 