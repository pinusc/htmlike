class @Thing
  constructor: (image, x, y, map) ->
    x = 0 if not x?
    y = 0 if not y?
    this.image = map.box.game.add.sprite(0, 0, image)
    this.posy = y
    this.posx = x
    this.map = map
    null

  distance: (coordinates) ->
    if coordinates.isEntity or coordinates.isPlayer
      coordinates = [coordinates.posx, coordinates.posy]
    x = this.posx
    y = this.posy
    x1 = coordinates[0]
    y1 = coordinates[1]
    difx = x - x1
    dify = y - y1
    dist = Math.sqrt(difx * difx + dify * dify)
    return dist

  render: () ->
    gdim = this.map.box.properties.gdim
    x = this.posx * gdim
    y = this.posy * gdim
    if this.image.height > gdim
      y -= gdim
    this.image.x = x
    this.image.y = y
  
  update: () ->
    if this.distance(this.map.box.m.player) >= 5
      this.setVisible false
    else
      this.setVisible true

  setVisible: (val) ->
    this.image.visible = val
