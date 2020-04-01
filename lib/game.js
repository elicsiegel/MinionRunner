import Minion from './minion';
import Menu from './menu';
import {Database} from './database';
import {StageDivides, StartTypes, DefaultValues, MediumValues, HardValues} from './constants';
import {getStageOneObstacles, getStageTwoObstacles, stageData} from './stageInfo';
export default class Game {
    constructor(ctx, canvas, database) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.database = database;
        this.obstacles = {};

        this.gameOver = false;
        this.draw = this.draw.bind(this);
        this.setKeyboardListeners();
        this.setEventListeners();
        this.muted = false;
        this.jumpSound = new Audio('./assets/audio/jump1.m4a');
        this.gameOverSound = new Audio('./assets/audio/game_over.mp3');
        this.prevHighScore = 0;
        this.stageCount = 0;
        this.getHighScores();
    }

    setKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 32:
                    this.activateJump();
                    break;
                case 82:
                    if (this.gameOver) {
                        this.resetGame();
                    }
                    break;
                case 80:
                    this.togglePause();
                    break;
            }
        });

        const jumpButton = document.querySelector('.jump-button');
        jumpButton.addEventListener('click', () => {
            this.activateJump();
        });
    }

    setEventListeners() {
        this.canvas.addEventListener('click', () => this.mute());
    }

    mute() {
        if (!this.muted) {
            this.muted = true;
        } else {
            this.muted = false;
        }
    }

    resetGame() {
        if (this.menu.highScore > this.prevHighScore) {
            this.prevHighScore = this.menu.highScore;
        }
        this.start(this.difficulty);
    }

    togglePause() {
        if (!this.paused) {
            this.canvas.classList.add('paused');
            this.paused = true;
        } else {
            this.canvas.classList.remove('paused');
            this.paused = false;
            this.draw();
        }
    }

    activateJump() {
        if (!this.muted && !this.minion.jumping && !this.gameOver) {
            this.jumpSound.play();
        }

        this.minion.jumping = true;
        this.minion.imageCount = 0;
    }

    manageGameOver() {
        this.gameOver = true;
        this.finalFrame = true;
    }

    prepareNextStage() {
        if (stageData[this.stage].stageCountEnding < this.stageCount) {
            if (stageData[this.stage + 1]) {
                this.stage += 1;
            }
        }
        if (!stageData[this.stage + 1] && this.stageCount > stageData[this.stage].stageCountEnding) {
            this.stageCount = 0;
            this.stage = 1;
            // this should be switched to only reset the obstacles' positions, activated and timesPassed
            this.generatePieces();
        }
    }

    prepareStageTwo() {
        if (this.stageCount > StageDivides.TWO.beginning && this.stageCount < StageDivides.TWO.ending) {
            this.stage = 2;
            this.menu.renderStageCompletion(this.ctx);

            // this.evilMinion.position = [evilMinionOnePosition[0], evilMinionOnePosition[1]];
            // this.evilMinion2.position = [evilMinionTwoPosition[0], evilMinionTwoPosition[1]];
            // this.evilMinion3.position = [evilMinionThreePosition[0], evilMinionThreePosition[1]];
            // this.evilMinion4.position = [evilMinionFourPosition[0], evilMinionFourPosition[1]];

            // this.evilMinion.activated = true;
            // this.evilMinion.timesPassed = 0;
            // this.evilMinion2.activated = true;
            // this.evilMinion2.timesPassed = 0;
            // this.evilMinion3.activated = true;
            // this.evilMinion3.timesPassed = 0;
            // this.evilMinion4.activated = true;
            // this.evilMinion4.timesPassed = 0;
        }
    }

    resetToStageOne() {
        if (this.stageCount > 1700) {
            this.menu.renderSurvivalCompletion(this.ctx);
        }

        if (this.stageCount > 1800) {
            console.log(this.obstacles);
            // const {flyingObstaclePosition, skyscraperOnePosition, skyscraperTwoPosition} = Positions;
            this.stageCount = 0;
            this.stage = 1;
            // this.obstacle.position = [skyscraperOnePosition[0], skyscraperOnePosition[1]];
            // this.obstacle2.position = [skyscraperTwoPosition[0], skyscraperTwoPosition[1]];
            // this.obstacle.activated = true;
            // this.obstacle2.activated = true;

            // if (this.flyingObstacle) {
            //     this.flyingObstacle.position = [flyingObstaclePosition[0], flyingObstaclePosition[1]];
            //     this.flyingObstacle.activated = true;
            // }
            this.generatePieces();
        }
    }

    drawStage() {
        this.obstacles[this.stage].forEach((obstacle) => {
            if (obstacle.activated) {
                obstacle.render(this.ctx);

                if (this.minion.isCollidedWith(obstacle)) {
                    this.manageGameOver();
                }
                if (obstacle.timesPassed > stageData[this.stage].obstaclePasses) {
                    obstacle.activated = false;
                    obstacle.timesPassed = 0;
                }
            }
        });
        if (
            stageData[this.stage].banner &&
            this.stageCount > stageData[this.stage].banner.duration[0] &&
            this.stageCount < stageData[this.stage].banner.duration[1]
        ) {
            this.menu.renderStageCompletion(this.ctx, stageData[this.stage].banner.text);
        }
        if (
            stageData[this.stage].banner &&
            this.stageCount > stageData[this.stage].endingBanner.duration[0] &&
            this.stageCount < stageData[this.stage].endingBanner.duration[1]
        ) {
            this.menu.renderSurvivalCompletion(this.ctx, stageData[this.stage].endingBanner.text);
        }
    }

    draw() {
        if (!this.gameOver && !this.paused) {
            this.stageCount += 1;
            console.log(this.stageCount);
            this.ctx.clearRect(0, 0, 800, 300);
            requestAnimationFrame(this.draw);
            this.menu.render(this.ctx);
            this.minion.update();
            this.minion.render(this.ctx);

            // should be prepare next stage
            // this.prepareStageTwo();
            // this.resetToStageOne();
            this.prepareNextStage();

            this.drawStage();
        }

        if (this.finalFrame) {
            this.ctx.clearRect(0, 0, 800, 300);
            this.menu.render(this.ctx);
            this.setHighScores();
            this.minion.frameIndex = 2;
            this.minion.render(this.ctx);

            this.drawStage();
        }

        if (this.gameOver) {
            this.finalFrame = false;
            this.canvas.classList.add('paused');

            if (!this.muted) {
                this.gameOverSound.play();
            }
            this.menu.drawGameOverText(this.ctx);
        }
    }

    generateMenu() {
        this.menu = new Menu(this);
    }

    setDifficulty() {
        const {MEDIUM_START, HARD_START, EASY_START} = StartTypes;

        switch (this.difficulty) {
            case EASY_START:
                return Object.assign({}, DefaultValues);
            case MEDIUM_START:
                return Object.assign({}, DefaultValues, MediumValues);
            case HARD_START:
                return Object.assign({}, DefaultValues, HardValues);
            default:
                return Object.assign({}, DefaultValues);
        }
    }

    generatePieces() {
        const gameValues = this.setDifficulty();

        this.minion = new Minion({position: gameValues.minionPosition});

        this.obstacles = {
            1: getStageOneObstacles(gameValues, this.difficulty),
            2: getStageTwoObstacles(gameValues)
        };
    }

    getHighScores() {
        Database.fetchHighScores(this.database, this);
    }

    setHighScores() {
        Database.setHighScores(this.database, this);
    }

    start(difficulty) {
        this.canvas.classList.remove('paused');
        this.canvas.focus();
        this.difficulty = difficulty;
        this.stage = 1;
        this.stageCount = 0;
        this.paused = false;
        this.gameOver = false;
        this.generateMenu();
        this.generatePieces();
        this.draw();
    }
}
