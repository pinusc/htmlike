function Entity(image, x, y){
    /**
    * Any living (or moving) object is an Entity.
    * Attributes:
    * int hp;
    * int posx, posy;
    * Phaser.Sprite() image;
    * int maxhp;
    */
    x = x || 0;
    y = y || 0;
    this.image = game.add.sprite(0, 0, image);
    this.posy = y;
    this.posx = x;
    this.hp = 10;
    this.maxhp = this.hp;

    this.isEntity = true;

    this.render();
}

Entity.prototype.move = function(x, y) {
    /**
    * Checks if anything is blocking at position (x, y), tiles or entities or
    * player. If not, moves there. If an entity is blocking, attacks it
    */
    //If X and Y are in the margins
    if(!(x >= 0 &&
        x < m.level[0].width &&  // comparing using 0 level since it should be the larger
        y >= 0 &&
        y < m.level[0].height)){

        return;
    } else if(m.map.getTile(x, y, 1)){
        return;
    }

    /* Check if any entity is blocking the way */
    for(var i = 0; i < m.entitiesL.length; i++){
        if (m.entitiesL[i].posx === x && m.entitiesL[i].posy === y){
            return this.attack(m.entitiesL[i]);
        }
    }

    /* Check if player is blocking. If True, attack it */
    if (! this.isPlayer && player.posx === x && player.posy === y) return this.attack(player);

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

};

Entity.prototype.act = function() {
    /**
    * This is going to be the AI of the entity.
    * For now, it's simply "chase the player" using a very naive algorithm
    * If the entity bumps in the player, it attack it (implemented in move())
    */
    if (this.distance(m.player) > 4){  // the player is too far, do nothing
        this.setVisible(false);
        return;
    }

    this.setVisible(true);
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
};

Entity.prototype.attack = function(enemy) {
    /**
    * Randomly attack the given enemy.
    * For now, there's an hardcoded 30% chace to hit.
    */
    if(Math.random() < 0.3) {// 33% probability, TODO remove hardcode
        enemy.damage(1);
    }
};

Entity.prototype.damage = function(damage) {
    /**
    * Handle damage subtracting it from hp, if after damage the entity goes
    * less than or equal 0hp, it dies.
    */
    this.hp -= damage;
    if (this.hp <= 0){
        this.die();
    }
};

Entity.prototype.heal = function(heal){
    /**
    * Handle heal, adding it to the hp if it doesn't exceed the maxhp
    */
    this.hp += heal;
    if (this.hp > this.maxhp){
        this.hp = this.maxhp;
    }
}

Entity.prototype.die = function() {
    /**
    * Handle the death of the entity by removing it from entitiesL
    * and telling Phaser not to render it anymore
    */
    m.entitiesL.splice(m.entitiesL.indexOf(this), 1);
    this.image.destroy(true);
};


/**
 * Calculates the distance from an entity or an array of coordinates
 * @param  {Entity} coordinates [The entity to which calculate the distance from]
 * @param  {Array} coordinates [The pair of [x, y] coordinates to which calculate the distance from]
 * @return {[type]}             [description]
 */
Entity.prototype.distance = function(coordinates) {
    if (coordinates.isEntity || coordinates.isPlayer){
        // ectract coordinates from entity
        coordinates = [coordinates.posx, coordinates.posy]
    }
    var x = this.posx;
    var y = this.posy;
    var x1 = coordinates[0];
    var y1 = coordinates[1];
    var difx = x - x1;
    var dify = y - y1;
    var dist = Math.sqrt(difx * difx + dify * dify);
    return dist;
}

/**
 * This sets the "visible" property of the entity sprite
 * @param {bool} val [the value to set "visible" at]
 */
Entity.prototype.setVisible = function(val){
    this.image.visible = val;
}