var greeny = new Image(), grass = new Image(), dirt = new Image();
greeny.src = '/static/game/greeny.png';
grass.src = '/static/game/grass.png';
dirt.src = '/static/game/dirt.png';

var entitiesL = [new entity(greeny)];

function entity(img){
    this.posy = 0;
    this.posx = 0;
    this.image = img;
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
