class Bottle extends MovableObject{
    width = 50;
    height = 64;
    speedY = 0;
    speedx = 0;   
    isBroken = false;

    Images_Throw = [
        './img/6_rum_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_rum_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_rum_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_rum_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    Images_Splash = [
        './img/6_rum_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_rum_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_rum_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_rum_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_rum_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_rum_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(){
        super().loadImage('./img/6_rum_bottle/bottle.png');
        this.loadImages(this.Images_Throw);
        this.loadImages(this.Images_Splash);
        this.x = 400 + Math.random() * 719 * 3.5;
        this.y = 360 + Math.random()* 50;
    }

    /**
     * Function to throw the bottle to a specified location.
     * @param {number} x - The x-coordinate where the bottle will be thrown.
     * @param {number} y - The y-coordinate where the bottle will be thrown.
     */
    throw(x, y, speedx){
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.speedx = speedx;
        this.applyGravitiy();
        setInterval(() => {
            this.x += this.speedx;
            this.playAnimation(this.Images_Throw);
            setTimeout(() => {
                this.playAnimation(this.Images_Splash);
            }, 800);           
        }, 60);
    }
}