export default class Minion {
    constructor(options) {
        this.position = options.position;
        this.images = [new Image(), new Image(), new Image()];
        this.images[0].src = './assets/minion.png';
        this.images[1].src = './assets/minion2.png';
        this.images[2].src = './assets/surprised_minion.png';

        this.width = 50;
        this.height = 50;
        this.velocity = 10;
        this.tickCount = 0;
        this.ticksPerFrame = 4;
        this.frameIndex = 0;
    }

    update() {
        this.tickCount += 1;

        if (!this.jumping) {
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                if (this.frameIndex === 0) {
                    this.frameIndex = 1;
                } else {
                    this.frameIndex = 0;
                }
            }
        }
        if (this.jumping) {
            this.frameIndex = 0;
        }
    }

    render(ctx) {
        //this method will move minion's position, using jump(), then redraw minion using draw()
        this.jump();
        this.draw(ctx);
    }

    isCollidedWith(otherObject) {
        if (
            this.position[0] < otherObject.position[0] + otherObject.width &&
            this.position[0] + this.width > otherObject.position[0] &&
            this.position[1] < otherObject.position[1] + otherObject.height &&
            this.position[1] + this.height > otherObject.position[1]
        ) {
            return true;
        } else {
            return false;
        }
    }

    jump() {
        if (this.jumping) {
            if (this.velocity > -10) {
                this.position[1] -= this.velocity;
                this.velocity -= 0.3;
            } else {
                this.position[1] = 250;
                this.velocity = 10;
                this.jumping = false;
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(this.images[this.frameIndex], this.position[0], this.position[1], this.width, this.height);
    }
}

