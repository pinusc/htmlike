// Generated by CoffeeScript 1.9.3
(function() {
  this.Inventory = (function() {
    function Inventory() {
      this.arr = [];
      this.mainWeapon = new Items.Fists();
      null;
    }

    Inventory.prototype.add = function(item) {
      if (item instanceof Item) {
        item.image.fixedToCamera = true;
        if (item instanceof Items.Weapon && this.mainWeapon instanceof Items.Fists) {
          return this.mainWeapon = item;
        } else {
          return this.arr.push(item);
        }
      }
    };

    Inventory.prototype.get = function(n) {
      return this.arr[n];
    };

    Inventory.prototype.set = function(n, item) {
      if (item instanceof Item) {
        return this.arr[n] = item;
      }
    };

    Inventory.prototype.swap = function(n, k) {
      var temp;
      temp = this.arr[n];
      n = this.arr[k];
      return k = temp;
    };

    Inventory.prototype.toggleInventory = function() {
      var coor, i, j, l, len, len1, len2, m, o, ref, ref1;
      ref = this.matrix;
      for (l = 0, len = ref.length; l < len; l++) {
        i = ref[l];
        for (m = 0, len1 = i.length; m < len1; m++) {
          j = i[m];
          j.visible = !j.visible;
        }
      }
      coor = {
        startx: this.matrix[1][1].cameraOffset.x,
        starty: this.matrix[1][1].cameraOffset.y,
        nx: 0,
        ny: 0
      };
      ref1 = this.arr;
      for (o = 0, len2 = ref1.length; o < len2; o++) {
        i = ref1[o];
        if (i.image.visible) {
          i.image.visible = false;
        } else {
          if (coor.nx >= this.matrix.length) {
            coor.nx = 0;
            coor.ny += 1;
          }
          if (coor.ny >= this.matrix[0].length) {
            return;
          }
          i.image.cameraOffset.x = coor.startx + 32 * 2 * coor.nx;
          i.image.cameraOffset.y = coor.starty + 32 * 2 * coor.ny;
          i.image.visible = true;
          i.image.scale.x = 2;
          i.image.scale.y = 2;
          console.log(i);
          console.log(coor);
          coor.nx += 1;
        }
      }
    };

    Inventory.prototype.updateShowInventory = function(game, gdim) {
      var c, height, i, img, j, l, m, num, o, ref, ref1, ref2, results, width;
      console.log("upshowinv");
      img = game.add.sprite;
      width = Math.floor(game.camera.width / gdim) - 2;
      height = Math.floor(game.camera.height / gdim) - 2;
      console.log(width, height);
      c = {
        x: gdim,
        y: gdim
      };
      this.matrix = [];
      for (i = l = 0, ref = height - 1; 0 <= ref ? l <= ref : l >= ref; i = 0 <= ref ? ++l : --l) {
        this.matrix[i] = new Array(width);
      }
      results = [];
      for (i = m = 0, ref1 = height - 1; 0 <= ref1 ? m <= ref1 : m >= ref1; i = 0 <= ref1 ? ++m : --m) {
        for (j = o = 0, ref2 = width - 1; 0 <= ref2 ? o <= ref2 : o >= ref2; j = 0 <= ref2 ? ++o : --o) {
          num = (function() {
            switch (false) {
              case !(i === 0 && j === 0):
                return 0;
              case !(i === 0 && j === width - 1):
                return 3;
              case i !== 0:
                return [1, 2][Math.floor(Math.random() * 2)];
              case !(i === height - 1 && j === 0):
                return 12;
              case !(i === height - 1 && j === width - 1):
                return 15;
              case i !== height - 1:
                return [13, 14][Math.floor(Math.random() * 2)];
              case j !== 0:
                return [4, 8][Math.floor(Math.random() * 2)];
              case j !== width - 1:
                return [7, 11][Math.floor(Math.random() * 2)];
              default:
                return [5, 6, 9, 10][Math.floor(Math.random() * 4)];
            }
          })();
          if (num === void 0) {
            console.log(num, i, j);
          }
          this.matrix[i][j] = game.add.sprite(c.x, c.y, 'inventory_sprite', num);
          this.matrix[i][j].visible = false;
          this.matrix[i][j].alpha = 0.9;
          this.matrix[i][j].fixedToCamera = true;
          c.x += gdim;
        }
        c.x = gdim;
        results.push(c.y += gdim);
      }
      return results;
    };

    return Inventory;

  })();

}).call(this);

//# sourceMappingURL=inventory.js.map
