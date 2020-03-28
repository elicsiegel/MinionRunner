import Minion from './minion';
import Obstacle from './obstacle';
import Menu from './menu';
import {Database} from './database';
import {Constants} from './constants';

export default class Game {
    constructor(ctx, canvas, database) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.database = database;

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
        this.canvas.addEventListener('click', (e) => this.mute(e));
    }

    mute() {
        if (this.muted === false) {
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
        if (this.paused === false) {
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

    manageEvilMinion(evilMinion) {
        evilMinion.update();
        evilMinion.render(this.ctx);

        if (this.minion.isCollidedWith(evilMinion)) {
            this.manageGameOver();
        }

        if (evilMinion.timesPassed > 1) {
            evilMinion.activated = false;
        }
    }

    unleashEvilMinions() {
        if (this.evilMinion.activated) {
            this.manageEvilMinion(this.evilMinion);
        }

        if (this.evilMinion2.activated) {
            this.manageEvilMinion(this.evilMinion2);
        }

        if (this.evilMinion3.activated) {
            this.manageEvilMinion(this.evilMinion3);
        }

        if (this.evilMinion4.activated) {
            this.manageEvilMinion(this.evilMinion4);
        }
    }

    prepareStageTwo() {
        if (this.stageCount > 880 && this.stageCount < 1000) {
            this.stage = 2;
            this.menu.renderStageCompletion(this.ctx);
            this.evilMinion.position = [900, 250];
            this.evilMinion2.position = [1200, 250];
            this.evilMinion3.position = [1500, 250];
            this.evilMinion4.position = [1800, 250];

            this.evilMinion.activated = true;
            this.evilMinion.timesPassed = 0;
            this.evilMinion2.activated = true;
            this.evilMinion2.timesPassed = 0;
            this.evilMinion3.activated = true;
            this.evilMinion3.timesPassed = 0;
            this.evilMinion4.activated = true;
            this.evilMinion4.timesPassed = 0;
        }
    }

    resetToStageOne() {
        if (this.stageCount > 1700) {
            this.menu.renderSurvivalCompletion(this.ctx);
        }

        if (this.stageCount > 1800) {
            this.stageCount = 0;
            this.stage = 1;
            this.obstacle.position = [725, 200];
            this.obstacle2.position = [1200, 200];

            this.obstacle.activated = true;
            this.obstacle2.activated = true;

            if (this.flyingObstacle) {
                this.flyingObstacle.position = [2000, 60];
                this.flyingObstacle.activated = true;
            }
        }
    }

    drawStageOne() {
        if (this.obstacle.activated) {
            this.obstacle.render(this.ctx);

            if (this.minion.isCollidedWith(this.obstacle)) {
                this.manageGameOver();
            }
            if (this.obstacle.timesPassed > 2) {
                this.obstacle.activated = false;
                this.obstacle.timesPassed = 0;
            }
        }

        if (this.obstacle2.activated) {
            this.obstacle2.render(this.ctx);
            if (this.minion.isCollidedWith(this.obstacle2)) {
                this.manageGameOver();
            }
            if (this.obstacle2.timesPassed > 2) {
                this.obstacle2.activated = false;
                this.obstacle2.timesPassed = 0;
            }
        }

        if (this.difficulty === 'medium-start' || this.difficulty === 'hard-start') {
            if (this.flyingObstacle.activated) {
                this.flyingObstacle.render(this.ctx);

                if (this.minion.isCollidedWith(this.flyingObstacle)) {
                    this.manageGameOver();
                }
                if (this.flyingObstacle.timesPassed > 2) {
                    this.flyingObstacle.activated = false;
                    this.flyingObstacle.timesPassed = 0;
                }
            }
        }
    }

    draw() {
        if (!this.gameOver && !this.paused) {
            this.stageCount += 1;

            this.ctx.clearRect(0, 0, 800, 300);
            requestAnimationFrame(this.draw);
            this.menu.render(this.ctx);
            this.minion.update();
            this.minion.render(this.ctx);

            this.prepareStageTwo();
            this.resetToStageOne();

            if (this.stage === 1) {
                this.drawStageOne();
            }

            if (this.stage === 2) {
                this.unleashEvilMinions();
            }
        }

        if (this.finalFrame) {
            this.ctx.clearRect(0, 0, 800, 300);
            this.menu.render(this.ctx);
            this.setHighScores();
            this.minion.frameIndex = 2;
            this.minion.render(this.ctx);

            if (this.stage === 1) {
                this.obstacle.render(this.ctx);
                this.obstacle2.render(this.ctx);

                if (this.difficulty === 'medium-start' || this.difficulty === 'hard-start') {
                    this.flyingObstacle.render(this.ctx);
                }
            }
            if (this.stage === 2) {
                this.evilMinion.render(this.ctx);
                this.evilMinion2.render(this.ctx);
                this.evilMinion3.render(this.ctx);
                this.evilMinion4.render(this.ctx);
            }
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
        const {
            minionPosition,
            evilMinionOnePosition,
            evilMinionTwoPosition,
            evilMinionThreePosition,
            evilMinionFourPosition,
            skyscraperOnePosition,
            skyscraperTwoPosition,
            flyingObstaclePosition
        } = Constants;
        const defaultValues = {
            minionPosition,
            skyscraperVelocity: 4,
            airplaneVelocity: 4,
            obstacleResetPosition: 1100,
            evilMinionHeight: 50,
            evilMinionWidth: 50,
            evilMinionVelocity: 4,
            evilMinionOnePosition,
            evilMinionTwoPosition,
            evilMinionThreePosition,
            evilMinionFourPosition,
            skyscraperOnePosition,
            skyscraperTwoPosition,
            flyingObstaclePosition,
            flyingObstacleResetPosition: 2000,
            skyscraperImage: './assets/skyscraper.png',
            skyscraperWidth: 80,
            skyscraperHeight: 100,
            skyscraper2Image: './assets/fat-tall-sky.png',
            evilMinionSrcs: [
                './assets/evil_minion1.png',
                './assets/evil_minion2.png',
                './assets/evil_minion3.png',
                './assets/evil_minion4.png',
                './assets/evil_minion5.png',
                './assets/evil_minion6.png'
            ]
        };

        const mediumValues = {
            skyscraperVelocity: 4,
            airplaneVelocity: 10
        };
        const hardValues = {
            skyscraperVelocity: 5,
            airplaneVelocity: 12
        };
        switch (this.difficulty) {
            case 'easy-start':
                return Object.assign({}, defaultValues);
            case 'medium-start':
                return Object.assign({}, defaultValues, mediumValues);
            case 'hard-start':
                return Object.assign({}, defaultValues, hardValues);
            default:
                return Object.assign({}, defaultValues);
        }
    }

    generatePieces() {
        let gameValues = this.setDifficulty();

        this.minion = new Minion({position: gameValues.minionPosition});

        this.obstacle = new Obstacle({
            position: gameValues.skyscraperOnePosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.skyscraperVelocity,
            width: gameValues.skyscraperWidth,
            height: gameValues.skyscraperHeight,
            srcs: [gameValues.skyscraperImage]
        });
        this.obstacle2 = new Obstacle({
            position: gameValues.skyscraperTwoPosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.skyscraperVelocity,
            width: gameValues.skyscraperWidth,
            height: gameValues.skyscraperHeight,
            srcs: [gameValues.skyscraper2Image]
        });

        this.evilMinion = new Obstacle({
            position: gameValues.evilMinionOnePosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.evilMinionVelocity,
            width: gameValues.evilMinionWidth,
            height: gameValues.evilMinionHeight,
            srcs: gameValues.evilMinionSrcs
        });

        this.evilMinion2 = new Obstacle({
            position: gameValues.evilMinionTwoPosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.evilMinionVelocity,
            width: gameValues.evilMinionWidth,
            height: gameValues.evilMinionHeight,
            srcs: gameValues.evilMinionSrcs
        });

        this.evilMinion3 = new Obstacle({
            position: gameValues.evilMinionThreePosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.evilMinionVelocity,
            width: gameValues.evilMinionWidth,
            height: gameValues.evilMinionHeight,
            srcs: gameValues.evilMinionSrcs
        });

        this.evilMinion4 = new Obstacle({
            position: gameValues.evilMinionFourPosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.evilMinionVelocity,
            width: gameValues.evilMinionWidth,
            height: gameValues.evilMinionHeight,
            srcs: gameValues.evilMinionSrcs
        });

        if (this.difficulty === 'medium-start' || this.difficulty === 'hard-start') {
            this.flyingObstacle = new Obstacle({
                position: gameValues.flyingObstaclePosition,
                resetPosition: gameValues.flyingObstacleResetPosition,
                velocity: gameValues.airplaneVelocity,
                width: 50,
                height: 40,
                srcs: ['./assets/airplane.png']
            });
        }
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
        this.generateMenu(this);
        this.generatePieces();
        this.draw();
    }
}
