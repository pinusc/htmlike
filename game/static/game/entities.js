var greeny = new Image(), grass = new Image(), dirt = new Image();
greeny.src = '/static/game/greeny.png';
grass.src = '/static/game/grass.png';
dirt.src = '/static/game/dirt.png';

var entitiesL = [greeny];

var entities = {
    move: function(x, y) {
        console.log(x + " : " + y)
        if(!window.level[1][x][y]){
            posx = x;
            posy = y;
        }
    }
}
