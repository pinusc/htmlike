// Generated by CoffeeScript 1.9.3
(function() {
  this.Time = (function() {
    function Time(map1) {
      this.map = map1;
      this.box = map.box;
      this.tick = 0;
    }

    Time.prototype.advanceWorld = function() {
      this.tick++;
      _.each(this.map.entitiesL, function(entity) {
        if (this.tick % entity.speed === 0) {
          entity.act();
          return entity.update();
        }
      }, this);
      if (this.tick % this.map.player.speed === 0) {

      } else {
        return this.advanceWorld();
      }
    };

    Time.prototype.updateWorld = function() {
      _.each(this.map.itemsL, function(item) {
        return item.update();
      });
      return _.each(this.map.entitiesL, function(entity) {
        return entity.update();
      });
    };

    Time.prototype.myUpdate = function() {
      var ll;
      console.log("myUpdate");
      ll = this.map.level.length;
      this.map.generateDKMap();
      this.updateWorld();
      this.advanceWorld();
      this.map.do_fov(this.map.player.posx, this.map.player.posy, 5);
      _.each(this.map.light, function(el, i) {
        return _.each(el, function(v, j) {
          var q;
          q = 0;
          if (v === this.map.flag) {
            q = 1;
          } else if (v === this.map.flag - 1) {
            q = 0.5;
          }
          if (q) {
            return _.each(this.map.level, function(f, l) {
              var currTile;
              currTile = this.map.map.getTile(j, i, l);
              if (currTile) {
                return currTile.alpha = q;
              }
            }, this);
          }
        }, this);
      }, this);
      _.each(this.map.level, function(level) {
        return level.dirty = true;
      });
      return this.map.map.getTile(this.map.player.posx, this.map.player.posy, 0).alpha = 0.5;
    };

    return Time;

  })();

}).call(this);

//# sourceMappingURL=time.js.map
