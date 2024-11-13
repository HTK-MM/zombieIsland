class StatusHealth extends DrawableObject {
    width = 200;
    height = 50;
    percentage = 100;

    status_bar_Array = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/100.png',
    ]


    constructor() {
        super();
        this.loadImages(this.status_bar_Array);
        this.x = 10;
        this.y = 0;
        this.setPercentage(this.percentage);

    }

}