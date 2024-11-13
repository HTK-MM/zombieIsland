class Zombie extends MovableObject {
    height = 120;
    width = 60;
    y = 310;
    enemyIsDead = false;

    Images_Walking = [
        './img/2_enemies_zombie/1_walk/Walk1.png',
        './img/2_enemies_zombie/1_walk/Walk2.png',
        './img/2_enemies_zombie/1_walk/Walk3.png',
        './img/2_enemies_zombie/1_walk/Walk4.png',
        './img/2_enemies_zombie/1_walk/Walk5.png',
        './img/2_enemies_zombie/1_walk/Walk6.png'
    ];

    Images_Dead = [
        './img/2_enemies_zombie/2_dead/Dead1.png',
        './img/2_enemies_zombie/2_dead/Dead2.png',
        './img/2_enemies_zombie/2_dead/Dead3.png',
        './img/2_enemies_zombie/2_dead/Dead4.png',
        './img/2_enemies_zombie/2_dead/Dead5.png',
        './img/2_enemies_zombie/2_dead/Dead6.png',
        './img/2_enemies_zombie/2_dead/Dead7.png',
        './img/2_enemies_zombie/2_dead/Dead8.png',
    ]

    currentImage = Math.round(Math.random()*5);  
    zombieDying_sound = new Audio('./audio/zombieDying.mp3');


    constructor() {
        super().loadImage('./img/2_enemies_zombie/1_walk/Walk1.png');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);
        this.x = 700 + Math.random() * 3000;
        this.speed = 0.1 + Math.random() * 0.3;        
        this.enemyWalk();        
    }

    zombieWalk;
    /**
     * Executes the enemy's walking animation.+     *
     * This function sets up two intervals: one to move the enemy to the left at a constant speed,
     * and another to play the walking animation at a slower pace.+     *
     * @return {void} This function does not return anything.
     */
    enemyWalk() {
        setInterval (() =>{
            this.moveLeft();
        }, 1000 / 60);      
      this.zombieWalk =  setInterval(() => {
         this.playAnimation(this.Images_Walking);
        }, 500 );
    }

    /**
     * Kills the zombie and performs the necessary actions.+     *
     * @return {void} This function does not return anything.
     */
    killZombie() {
        clearInterval(this.zombieWalk );
        this.height = 60;
        this.width= 120;
        this.y = 370;
        this.loadImage('./img/2_enemies_zombie/2_dead/Dead7.png');       
        this.enemyIsDead = true;
        if(!this.isMuted){
            this.zombieDying_sound.play();}
        setTimeout(() => {
            this.y = 1000;
        }, 500);
    } 
} 