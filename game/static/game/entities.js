var greeny = new Image(), princess = new Image();
greeny.src = '/static/game/greeny.png';
princess.src = '/static/game/princess.png';

var entitiesL = [new Entity(greeny)];

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
Entity.prototype.render = function() {
    var coord = this.getRelativeCoordinate();
    var x = coord[0];
    var y = coord[1];
    console.log(this.image.naturalHeight)
    if (this.image.naturalHeight > gdim) { // If image is 2 tiles high
        y -= gdim;  // So that bottom of image corresponds to tile
    }
    context.drawImage(this.image, x, y);
}
