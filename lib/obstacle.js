export default class Obstacle {
    constructor({position, resetPosition, velocity, width, height, srcs}) {
        this.position = [position[0], position[1]];
        this.initialPosition = [position[0], position[1]];
        this.resetPosition = resetPosition;

        this.velocity = velocity;
        this.width = width;
        this.height = height;

        this.frameIndex = 0;
        this.srcs = srcs;
        this.generateImages();

        this.tickCount = 0;
        this.ticksPerFrame = 4;
        this.timesPassed = 0;
        this.activated = true;
    }

    resetObstacle() {
        this.position = [this.initialPosition[0], this.initialPosition[1]];
    }

    generateImages() {
        this.images = [];

        for (let i = 0; i < this.srcs.length; i++) {
            this.images.push(new Image());
            this.images[i].src = this.srcs[i];
        }
    }

    update() {
        if (this.images.length > 1) {
            this.tickCount += 1;

            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                this.frameIndex += 1;

                if (this.frameIndex === this.images.length) {
                    this.frameIndex = 0;
                }
            }
        } else {
            this.frameIndex = 0;
        }
    }

    render(ctx) {
        this.move();
        this.draw(ctx);
    }

    move() {
        if (this.position[0] <= -45) {
            this.position[0] = this.resetPosition;
            this.timesPassed += 1;
        } else {
            this.position[0] -= this.velocity;
        }
    }

    draw(ctx) {
        //last two numbers of draw image are position, last two of draw image are size
        ctx.drawImage(this.images[this.frameIndex], this.position[0], this.position[1], this.width, this.height);
    }
}
