class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_right_x = 719 * 4;
    level_end_left_x = -550;


    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}