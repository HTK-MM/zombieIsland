class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    currentImage = 0;
    winBottle = 0;
    winCoin = 0
    isDying = false;
    isMuted = false;


    /**
     * Plays animation based on the provided images.
     * @param {Array} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        this.currentImage = this.currentImage % images.length;
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Applies gravity to the object, causing it to fall towards the ground.
     * This function is called every 1/25 of a second until the object is either on the ground or not moving upwards.
     * @return {void} This function does not return anything.
     */
    applyGravitiy() {
        setInterval(() => {
            if (this.isAboutGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


/**
 * Determines if the object is about to touch the ground.
 * @return {boolean} Returns true if the object is a Bottle or its y-coordinate is less than 180.
 */
    isAboutGround() {
        if (this instanceof Bottle) {
            return true;
        } else {
            return this.y < 180;
        }
    }

/**
 * Moves the object to the right by a specified speed.
 * @return {void} This function does not return a value.
 */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by the specified speed.
     * @return {void} This function does not return a value.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Sets the vertical speed of the object to 30.
     * @return {void} This function does not return a value.
     */
    moveSpace() {
        this.speedY = 30;
    }

    /**
     * Checks if the current object intersects with another object.
     * @param {Object} mo - The object to check intersection with.
     * @return {boolean} Returns true if the objects intersect, false otherwise.
     */
    checkIfTouch(mo) {
        return ((this.x + 30) + (this.width - 130)) > mo.x &&
            (this.x + 30) < (mo.x + mo.width) &&
            ((this.y + 70) + (this.height - 90)) > mo.y &&
            (this.y + 70) < (mo.y + mo.height)
    } 

    /**
     * Checks if the current object is touching another object on top.
     * @param {Object} mo - The object to check intersection with.
     * @return {boolean} Returns true if the current object is touching the other object on top, false otherwise.
     */
    checkIfTouchOnTop(mo) {
        return ((this.x + 30) + (this.width - 130)) > (mo.x + 10) &&
            (this.x + 40) < (mo.x + mo.width) &&
            (this.y + this.height) > (mo.y - 30) &&
            (this.y + this.height) < (mo.y + mo.height) &&
            (this.speedY < 0) && (this.isAboutGround());
    }

    /**
     * Checks if the current object intersects with a bottle object.
     * @param {Object} mo - The bottle object to check intersection with.
     * @return {boolean} Returns true if the objects intersect, false otherwise.
     */
    checkIfBottleTouch(mo) {
        return ((this.x) + (this.width)) > mo.x &&
            (this.x) < (mo.x + mo.width) &&
            ((this.y) + (this.height)) > mo.y &&
            (this.y) < (mo.y + mo.height)
    }
    /**
     * Subtracts 2 from the energy property. If energy becomes negative, sets it to 0. Otherwise, updates the lastHit property with the current timestamp.
     * @return {void} This function does not return a value.
     */
    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    /**
     * Subtracts 25 from the energy property. If energy becomes negative, sets it to 0.
     * @return {void}
     */
    bottleHit() {
        this.energy -= 25;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    /**
     * Checks if the object has been hurt recently within the last second.
     * @return {boolean} Returns true if the object has been hurt within the last second, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object's energy level is zero, indicating the object is dead.
     * @return {boolean} Returns true if the object's energy is zero, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Increments the win coin by 10 and caps it at 100.
     * @return {void} This function does not return a value.
     */
    addWinCoin() {
        this.winCoin += 10;
        if (this.winCoin > 100) {
            this.winCoin = 100;
        }
    }
    /**
     * Increases the winBottle property by 20 and caps it at 100.
     * @return {void} This function does not return a value.
     */
    addWinBottle() {
        this.winBottle += 20;
        if (this.winBottle > 100) {
            this.winBottle = 100;
        }
    }

    /**
     * Checks if the object can throw a bottle and returns the updated winBottle value.
     * @return {number} The updated winBottle value after subtracting 20.
     */
    isThrow() {
        return this.winBottle -= 20;
    }

    /**
     * Sets the object to a dying state for 2 seconds before returning to normal.
     * @return {void} This function does not return a value.
     */
    dying() {
        this.isDying = true;        
        setTimeout(() => {
            this.isDying = false;          
        }, 2000);
    }
}
 
