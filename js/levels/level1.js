let level1;
/**
 * Initializes the level by creating a new Level object.+ *
 * @return {void}
 */
function initLevel() {
    level1 = new Level(
        [
            new Zombie(),
            new Zombie(),
            new Zombie2(),
            new Zombie(),
            new Zombie(),
            new Zombie2(),
            new Zombie2(),
            new Zombie(),
            new Zombie(),
            new Zombie(),
            new Zombie2(),
        ],
        [
            new Cloud('./img/4_backgrounds/day_cloud.png', 0),
            new Cloud('./img/4_backgrounds/1_6.png', 0),

            new Cloud('./img/4_backgrounds/day_cloud.png', 719),
            new Cloud('./img/4_backgrounds/1_6.png', 719),

            new Cloud('./img/4_backgrounds/day_cloud.png', 719 * 3),
            new Cloud('./img/4_backgrounds/1_6.png', 719 * 3),

            new Cloud('./img/4_backgrounds/day_cloud.png', 719 * 4),
            new Cloud('./img/4_backgrounds/1_6.png', -719),
        ],
        [
            new BackgroundObject('./img/4_backgrounds/1_5.png', -719),
            new BackgroundObject('./img/4_backgrounds/1_4.png', -719),
            new BackgroundObject('./img/4_backgrounds/sunset_decor.png', -719),
            new BackgroundObject('./img/4_backgrounds/sunset_sun.png', -719),
            new BackgroundObject('./img/4_backgrounds/day_decor.png', -719),
            new BackgroundObject('./img/4_backgrounds/1_3.png', -719),
            new BackgroundObject('./img/4_backgrounds/4_1.png', -719),

            new BackgroundObject('./img/4_backgrounds/1_5.png', 0),
            new BackgroundObject('./img/4_backgrounds/1_4.png', 0),
            new BackgroundObject('./img/4_backgrounds/sunset_decor.png', 0),
            new BackgroundObject('./img/4_backgrounds/3_2.png', 0),
            new BackgroundObject('./img/4_backgrounds/1_2.png', 0),
            new BackgroundObject('./img/4_backgrounds/1_3.png', 0),
            new BackgroundObject('./img/4_backgrounds/4_1.png', 0),

            new BackgroundObject('./img/4_backgrounds/1_5.png', 719),
            new BackgroundObject('./img/4_backgrounds/4_4.png', 719),
            new BackgroundObject('./img/4_backgrounds/sunset_decor.png', 719),
            new BackgroundObject('./img/4_backgrounds/4_3.png', 719),
            new BackgroundObject('./img/4_backgrounds/1_2.png', 719),
            new BackgroundObject('./img/4_backgrounds/1_3.png', 719),
            new BackgroundObject('./img/4_backgrounds/4_1.png', 719),

            new BackgroundObject('./img/4_backgrounds/1_5.png', 719 * 2),
            new BackgroundObject('./img/4_backgrounds/4_3.png', 719 * 2),
            new BackgroundObject('./img/4_backgrounds/sunset_decor.png', 719 * 2),
            new BackgroundObject('./img/4_backgrounds/1_2.png', 719 * 2),
            new BackgroundObject('./img/4_backgrounds/4_2.png', 719 * 2),
            new BackgroundObject('./img/4_backgrounds/1_3.png', 719 * 2),
            new BackgroundObject('./img/4_backgrounds/4_1.png', 719 * 2),

            new BackgroundObject('./img/4_backgrounds/1_5.png', 719 * 3),
            new BackgroundObject('./img/4_backgrounds/1_4.png', 719 * 3),
            new BackgroundObject('./img/4_backgrounds/sunset_decor.png', 719 * 3),
            new BackgroundObject('./img/4_backgrounds/4_3.png', 719 * 3),
            new BackgroundObject('./img/4_backgrounds/3_2.png', 719 * 3),
            new BackgroundObject('./img/4_backgrounds/1_2.png', 719 * 3),
            new BackgroundObject('./img/4_backgrounds/1_3.png', 719 * 3),
            new BackgroundObject('./img/4_backgrounds/4_1.png', 719 * 3),

            new BackgroundObject('./img/4_backgrounds/1_5.png', 719 * 4),
            new BackgroundObject('./img/4_backgrounds/1_4.png', 719 * 4),
            new BackgroundObject('./img/4_backgrounds/sunset_decor.png', 719 * 4),
            new BackgroundObject('./img/4_backgrounds/sunset_sun.png', 719 * 4),
            new BackgroundObject('./img/4_backgrounds/4_3.png', 719 * 4),
            new BackgroundObject('./img/4_backgrounds/day_decor.png', 719 * 4),
            new BackgroundObject('./img/4_backgrounds/1_3.png', 719 * 4),
            new BackgroundObject('./img/4_backgrounds/4_1.png', 719 * 4),
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
        ]

    )
}