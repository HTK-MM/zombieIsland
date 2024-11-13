class StatusEndboss extends DrawableObject {
    width = 200;
    height = 50;
    percentage = 100;
    status_bar_Array = [
        './img/7_statusbars/2_statusbar_endboss/boss_0.png',
        './img/7_statusbars/2_statusbar_endboss/boss_20.png',
        './img/7_statusbars/2_statusbar_endboss/boss_40.png',
        './img/7_statusbars/2_statusbar_endboss/boss_60.png',
        './img/7_statusbars/2_statusbar_endboss/boss_80.png',
        './img/7_statusbars/2_statusbar_endboss/boss_100.png',
    ]

    constructor() {
        super();
        this.loadImages(this.status_bar_Array);
        this.x = 450;
        this.y = 0;
        this.setPercentage(this.percentage);
    }

}
