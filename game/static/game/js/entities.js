var greeny = new Image(), princess = new Image();
greeny.src = '/static/game/assets/greeny.png';
princess.src = '/static/game/assets/princess.png';

var entitiesL = [new Entity(princess)];
var player = Player(greeny);

function Entity(image){
    if (image instanceof Image){
        this.image = image;
    } else {
        this.image = new Image()
        this.image.src = image;
    }
    this.posy = 0;
    this.posx = 0;
    this.hp = 10;
    this.maxhp = this.hp;
};

Entity.prototype.move = function(x, y) {
    /**
    * Checks if anything is blocking at position (x, y), tiles or entities or
    * player. If not, moves there. If an entity is blocking, attack it
    */
    //If X and Y are in the margins
    if( !(x >= 0 &&
        x < m.level[0].length &&
        y >= 0 &&
        y < m.level[0][0].length)){

        return;
    } else if((window.m.level[1][x][y] && window.m.level[1][x][y].block) ||
              (window.m.level[0][x][y] && window.m.level[0][x][y].block)){  // there isn't any blocking tile
        return;
    }
    for(var i = 0; i < entitiesL.length; i++){  // Check if any entity is blocking the way
        if (entitiesL[i].posx === x && entitiesL[i].posy === y){
            return this.attack(entitiesL[i]);
        }
    }
    if(player.posx === x && player.posy === y) return this.attack(player);  // Check if player is blocking
    this.posx = x;
    this.posy = y;
};

Entity.prototype.getRelativeCoordinate = function() { //the player
    /**
    * Returns coordinates relative to the player
    * use din render() for rendering entities in the right place
    */
    var px = player.posx, py = player.posy;
    return [(ox + this.posx - px) * gdim, (oy + this.posy - py) * gdim];
}

Entity.prototype.render = function() {
    /**
    * draws the entity on a canvas, using the relative coordinate given by
    * getRelativeCoordinate()
    */
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
    * If the entity bumps in the player, it attack it (implemented in move())
    */
    var x = this.posx, y = this.posy;
    var px = player.posx, py = player.posy;
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

Entity.prototype.attack = function(enemy) {
    /**
    * Randomly attack the given enemy.
    * For now, there's an hardcoded 30% chace to hit.
    */
    if(this.isPlayer){
        console.log("Player HP: " + this.hp);
    } else {
        console.log("Entity HP: " + this.hp);
    }
    if(Math.random() < 0.3) {// 33% probability, TODO remove hardcode
        enemy.damage(1);
    }
}

Entity.prototype.damage = function(damage) {
    /**
    * Handle damage subtracting it from hp, if after damage the entity goes
    * less than or equal 0hp, it dies.
    */
    this.hp -= damage;
    if (this.hp <= 0){
        this.die();
    }
}

Entity.prototype.heal = function(heal){
    /**
    * Handle heal, adding it to the hp if it doesn't exceed the maxhp
    */
    this.hp += heal;
    if (this.hp > this.maxhp){
        this.hp = this.maxhp;
    }
    console.log("Player HP: " + this.hp);
}

Entity.prototype.die = function() {
    /**
    * Handle the death of the entity by removing it from entitiesL
    */
    entitiesL.splice(entitiesL.indexOf(this), 1);
}
