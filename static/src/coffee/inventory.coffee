class @Inventory
  constructor: () ->
    # arr is the main inventory with generic objects
    this.arr = []
    #mainweapon is the slot for melee weapon
    this.mainWeapon = new Items.Fists()
    this.UIvisible = false
    null

  add: (item) ->
    #TODO: limit inventory slot number
    if item instanceof Item
      #this if player found a weapon and hasn't got one, auto-equip it
      item.image.fixedToCamera = true
      if item instanceof Items.Weapon and this.mainWeapon instanceof Items.Fists
        this.mainWeapon = item
      else
        this.arr.push(item)

  get: (n) ->
    this.arr[n]

  set: (n, item) ->
    if item instanceof Item
      this.arr[n] = item

  swap: (n, k) ->
    temp = this.arr[n]
    n = this.arr[k]
    k = temp

  toggleInventory: () ->
    this.UIvisible = not this.UIvisible
    for i in this.matrix
      for j in i
        j.visible = not j.visible
    coor = #items get drawn from top left + 1
      startx: this.matrix[1][1].cameraOffset.x
      starty: this.matrix[1][1].cameraOffset.y
      nx: 0
      ny: 0
    for i in this.arr
      if not this.UIvisible
        i.image.visible = false
      else
        if coor.nx >= this.matrix.length  # line is full
          coor.nx = 0
          coor.ny += 1
        if coor.ny >= this.matrix[0].length  # all lines are full
          return
        # show items in the right place
        i.image.cameraOffset.x = coor.startx + 32 * 2 * coor.nx
        i.image.cameraOffset.y = coor.starty + 32 * 2 * coor.ny
        i.image.visible = true
        _.extend(i.image.scale, {x: 2, y: 2})
        i.image.bringToTop()
        coor.nx += 1

      
  
  updateShowInventory: (game, gdim) ->
    # this has to be called whenever the window is resized
    #gdim = game.properties.gdim
    console.log "upshowinv"
    img = game.add.sprite
    width = game.camera.width // gdim - 2
    height = game.camera.height // gdim - 2
    console.log width,height
    c =
      x: gdim
      y: gdim
    this.matrix = []
    for i in [0..height-1]
      this.matrix[i] = new Array(width)
    for i in [0..height-1]
      for j in [0..width-1]
        # cre0ate tile
        num = switch
          when i == 0 and j == 0
            #top left
            0
          when i == 0 and j == width-1
            #top right
            3
          when i == 0
            #top
            [1,2][Math.floor(Math.random() * 2)]
          when i == height-1 and j == 0
            # bottom left
            12
          when i == height-1 and j == width-1
            #bottom right
            15
          when i == height-1
            # bottom
            [13,14][Math.floor(Math.random() * 2)]
          when j == 0
            #left
            [4,8][Math.floor(Math.random() * 2)]
          when j == width-1
            #right
            [7,11][Math.floor(Math.random() * 2)]
          else
            [5,6,9,10][Math.floor(Math.random() * 4)]
        if num == undefined
          console.log num,i,j
        this.matrix[i][j] = game.add.sprite(c.x, c.y, 'inventory_sprite', num)
        #this.matrix[i][j].setFrame num
        this.matrix[i][j].visible = false
        this.matrix[i][j].alpha = 0.9
        this.matrix[i][j].fixedToCamera  = true
        c.x += gdim
      c.x = gdim
      c.y += gdim




