class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    character = new Character();
    endboss = new Endboss();
    level = level1;
    coins_status = new StatusCoin();
    healths_status = new StatusHealth();
    bottles_status = new StatusBottles();
    endboss_status = new StatusEndboss();
    throwablebottles = [];
    sound_mute = false;

    throwing_sound = new Audio('./audio/glass_shatter.mp3');



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    };

    /**
     * Sets the world property of the character object to the current instance of the World class.
     * @return {void} This function does not return anything.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Iterates through an array of objects and adds each object to the map.
     * @param {Array} objects - Array of objects to add to the map.
     * @return {void} This function does not return anything.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds an object to the map based on certain conditions.
     * @param {Object} mo - The object to be added to the map.
     * @return {void} This function does not return anything.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    /**
     * Draws the current state of the game world on the canvas.     *
     * This function clears the canvas, draws the sky, translates the canvas to the camera position,
     * adds objects from the current level to the map, adds throwable bottles to the map, adds the endboss
     * to the map, adds the character to the map, translates the canvas back to the original position,
     * adds the status bar, and adds the endboss status. It then recursively calls itself using requestAnimationFrame
     * to create an animation loop.     *
     * @return {void} This function does not return anything.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSky();
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsLevelClass();
        this.addToMap(this.endboss);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwablebottles);       
        this.ctx.restore();
        this.addStatusBar();
        this.addEndboss_Status();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draws the sky image on the canvas.     *
     * @return {void} This function does not return anything.
     */
    drawSky() {
        let img = new Image();
        img.src = './img/4_backgrounds/day_sky.png';
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Adds objects from different categories to the map based on the current level.+     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    addObjectsLevelClass() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * Adds the healths, coins, and bottles status to the map.+     *
     * @return {void} This function does not return anything.
     */
    addStatusBar() {
        this.addToMap(this.healths_status);
        this.addToMap(this.coins_status);
        this.addToMap(this.bottles_status);
    }

    /**
     * Checks the character's x position against the endboss x position to determine if the endboss status should be added to the map.+     *
     * @return {void} This function does not return anything.
     */
    addEndboss_Status() {
        if (this.character.x > (this.endboss.x - 720)) {
            this.addToMap(this.endboss_status);
        }
    }

    /**
    * Flips the image horizontally.+ *
    * @param {Object} mo - The image object to be flipped.
    * @return {void}
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverts the image flipping by restoring the canvas context.+     *
     * @param {type} mo - The object representing the image to be reverted.
     * @return {type} This function does not return anything.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Runs collision checks for enemies, endboss, coins, bottles, throw objects, and bottle collisions periodically.+     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    checkCollisions() {
        setInterval(() => {
            this.enemyCollision();
            this.endbossCollision();
            this.coinCollision();
            this.bottleCollision();
            this.checkThrowObject();
            this.checkBottleEndbossCollision();
            this.checkBottleEnemyCollision();
        }, 100);
    }

    /**
     * Runs collision checks for enemies and updates character's health status accordingly.+     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    enemyCollision() {
        this.level.enemies.forEach(enemy => {
            if (this.character.checkIfTouchOnTop(enemy)) {
                enemy.killZombie();
            } else if (this.character.checkIfTouch(enemy)) {
                if (enemy.enemyIsDead == false) {
                    this.character.hit();
                    this.healths_status.setPercentage(this.character.energy);
                }
            };
        });
    }

    /**
     * Checks collision with the end boss and updates character's health status if not dead.+     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    endbossCollision() {
        if (this.endboss.checkIfTouch(this.character)) {
            if (!this.character.isDead()) {
                this.character.hit();
                this.healths_status.setPercentage(this.character.energy);
            }
        }
    }

    /**
     * Checks for collision between the character and coins on the level. If a collision is detected and the character's win coin count is less than 100, 
    the coin's y position is set to 1000, the character's win coin count is incremented, and the coins status percentage is updated.+     *
     * @return {void} This function does not return anything.
     */
    coinCollision() {
        this.level.coins.forEach(coin => {
            if (this.character.checkIfTouch(coin) && (this.character.winCoin < 100)) {
                coin.y = 1000;
                this.character.addWinCoin();
                this.coins_status.setPercentage(this.character.winCoin);
            }
        });
    }

    /**
     * Checks for collision between the character and bottles on the level. If a collision is detected and the character's win bottle count is less than 100, 
     * the bottle's y position is set to 1000, the character's win bottle count is incremented, and the bottles status percentage is updated.     *
     * @return {void} This function does not return anything.
     */
    bottleCollision() {
        this.level.bottles.forEach(bottle => {
            if (this.character.checkIfTouch(bottle) && (this.character.winBottle < 100)) {
                bottle.y = 1000;
                this.character.addWinBottle();
                this.bottles_status.setPercentage(this.character.winBottle);
            };
        });
    }

    /**
     * Checks if the character is allowed to throw an object and creates a new bottle if so.
     * Pushes the new bottle into the throwablebottles array and updates the character's winBottle count.
     * Throws the bottle at the character's position and updates the bottles_status percentage.+     *
     * @return {void} This function does not return anything.
     */
    checkThrowObject() {
        if (this.keyboard.Down && this.character.winBottle > 0) {
            let bottle = new Bottle();
            this.throwablebottles.push(bottle);
            this.character.throwBottle();
            if (world.character.otherDirection) {
                bottle.throw(this.character.x + (this.character.width / 3), this.character.y + (this.character.height / 2), -20);
            } else {
                bottle.throw(this.character.x + (this.character.width / 3), this.character.y + (this.character.height / 2), 20);
            }
            this.bottles_status.setPercentage(this.character.isThrow());
        }
    }

    /**
     * Runs collision checks between thrown bottles and the end boss, updating status accordingly.+     *
     * @return {void} This function does not return anything.
     */
    checkBottleEndbossCollision() {
        this.throwablebottles.forEach(thrownBottle => {
            if (this.endboss.checkIfTouch(thrownBottle) && thrownBottle.isBroken == false) {
                thrownBottle.isBroken = true;
                this.endboss.bottleHit();
                this.endboss_status.setPercentage(this.endboss.energy);
                this.endboss.touched();
                if (!this.endboss.isDead()) {
                    this.endboss.dying();
                }
            }
        })
    }

    /**
     * Checks for collision between thrown bottles and enemies.+ *
     * @return {void}
     */
    checkBottleEnemyCollision() {
        this.throwablebottles.forEach(thrownBottle => {
            this.level.enemies.forEach(enemy => {
                if (enemy.checkIfBottleTouch(thrownBottle) && thrownBottle.isBroken == false) {
                    enemy.killZombie();
                }
            })
        })
    }


}