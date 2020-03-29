export const Positions = {
    minionPosition: [10, 250],
    evilMinionOnePosition: [900, 250],
    evilMinionTwoPosition: [1200, 250],
    evilMinionThreePosition: [1500, 250],
    evilMinionFourPosition: [1800, 250],
    skyscraperOnePosition: [725, 200],
    skyscraperTwoPosition: [1200, 200],
    flyingObstaclePosition: [2000, 60]
};

export const StageDivides = {
    ONE: {
        beginning: 0,
        ending: 879
    },
    TWO: {
        beginning: 880,
        ending: 1000
    }
};

export const StartTypes = {
    EASY_START: 'easy-start',
    MEDIUM_START: 'medium-start',
    HARD_START: 'hard-start'
};

export const DefaultValues = {
    minionPosition: Positions.minionPosition,
    skyscraperVelocity: 4,
    airplaneVelocity: 4,
    obstacleResetPosition: 1100,
    evilMinionHeight: 50,
    evilMinionWidth: 50,
    evilMinionVelocity: 4,
    evilMinionOnePosition: Positions.evilMinionOnePosition,
    evilMinionTwoPosition: Positions.evilMinionTwoPosition,
    evilMinionThreePosition: Positions.evilMinionThreePosition,
    evilMinionFourPosition: Positions.evilMinionFourPosition,
    skyscraperOnePosition: Positions.skyscraperOnePosition,
    skyscraperTwoPosition: Positions.skyscraperTwoPosition,
    flyingObstaclePosition: Positions.flyingObstaclePosition,
    flyingObstacleResetPosition: 2000,
    flyingObstacleWidth: 50,
    flyingObstacleHeight: 40,
    flyingObstacleSrcs: ['./assets/Fly1.png', './assets/Fly2.png'],
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

export const MediumValues = {
    skyscraperVelocity: 4,
    airplaneVelocity: 10
};
export const HardValues = {
    skyscraperVelocity: 5,
    airplaneVelocity: 12
};
