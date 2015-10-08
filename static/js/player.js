// Generated by CoffeeScript 1.9.3
(function() {
  var Stats,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Player = (function(superClass) {
    extend(Player, superClass);

    function Player(image, map) {
      Player.__super__.constructor.call(this, image, 10, 10, map);
      this.hp = 5;
      this.maxhp = this.hp;
      this.isPlayer = true;
      this.hearts = [];
      this.inventory = new Inventory();
      this.stat = new Stats(2, 2, 2, 2, 2, this.inventory);
      this.alignHearts();
      this.image.body.immovable = false;
      this.pixelSpeed = this.map.box.properties.globSpeed;
    }

    Player.prototype.getItemOnGround = function() {
      var m, to_add;
      m = this.map;
      to_add = _.filter(m.itemsL, function(item) {
				return item.posx === this.posx && item.posy === this.posy; 
			}, this);
      m.itemsL = _.filter(m.itemsL, function(item) {
				return item.posx !== this.posx || item.posy !== this.posy; 
			}, this);
      return _.each(to_add, function(it) {
        this.inventory.add(it);
        return it.setVisible(false);
      }, this);
    };

    Player.prototype.heal = function(hp) {
      Player.__super__.heal.call(this, hp);
      return this.alignHearts();
    };

    Player.prototype.damage = function(hp) {
      Player.__super__.damage.call(this, hp);
      return this.alignHearts();
    };

    Player.prototype.attack = function(enemy) {
      var roll;
      roll = r2d6() + this.stat.attack();
      if (roll >= 10) {
        return enemy.damage(2);
      } else if (roll >= 6) {
        return enemy.damage(1);
      }
    };

    Player.prototype.alignHearts = function() {
      var i, j, k, nh, nh_now, ref, ref1, results, results1;
      nh = this.hp;
      nh_now = this.hearts.length;
      if (nh < nh_now) {
        results = [];
        for (i = j = 0, ref = nh_now - nh - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          results.push(this.hearts.pop().destroy(true));
        }
        return results;
      } else if (nh > nh_now) {
        results1 = [];
        for (i = k = 0, ref1 = nh - nh_now - 1; 0 <= ref1 ? k <= ref1 : k >= ref1; i = 0 <= ref1 ? ++k : --k) {
          this.hearts.push(this.map.box.game.add.sprite(this.map.box.game.width - 50 * (this.hearts.length + 1), this.map.box.game.height - 55, 'heart'));
          results1.push(this.hearts[this.hearts.length - 1].fixedToCamera = true);
        }
        return results1;
      }
    };

    Player.prototype.update = function() {
      var body, posx, posy, x, y;
      body = this.image.body;
      x = body.x;
      y = body.y;
      posx = Math.floor((x + this.map.box.properties.gdim / 2) / this.map.box.properties.gdim);
      posy = Math.floor((y + this.map.box.properties.gdim / 2) / this.map.box.properties.gdim);
      if (posx === this.posx && posy === this.posy) {
        return;
      }
      this.posx = posx;
      this.posy = posy;
      return this.map.time.myUpdate();
    };

    return Player;

  })(Entity);

  Stats = (function() {
    function Stats(cool, hard, hot, sharp, weird, inventory) {
      this.inventory = inventory;
      this.setStat('cool', cool);
      this.setStat('hard', hard);
      this.setStat('hot', hot);
      this.setStat('sharp', sharp);
      this.setStat('weird', weird);
    }

    Stats.prototype.setStat = function(stat, num) {
      return this[stat] = num;
    };

    Stats.prototype.attack = function() {
      return this.hard + this.inventory.mainWeapon.attack;
    };

    return Stats;

  })();

}).call(this);

//# sourceMappingURL=player.js.map
