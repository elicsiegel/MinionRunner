import Obstacle from './obstacle';
import {StartTypes} from './constants';

export const stageData = {
    1: {
        banner: null,
        endingBanner: null,
        stageCountEnding: 879,
        obstaclePasses: 2
    },
    2: {
        banner: {
            text: 'Oh no! Evil Minions are on the loose!',
            duration: [880, 1000]
        },
        endingBanner: {
            text: 'You survived the Evil Minions!',
            duration: [1700, 1800]
        },
        stageCountEnding: 1800,
        obstaclePasses: 1
    }
};

export const getStageOneObstacles = (gameValues, difficulty) => {
    const obstacles = [
        new Obstacle({
            position: gameValues.skyscraperOnePosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.skyscraperVelocity,
            width: gameValues.skyscraperWidth,
            height: gameValues.skyscraperHeight,
            srcs: [gameValues.skyscraperImage]
        }),
        new Obstacle({
            position: gameValues.skyscraperTwoPosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.skyscraperVelocity,
            width: gameValues.skyscraperWidth,
            height: gameValues.skyscraperHeight,
            srcs: [gameValues.skyscraper2Image]
        })
    ];

    if (difficulty === StartTypes.HARD_START || difficulty === StartTypes.MEDIUM_START) {
        obstacles.push(
            new Obstacle({
                position: gameValues.flyingObstaclePosition,
                resetPosition: gameValues.flyingObstacleResetPosition,
                velocity: gameValues.airplaneVelocity,
                width: gameValues.flyingObstacleWidth,
                height: gameValues.flyingObstacleHeight,
                srcs: gameValues.flyingObstacleSrcs
            })
        );
    }
    return obstacles;
};

export const getStageTwoObstacles = (gameValues) => {
    const obstacles = [
        new Obstacle({
            position: gameValues.evilMinionOnePosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.evilMinionVelocity,
            width: gameValues.evilMinionWidth,
            height: gameValues.evilMinionHeight,
            srcs: gameValues.evilMinionSrcs
        }),
        new Obstacle({
            position: gameValues.evilMinionTwoPosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.evilMinionVelocity,
            width: gameValues.evilMinionWidth,
            height: gameValues.evilMinionHeight,
            srcs: gameValues.evilMinionSrcs
        }),
        new Obstacle({
            position: gameValues.evilMinionThreePosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.evilMinionVelocity,
            width: gameValues.evilMinionWidth,
            height: gameValues.evilMinionHeight,
            srcs: gameValues.evilMinionSrcs
        }),
        new Obstacle({
            position: gameValues.evilMinionFourPosition,
            resetPosition: gameValues.obstacleResetPosition,
            velocity: gameValues.evilMinionVelocity,
            width: gameValues.evilMinionWidth,
            height: gameValues.evilMinionHeight,
            srcs: gameValues.evilMinionSrcs
        })
    ];
    return obstacles;
};
