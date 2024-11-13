class Coin extends MovableObject {
    width = 40;
    height = 40;

    
    constructor() {
        super().loadImage('./img/5_coin/coin_1.png');
        this.x = 50 + Math.random() * 719 * 4;
        this.y = 50 + Math.random() * 200;
    }
}