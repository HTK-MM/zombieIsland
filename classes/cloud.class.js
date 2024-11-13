class Cloud extends MovableObject {
    y = 10;
    height = 250;
    width = 500;
   
    constructor(imgPath,x) {
        super().loadImage(imgPath);
        this.x = x;
        this.animate();
    }

    /**
     * Animates the object by moving it left at a set interval.
     * @return {void} 
     */
    animate() {  setInterval (() =>{
        this.moveLeft();
    }, 1000 / 60);
    }
}
