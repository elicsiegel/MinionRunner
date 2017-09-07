
class Minion {

  constructor(options) {
    this.position = options.position;  
    this.image = new Image();
    this.image.src = './assets/minion.png'; 
    this.velocity = 65; 
    
  }

  render(ctx) {
    //this method will move minion's position, using jump(), then redraw minion using draw() 
    this.jump();
    this.draw(ctx);   
  }

  onGround() {
    return this.position[0] === 10 && this.position[1] >= 250;
  }

  jump() {
    if (this.jumping) {
      if (this.velocity > -100) {
        this.position[1] -= this.velocity;    
        this.velocity -= 10;
      } else {
        this.position[1] = 250;
        this.velocity = 65;
        this.jumping = false; 
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 800, 300); 
    ctx.drawImage(this.image, this.position[0], this.position[1], 50, 50);
  }
}

module.exports = Minion; 