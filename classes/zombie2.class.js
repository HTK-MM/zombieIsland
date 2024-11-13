class Zombie2 extends MovableObject{
    height = 80;
    width = 40;
    y = 350;   
    enemyIsDead = false;
    zombiewalk;

    Images_Walking = [
        './img/2_enemies_zombie/zombie2/1_walk/Walk1.png',
        './img/2_enemies_zombie/zombie2/1_walk/Walk2.png',
        './img/2_enemies_zombie/zombie2/1_walk/Walk3.png',
        './img/2_enemies_zombie/zombie2/1_walk/Walk4.png',
        './img/2_enemies_zombie/zombie2/1_walk/Walk5.png',
        './img/2_enemies_zombie/zombie2/1_walk/Walk6.png',
    ];
    Images_Dead = [
        './img/2_enemies_zombie/zombie2/2_dead/Dead1.png',
        './img/2_enemies_zombie/zombie2/2_dead/Dead2.png',
        './img/2_enemies_zombie/zombie2/2_dead/Dead3.png',
        './img/2_enemies_zombie/zombie2/2_dead/Dead4.png',
        './img/2_enemies_zombie/zombie2/2_dead/Dead5.png',
        './img/2_enemies_zombie/zombie2/2_dead/Dead6.png',
        './img/2_enemies_zombie/zombie2/2_dead/Dead7.png',
        './img/2_enemies_zombie/zombie2/2_dead/Dead8.png',
    ];

    currentImage = 0;
    zombieDying_sound = new Audio('./audio/zombieDying.mp3');

    constructor() {
        super().loadImage('./img/2_enemies_zombie/zombie2/1_walk/Walk1.png');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);
        this.x = 500 + Math.random() * 5000;
        this.speed = 0.08 + Math.random() * 0.25;
        this.animate();
    }

  
    /**
     * A method that handles the animation of the zombie.+     *
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.zombiewalk = setInterval(() => {
            this.playAnimation(this.Images_Walking);
        }, 500);
    }

    /**
     * Kills the zombie and performs the necessary actions.+     * 
     * @return {void} This function does not return anything.
     */
    killZombie() {
        clearInterval(this.zombiewalk);
        this.height = 40;
        this.width = 80;
        this.y = 390;
        this.loadImage('./img/2_enemies_zombie/zombie2/2_dead/Dead7.png');        
        this.enemyIsDead = true;
        if(!this.isMuted){
        this.zombieDying_sound.play();}
        setTimeout(() => {
            this.y = 1000;
        }, 500);
    }

}