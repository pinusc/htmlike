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
    this.alignHearts();
}

Player.prototype = Object.create(Entity.prototype, {});

Player.prototype.constructor = Player;

Player.prototype.oldHeal = Player.prototype.heal;
Player.prototype.heal = function(n) {
    this.oldHeal(n);
    this.alignHearts();
};

Player.prototype.oldDamage = Player.prototype.damage;
Player.prototype.damage = function(n) {
    this.oldDamage(n);
    this.alignHearts();
};

Player.prototype.alignHearts = function(){
    var nh = Math.floor(this.hp / 5); // number of hearths
    console.log(nh);
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
