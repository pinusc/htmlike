function Player(image){
    Entity.call(this, image, 10, 10);
    /**
    * A player isn't an entity like other... but in the core, he is.
    * Returns a modified entity.
    */

    this.hp = 20;  // player is STRONGER! TODO remove hardcode
    this.maxhp = 20;
    this.isPlayer = true
}

Player.prototype = Object.create(Entity.prototype, {});

Player.prototype.constructor = Player;
