class DrawableObject {
    x = 0;
    y = 300;
    height = 150;
    width = 100;
    img;
    imageCache = {};   
    status_bar_Array=[];

    /**
     * Loads an image from the specified path and assigns it to the `img` property of the current object.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths and stores them in the image cache.
     * @param {Array<string>} imgArray - An array of paths to the images to be loaded.
     * @return {void} This function does not return anything.
     */
    loadImages(imgArray) {
        imgArray.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

/**
 * Draws the image on the canvas at the specified position and size.
 * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
 * @return {void} This function does not return a value.
 */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Sets the percentage of the DrawableObject and updates the image accordingly.
     * @param {number} percentage - The percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.resolveImageIndex(percentage);
        this.img = this.imageCache[path];
    }

    /**
     * Calculates the image index based on the provided percentage.
     * @param {number} percentage - The percentage value to calculate the image index.
     * @return {type} The value from the status_bar_Array corresponding to the calculated index.
     */
    resolveImageIndex(percentage) {    
        this.percentage = percentage;    
        let currentImgIndex = Math.floor(this.percentage / 20);
        return this.status_bar_Array[currentImgIndex];
    }

}