// Generated by CoffeeScript 1.9.3
(function() {
  this.Thing = (function() {
    function Thing(image, x, y, map) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      this.image = map.box.game.add.sprite(0, 0, image);
      this.posy = y;
      this.posx = x;
      this.map = map;
      null;
    }

    Thing.prototype.distance = function(coordinates) {
      var difx, dify, dist, x, x1, y, y1;
      if (coordinates.isEntity || coordinates.isPlayer) {
        coordinates = [coordinates.posx, coordinates.posy];
      }
      x = this.posx;
      y = this.posy;
      x1 = coordinates[0];
      y1 = coordinates[1];
      difx = x - x1;
      dify = y - y1;
      dist = Math.sqrt(difx * difx + dify * dify);
      return dist;
    };

    Thing.prototype.render = function() {
      var gdim, x, y;
      gdim = this.map.box.properties.gdim;
      x = this.posx * gdim;
      y = this.posy * gdim;
      if (this.image.height > gdim) {
        y -= gdim;
      }
      this.image.x = x;
      return this.image.y = y;
    };

    Thing.prototype.update = function() {
      if (this.distance(this.map.box.m.player) >= 5) {
        return this.setVisible(false);
      } else {
        return this.setVisible(true);
      }
    };

    Thing.prototype.setVisible = function(val) {
      return this.image.visible = val;
    };

    return Thing;

  })();

}).call(this);

//# sourceMappingURL=thing.js.map
