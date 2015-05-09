function Entity(image, x, y){
    x = x || 0;
    y = y || 0;
    this.image = game.add.sprite(0, 0, image);
    this.posy = y;
    this.posx = x;
    this.hp = 10;
    this.maxhp = this.hp;

    this.render();
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
    for(var i = 0; i < m.entitiesL.length; i++){  // Check if any entity is blocking the way
        if (m.entitiesL[i].posx === x && m.entitiesL[i].posy === y){
            return this.attack(m.entitiesL[i]);
        }
    }
    if(this.isPlayer){

    } else if (player.posx === x && player.posy === y) return this.attack(player);  // Check if player is blocking

    this.posx = x;
    this.posy = y;

    this.render();
};

Entity.prototype.render = function() {
    /**
    * Sets the image coordinates on canvas;
    *
    */
    var x = this.posx * gdim;
    var y = this.posy * gdim;
    if (this.image.height > gdim) { // If image is 2 tiles high
        y -= gdim;  // So that bottom of image corresponds to tile
    }
    this.image.x = x;
    this.image.y = y;

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
    m.entitiesL.splice(m.entitiesL.indexOf(this), 1);
    this.image.destroy(true);
}
