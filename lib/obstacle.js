export default class Obstacle {
    constructor(options) {
        this.position = options.position;
        this.resetPosition = options.resetPosition;

        this.velocity = options.velocity;
        this.width = options.width;
        this.height = options.height;

        this.frameIndex = 0;
        this.srcs = options.srcs;
        this.generateImages();

        this.tickCount = 0;
        this.ticksPerFrame = 4;
        this.timesPassed = 0;
        this.activated = true;
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

                if (this.frameIndex === 5) {
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
