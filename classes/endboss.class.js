class Endboss extends MovableObject {
    height = 350;
    width = 200;
    y = 90;
    isTouched = false;


    Images_Walking = [
        './img/3_enemy_boss/walk/Walk1.png',
        './img/3_enemy_boss/walk/Walk2.png',
        './img/3_enemy_boss/walk/Walk3.png',
        './img/3_enemy_boss/walk/Walk4.png',
        './img/3_enemy_boss/walk/Walk5.png',
        './img/3_enemy_boss/walk/Walk6.png',
    ]

    Images_Hurt = [
        './img/3_enemy_boss/hurt/Hurt1.png',
        './img/3_enemy_boss/hurt/Hurt2.png',
        './img/3_enemy_boss/hurt/Hurt3.png',
        './img/3_enemy_boss/hurt/Hurt4.png',
        './img/3_enemy_boss/hurt/Hurt5.png',
    ]

    Images_Dead = [
        './img/3_enemy_boss/dead/Dead1.png',
        './img/3_enemy_boss/dead/Dead2.png',
        './img/3_enemy_boss/dead/Dead3.png',
        './img/3_enemy_boss/dead/Dead4.png',
        './img/3_enemy_boss/dead/Dead5.png',
        './img/3_enemy_boss/dead/Dead6.png',
        './img/3_enemy_boss/dead/Dead7.png',
        './img/3_enemy_boss/dead/Dead8.png',
    ]

    Images_Attack = [
        './img/3_enemy_boss/attackt/Attack1.png',
        './img/3_enemy_boss/attackt/Attack2.png',
        './img/3_enemy_boss/attackt/Attack3.png',
        './img/3_enemy_boss/attackt/Attack4.png',
        './img/3_enemy_boss/attackt/Attack5.png',
        './img/3_enemy_boss/attackt/Attack6.png',
    ];
    currentImage = 0;
    endbossDying_sound = new Audio('./audio/endbossDying.mp3');

    
    constructor() {
        super().loadImage('./img/3_enemy_boss/walk/Walk1.png');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Attack);
        this.loadImages(this.Images_Hurt);
        this.loadImages(this.Images_Dead);
        this.x = 350 + 719 * 4;
        this.speed = 0.08 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Method to animate the end boss movement.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animationChange();
    }

    /**
     * Method to change the animation based on the state of the end boss.
     */
    animationChange() {
        setInterval(() => {
            this.endbossDying_sound.pause();
            if (this.isDying) {
                this.playAnimation(this.Images_Dead);
            } else if (this.isDead()) {
                this.endbossIsKilled();
            } else if (this.isTouched) {
                this.playAnimation(this.Images_Hurt);
            } else {
                this.playAnimation(this.Images_Walking);
            }
        }, 180)
    };

    /**
     * Kills the end boss.
     * @return {void} No return value.
     */
    endbossIsKilled() {
        this.width = 350;
        this.height = 200;
        this.y = 240;
        this.speed = 0;
        this.loadImage('./img/3_enemy_boss/dead/Dead8.png');
        if (!this.isMuted) {
            this.endbossDying_sound.play();
        }
    }

    /**
     * Marks the end boss as touched, adjusts height, y position, and speed, then resets touch after a delay.
     * @return {void} No return value.
     */
    touched() {
        this.isTouched = true;
        this.height -= 30;
        this.y += 30;
        this.speed += 1;
        setTimeout(() => {
            this.isTouched = false;
        }, 200);
    }

} 