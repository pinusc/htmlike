class @map
  constructor: (@box) ->
    this.level = [[], []]
    this.itemsL = []  #DijkistraMap
    this.entitiesL = []
    this.time = new Time(this)
    this.DKMap = []
    this.loaded = false

  loadMap: (t) ->
    # Create map #
    this.box.game.load.tilemap('base', null, t, Phaser.Tilemap.TILED_JSON)
    this.map = this.box.game.add.tilemap('base')
    this.map.addTilesetImage('tiles', 'tileset')
    this.level[0] = this.map.createLayer(0)
    this.level[0].resizeWorld()
    this.level[1] = this.map.createLayer(1)
    this.level[1].resizeWorld()
    #this.box.game.physics.arcade.convertTilemap(this.map, 'walls')

    this.map.setCollisionBetween(1, this.map.tiles.length, true, 'walls')

    # set all level tiles to not visible
    for l in [0 .. this.level.length - 1]
      for i in [0 .. this.map.width - 1]
        for j in [0 .. this.map.height - 1]
          currTile = this.map.getTile(i, j, l)
          if currTile?
            currTile.alpha = 0
    # entities and items #
    # TODO: make them be received by the map
    this.player = new Player('greeny', this)
    this.player.inventory.updateShowInventory(this.box.game, this.box.properties.gdim)
    this.entitiesL[0] = new Entity('princess', 12, 2, this)
    this.itemsL.push(new Items.Potion('potion', 20, 20, this))
    this.itemsL.push(new Items.Sword(22, 20, this))

    # FOV code #
    this.flag = 1
    this.mult = [ [1,  0,  0, -1, -1,  0,  0,  1],
            [0,  1, -1,  0,  0, -1,  1,  0],
            [0,  1,  1,  0,  0, -1, -1,  0],
            [1,  0,  0,  1, -1,  0,  0, -1] ]
    this.light = _.range(this.getHeight()).map(() ->
      _.range(this.getWidth()).map(() -> 0)
    , this)

    this.DKMap = _.range(this.getHeight()).map(() ->
      _.range(this.getWidth()).map(() -> 0)
    , this)

    this.loaded = true

  getWidth: () ->
    this.map.width

  getHeight: () ->
    this.map.height

  square: (x, y) ->
    this.map.getTile(x, y, 1)

  blocked: (x, y) ->
    return (x < 0 or y < 0 or
      x >= this.getWidth() or y >= this.getHeight() or
      this.map.getTile(x, y, 1))

  lit: (x, y) ->
    this.light[y][x] is this.flag

  set_lit: (x, y) ->
    if 0 <= x < this.getWidth() and 0 <= y < this.getHeight()
      this.light[y][x] = this.flag

  cast_light: `function(cx, cy, row, start, end, radius, xx, xy, yx, yy, id){
    var new_start;
    if(start < end){
      return;
    }
    var radius_squared = radius * radius;
    for(var j = row; j < radius+1; j++){
      var dx = -j -1, dy = -j;
      var blocked = false;
      while(dx <= 0){
        dx++;
        var X = cx + dx * xx + dy * xy, Y = cy + dx * yx + dy * yy;
        var l_slope  = (dx-0.5)/(dy+0.5);
        var r_slope = (dx+0.5)/(dy-0.5);
        if (start < r_slope){
          continue;
        } else if (end > l_slope){
          break;
        } else {
          if (dx*dx + dy*dy < radius_squared){
            this.set_lit(X, Y);
          }
          if (blocked){
            if (this.blocked(X, Y)){
              new_start = r_slope;
              continue;
            } else {
              blocked = false;
              start = new_start;
            }
          } else {
            if(this.blocked(X, Y) && j < radius){
              blocked = true;
              this.cast_light(cx, cy, j+1, start, l_slope, radius, xx, xy, yx, yy, id+1);
              new_start = r_slope;
            }
          }
        }
      }
      if (blocked){
        break;
      }
    }
  }`

  do_fov: `function(x, y, radius){
    this.flag += 1;
    for(var oct = 0; oct < 8; oct++){
      this.cast_light(x, y, 1, 1.0, 0.0, radius,
        this.mult[0][oct], this.mult[1][oct],
        this.mult[2][oct], this.mult[3][oct], 0);
    }
  }`

  generateDKMap: `function() {
    for(var kx = 0; kx < this.DKMap.length; kx++){
      for(var ky = 0; ky < this.DKMap[0].length; ky++){
        if(this.map.getTile(kx, ky, 1)){
          this.DKMap[kx][ky] = -1;
        } else {
          this.DKMap[kx][ky] = 100;
        }
      }
    }
    this.DKMap[this.player.posx][this.player.posy] = 0;
    // the player is the only goal

    var changed = false;
    do {
      changed = false;
      for(var x = 0; x < this.DKMap.length; x++){
        for(var y = 0; y < this.DKMap[0].length; y++){
          var curr = this.DKMap[x][y];
          if (curr <= 0){
            continue;
          }
          var lowest = curr;
          for(var i = x - 1; i <= x + 1; i++){
            for(var j = y - 1; j <= y + 1; j++){
              if(i >= 0 && j >= 0 &&
                i < this.DKMap.length && j < this.DKMap[0].length){

                var icurr = this.DKMap[i][j];

                if(icurr < 0){ // solid block0
                  continue;
                } else if(icurr < lowest){
                  lowest = icurr;
                }
              }
            }
          }
          if(lowest <= curr - 2){
            this.DKMap[x][y] = lowest + 1;
            changed = true;
          }
        }
      }
    } while (changed);
  }`
