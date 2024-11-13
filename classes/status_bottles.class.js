class StatusBottles extends DrawableObject {
    width = 200;
    height = 50;
    percentage = 0;

    status_bar_Array = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/100.png',
    ]

    constructor() {
        super();
        this.loadImages(this.status_bar_Array);
        this.x = 10;
        this.y = 80;
        this.setPercentage(this.percentage);       
    }
 
}