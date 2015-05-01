var greeny = new Image(), princess = new Image();
greeny.src = '/static/game/greeny.png';
princess.src = '/static/game/princess.png';

var entitiesL = [new entity(greeny)];

function entity(image){
    if (image instanceof Image){
        this.image = image;
    } else {
        this.image = new Image()
        this.image.src = image;
    }
    this.posy = 0;
    this.posx = 0;
};

entity.prototype.move = function(x, y) {
    //If X and Y are in the margins
    if( x >= 0 &&
        x < m.level[0].length &&
        y >= 0 &&
        y < m.level[0][0].length){
        if(!window.m.level[1][x][y]){
            this.posx = x;
            this.posy = y;
        }
    }
};
