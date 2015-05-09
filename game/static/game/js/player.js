function Player(image){
    /**
    * A player isn't an entity like other... but in the core, he is.
    * Returns a modified entity.
    */
    var p = Object.create(new Entity(image, 10, 10));
    p.hp = 20;  // player is STRONGER! TODO remove hardcode
    p.maxhp = p.hp;
    p.isPlayer = true;
    return p;
}
