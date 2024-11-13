class StatusCoin extends DrawableObject{
    width = 200;
    height= 50;   
    percentage = 0;

    status_bar_Array = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/100.png',
    ]


    constructor() {
        super();
        this.loadImages(this.status_bar_Array);
        this.x = 10;
        this.y = 40;
        this.setPercentage(this.percentage);
       
    }
 
}
