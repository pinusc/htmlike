var greeny = new Image(), princess = new Image();
greeny.src = '/static/game/greeny.png';
princess.src = '/static/game/princess.png';

var entitiesL = [new Entity(greeny), new Entity(princess)];

function Entity(image){
    if (image instanceof Image){
        this.image = image;
    } else {
        this.image = new Image()
        this.image.src = image;
    }
    this.posy = 0;
    this.posx = 0;
};

Entity.prototype.move = function(x, y) {
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

Entity.prototype.getRelativeCoordinate = function() {
    var p = entitiesL[0]; //the player
    var px = p.posx, py = p.posy;
    return [(ox + this.posx - px) * gdim, (oy + this.posy - py) * gdim];
}

Entity.prototype.render = function() {
    var coord = this.getRelativeCoordinate();
    var x = coord[0];
    var y = coord[1];
    if (this.image.naturalHeight > gdim) { // If image is 2 tiles high
        y -= gdim;  // So that bottom of image corresponds to tile
    }
    context.drawImage(this.image, x, y);
}

Entity.prototype.act = function() {
    /** This is going to be the AI of the entity.
    * For now, it's simply "chase the player" using a very naive algorithm
    */
    var x = this.posx, y = this.posy;
    var px = entitiesL[0].posx, py = entitiesL[0].posy;  // player position
    var xdiff = Math.abs(x - px), ydiff = Math.abs(y - py);
    if(xdiff > ydiff) {
        if(px > x){  // the player is right
            x++;
        } else {
            x--;
        }
    } else {
        if(py > y) {  // the player is down
            y++;
        } else {
            y--;
        }
    }
    this.move(x, y);
}
