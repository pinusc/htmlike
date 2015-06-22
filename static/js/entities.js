/**
* Any living (or moving) object is an Entity.
* Attributes:
* int hp;
* int posx, posy;
* Phaser.Sprite() image;
* int maxhp;
*/
function Entity(image, x, y){
    Thing.call(this, image, x, y);
    this.hp = 10;
    this.maxhp = this.hp;
    this.isEntity = true;
    this.render();
    this.speed = 10;
}
Entity.prototype = Thing.prototype; // let Entity subclass Thing

Entity.prototype.move = function(x, y) {
    /**
    * Checks if anything is blocking at position (x, y), tiles or entities or
    * player. If not, moves there. If an entity is blocking, attacks it
    */
    //If X and Y are in the margins
    if(!(x >= 0 &&
        x < box.m.level[0].width &&  // comparing using 0 level since it should be the larger
        y >= 0 &&
        y < box.m.level[0].height)){

        return;
    } else if(box.m.map.getTile(x, y, 1)){
        return;
    }

    /* Check if any entity is blocking the way */
    for(var i = 0; i < box.m.entitiesL.length; i++){
        if (box.m.entitiesL[i].posx === x && box.m.entitiesL[i].posy === y){
            return this.attack(box.m.entitiesL[i]);
        }
    }

    /* Check if player is blocking. If True, attack it */
    if (! this.isPlayer && box.m.player.posx === x && box.m.player.posy === y) return this.attack(box.m.player);

    this.posx = x;
    this.posy = y;

    this.render();
};


Entity.prototype.act = function() {
    /**
    * This is going to be the AI of the entity.
    * For now, it's simply "chase the player" using a very naive algorithm
    * If the entity bumps in the player, it attack it (implemented in move())
    */
    var x = this.posx, y = this.posy;
    var curr = box.m.DKMap[x][y], coor = {x: x, y: y};
    for(var i = x-1; i <= x+1; i++){
        for(var j = y-1; j <= y+1; j++){
            if(box.m.DKMap[i][j] >= 0 && box.m.DKMap[i][j] < curr){
                curr = box.m.DKMap[i][j];
                coor = {x: i, y: j};
            }
        }
    }

    this.move(coor.x, coor.y);
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

Entity.prototype.interact = function(direction){
    var toInteractX = this.posx, toInteractY = this.posy;
    switch(direction){
        case "up":
            toInteractY -= 1;
            break;
        case "down":
            toInteractY += 1;
            break;
        case "left":
            toInteractX -= 1;
            break;
        case "right":
            toInteractX += 1;
            break;
    }
    var en = _.find(box.m.entitiesL, function(en) {
        return en.posx === toInteractX && en.posy === toInteractY;
    })
    if (en){
        this.attack(en);
    }
}