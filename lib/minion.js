
class Minion {

  constructor(options) {
    this.position = options.position; 
    this.ctx = options.ctx; 
    this.image = new Image();
    this.image.src = './assets/minion.png';
    this.inAir = false; 
    this.jumpCount = 0;
    this.velocity = 60; 
    // this.image.onload = () => {
    //   this.ctx.drawImage(this.image, this.position[0], this.position[1], 50, 50);
    // }
  }

  move(ctx) {
    //this method will move minion's position, using jump(), then redraw minion using draw() 
    this.jump();
    this.draw(ctx);   
  }

  onGround() {
    return this.position[0] === 100 && this.position[1] >= 250;
  }

  jump() {
    if (this.jumping) {
      if (this.velocity > -100) {
        this.position[1] -= this.velocity;    
        this.velocity -= 10;
      } else {
        this.position[1] = 250;
        this.velocity = 60;
        this.jumping = false; 
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 800, 300); 
    
    // this.image.onload = () => {
    //   this.ctx.drawImage(this.image, this.position[0], this.position[1], 50, 50);
    // }
    ctx.drawImage(this.image, this.position[0], this.position[1], 50, 50);
  }
}

module.exports = Minion; 