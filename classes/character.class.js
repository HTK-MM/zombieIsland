class Character extends MovableObject {
    height = 280;
    width = 280;   
    y = 180;
    speed = 10;
    world;
    isThrowing = false;

    Images_Idle = [
        './img/1_character_pirat/1_idle/I-0.png',
        './img/1_character_pirat/1_idle/I-1.png',
        './img/1_character_pirat/1_idle/I-2.png',
        './img/1_character_pirat/1_idle/I-3.png',
        './img/1_character_pirat/1_idle/I-4.png',
        './img/1_character_pirat/1_idle/I-5.png',
        './img/1_character_pirat/1_idle/I-6.png',
    ]

    Images_Walking = [
        './img/1_character_pirat/2_walk/W-0.png',
        './img/1_character_pirat/2_walk/W-1.png',
        './img/1_character_pirat/2_walk/W-2.png',
        './img/1_character_pirat/2_walk/W-3.png',
        './img/1_character_pirat/2_walk/W-4.png',
        './img/1_character_pirat/2_walk/W-5.png',
        './img/1_character_pirat/2_walk/W-6.png',
    ];

    Images_Jumping = [
        './img/1_character_pirat/4_jump/J-0.png',
        './img/1_character_pirat/4_jump/J-1.png',
        './img/1_character_pirat/4_jump/J-2.png',
        './img/1_character_pirat/4_jump/J-3.png',
        './img/1_character_pirat/4_jump/J-4.png',
        './img/1_character_pirat/4_jump/J-5.png',
        './img/1_character_pirat/4_jump/J-6.png',
    ];

    Images_Hurt = [
        './img/1_character_pirat/6_hurt/H-0.png',
        './img/1_character_pirat/6_hurt/H-1.png',
        './img/1_character_pirat/6_hurt/H-2.png',
        './img/1_character_pirat/6_hurt/H-3.png',
        './img/1_character_pirat/6_hurt/H-4.png',
        './img/1_character_pirat/6_hurt/H-5.png',
        './img/1_character_pirat/6_hurt/H-6.png',
    ];

    Images_Dead = [
        './img/1_character_pirat/7_dead/D-0.png',
        './img/1_character_pirat/7_dead/D-1.png',
        './img/1_character_pirat/7_dead/D-2.png',
        './img/1_character_pirat/7_dead/D-3.png',
        './img/1_character_pirat/7_dead/D-4.png',
        './img/1_character_pirat/7_dead/D-5.png',
        './img/1_character_pirat/7_dead/D-6.png',
    ]


    currentImage = 0;
    walking_sound = new Audio('./audio/walking_at_the_beach.mp3');
    jumping_sound = new Audio('./audio/jump.mp3');
    throwing_sound = new Audio('./audio/glass_shatter.mp3')

   
    constructor() {
        super().loadImage('./img/1_character_pirat/1_idle/I-0.png');
        this.loadImages(this.Images_Idle);
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Jumping);
        this.loadImages(this.Images_Hurt);
        this.loadImages(this.Images_Dead);
        this.characterWalk();
        this.applyGravitiy();
        this.jump();
        this.throwBottle();
    }

    /**
     * Sets intervals for character movement actions and changes the animation.   
     */
    characterWalk() {
        setInterval(() => {            
            this.walking_sound.pause();
            this.characterMoveRight();
            this.characterMoveLeft();
            this.characterThrow();
            this.world.camera_x = -this.x + 140;
        }, 1000 / 60);
        this.animationChange();
    }

    /**
     * Moves the character to the right if the right arrow key is pressed and the character is within the level boundaries.
     * @return {void}
     */
    characterMoveRight() {
        if (this.world.keyboard.Right && this.x < level1.level_end_right_x) {
            this.moveRight();
            this.otherDirection = false;
            if (!this.world.sound_mute) {
                this.walking_sound.play();
            }
        };
    }

    /**
     * Moves the character to the left if the left arrow key is pressed and the character is within the level boundaries.
     * @return {void}
     */
    characterMoveLeft() {
        if (this.world.keyboard.Left && this.x > level1.level_end_left_x) {
            this.moveLeft();
            this.otherDirection = true;
            if (!this.world.sound_mute) {
                this.walking_sound.play();
            }
        };
    }

    /**
     * Throws a projectile if the down arrow key is pressed and the character is currently throwing.
     * @param {void} -
     * @return {void} -
     */
    characterThrow() {
        if (this.world.keyboard.Down && this.isThrowing) {
            if (!this.world.sound_mute) {
                this.throwing_sound.play();
            }
        };
    }
/**
 * Changes the animation of the character based on its state.
 * @return {void}
 */
    animationChange() {
        setInterval(() => {
            if (this.isDying) {
                this.playAnimation(this.Images_Dead);
            } else if (this.isDead()) {
                this.loadImage('./img/1_character_pirat/7_dead/D-6.png');
                this.speed = 0;
            } else if (this.isHurt()) {
                this.playAnimation(this.Images_Hurt);
            } else if (this.isAboutGround()) {
                this.playAnimation(this.Images_Jumping);
            } else {
                this.imgs_AnimationIdleMoveThrow();
            }
        }, 150);
    }

    /**
     * Changes the animation of the character based on its state.
     * If the character is throwing, it loads the image './img/1_character_pirat/5-attack/A-3.png'.
     * If the character is moving to the right or left, it plays the walking animation.
     * If the character is not doing anything, it plays the idle animation.
     * @return {void}
     */
    imgs_AnimationIdleMoveThrow() {
        if (this.isThrowing) {
            this.loadImage('./img/1_character_pirat/5-attack/A-3.png');
        } else if (this.world.keyboard.Right || this.world.keyboard.Left) {
            this.playAnimation(this.Images_Walking);
        } else {
            this.playAnimation(this.Images_Idle);
        }
    }

    /**
     * Sets up an interval for the character to jump based on keyboard input and game state.
     * @return {void} -
     */
    jump() {
        setInterval(() => {
            this.jumping_sound.pause();
            if (this.world.keyboard.Space && !this.isAboutGround()) {
                this.moveSpace();
                if (!this.world.sound_mute) {
                    this.jumping_sound.play();
                }
            }
        }, 1000 / 60);
    }

    /**
     * Sets the character to throw a bottle and then resets the throwing state after 500ms.
     * @return {void} -
     */
    throwBottle() {
        this.isThrowing = true;
        setTimeout(() => {
            this.isThrowing = false;
        }, 500);
    }

}