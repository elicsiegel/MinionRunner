
class Minion {

  constructor(options) {
    this.position = options.position;  
    this.image = new Image();
    this.image.src = './assets/minion.png'; 
    this.width = 50;
    this.height = 50; 
    this.velocity = 10; 
  
  }

  render(ctx) {
    //this method will move minion's position, using jump(), then redraw minion using draw() 
    this.jump();
    this.draw(ctx);   
  }

  isCollidedWith(otherObject) {
    if (this.position[0] < (otherObject.position[0] + otherObject.width/2) && 
      (this.position[0] + this.width/2) > otherObject.position[0] &&
      this.position[1] < (otherObject.position[1] + otherObject.height) &&
      (this.position[1] + this.height) > otherObject.position[1]
      ) {
      console.log("collision"); 
      return true;
    } else {
      return false; 
    }
  }

  jump() {

    if (this.jumping) {
      if (this.velocity > -10) {
        this.position[1] -= this.velocity;     
        this.velocity -= .3;
      } else {
        this.position[1] = 250;
        this.velocity = 10;
        this.jumping = false;  
      }
    }
  }

  draw(ctx) { 
    ctx.drawImage(this.image, this.position[0], this.position[1], this.width, this.height);
  }
}

module.exports = Minion; 