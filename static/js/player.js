function Player(image){
    Entity.call(this, image, 10, 10);
    /**
    * A player isn't an entity like other... but in the core, he is.
    * Returns a modified entity.
    */

    this.hp = 20;  // player is STRONGER! TODO remove hardcode
    this.maxhp = 20;
    this.isPlayer = true;
    this.hearts = [];
    this.inventory = [];
    this.alignHearts();

    this.pixelSpeed = box.properties.globSpeed;  // pixel / second
    game.physics.p2.enable(this.image);
    this.image.body.setZeroDamping();
    this.image.body.fixedRotation = true;
}

Player.prototype = Object.create(Entity.prototype, {});

Player.prototype.addToInventory = function(item){
    this.inventory.push(item);
};


Player.prototype.getItemOnGround = function(){
    //all the items which coordinates are the same as the player
    var to_add = _.filter(m.itemsL, function(item) {return item.posx === this.posx && item.posy === this.posy; }, this);
    m.itemsL = _.filter(m.itemsL, function(item) {return item.posx !== this.posx || item.posy !== this.posy; }, this);
    // TODO optimize
    _.each(to_add, function(it){
        this.addToInventory(it);
        it.setVisible(false);
    }, this);
};

Player.prototype.constructor = Player;

Player.prototype.oldHeal = Player.prototype.heal;
Player.prototype.heal = function(n) {
    this.oldHeal(n);
    this.alignHearts();
};

Player.prototype.oldDamage = Player.prototype.damage;

/** 
 * Decorated definition of damage, this will also set the correct number of hearts
 * @param int n the amount of HP to loss
 * @return undefined
 */
Player.prototype.damage = function(n) {
    this.oldDamage(n);
    this.alignHearts();
};

/**
 * Sets the correct number of hearts
 * For example, if player has 20hp, 4 hearts are displayed. If he has 18hp, 3 hearts are displayed.
 * @return undefined
 */
Player.prototype.alignHearts = function(){
    var nh = Math.floor(this.hp / 5); // number of hearths
    var nh_now = this.hearts.length;
    if (nh < nh_now){
        for(var i = 0; i < nh_now - nh; i++){
            this.hearts.pop().destroy(true);
        }
    } else if (nh > nh_now){
        for(var i = 0; i < nh - nh_now; i++){
            this.hearts.push(game.add.sprite(game.width - 50 * (this.hearts.length + 1), game.height - 55, 'heart'));
            this.hearts[this.hearts.length - 1].fixedToCamera = true;
        }
    }
};

/**
 * Check for variations in the player position, if he has moved (relatively to the grid),
 * calls myUpdate so it triggers
 * @return {[type]} [description]
 */
Player.prototype.update = function(){
    var posx, posy;
    var body = this.image.body, x = body.x, y = body.y;
    posx = Math.floor(x / box.properties.gdim);
    posy = Math.floor(y / box.properties.gdim);
    if(posx === this.posx && posy === this.posy){
        return;
    }
    this.posx = posx;
    this.posy = posy;
    m.time.myUpdate();
    //console.log("image.x: " + this.image.x, ", image.y: " + this.image.y);
    //console.log("x: ", + x + ", y: " + y);
    //console.log("posx: " + posx + ", posy: " + posy);
    //console.log("\n\n");
};