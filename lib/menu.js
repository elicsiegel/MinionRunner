export default class Menu {
    constructor(game) {
        this.game = game;
        this.position = [600, 50];
        this.width = 300;
        this.height = 300;
        this.score = 0;
        this.highScore = null;
    }

    renderStageCompletion(ctx) {
        ctx.font = '25px Work Sans';
        ctx.fillText(`Oh no! Evil Minions are on the loose!`, 200, 80);
    }

    renderSurvivalCompletion(ctx) {
        ctx.font = '25px Work Sans';
        ctx.fillText(`You survived the Evil Minions!`, 200, 80);
    }

    render(ctx) {
        this.draw(ctx);
    }

    draw(ctx) {
        this.score += 1;
        ctx.font = '20px Work Sans';
        ctx.fillText(`Score: ${this.score}`, 650, 40);
        ctx.font = '15px Work Sans';
        ctx.fillText(`Local High Score: ${this.game.prevHighScore}`, 600, 20);

        if (this.game.globalHighScore !== undefined) {
            ctx.fillText(`Global High Score: ${this.game.globalHighScore}`, 350, 20);
        }

        if (this.game.muted) {
            ctx.fillText('Muted (click screen to toggle mute)', 10, 20);
        } else {
            ctx.fillText('Umuted (click screen to toggle mute)', 10, 20);
        }
    }

    drawGameOverText(ctx) {
        if (this.highScore === null) {
            this.highScore = this.score;
        }

        if (this.score > this.highScore) {
            this.highScore = this.score;
            ctx.fillText(`New High Score!: ${this.score}`, 200, 40);
        }

        ctx.font = '20px Work Sans';

        ctx.fillText(`Final Score: ${this.score} Press r to restart game`, 200, 40);
    }
}
