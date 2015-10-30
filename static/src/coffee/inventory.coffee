class @Inventory
  constructor: (player) ->
    # arr is the main inventory with generic objects
    this.arr = []
    this.player = player
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
        j.visible = this.UIvisible

    start =  # the point where the first object is drawn
      x: this.matrix[1][1].cameraOffset.x
      y: this.matrix[1][1].cameraOffset.y
    curr =  # current index of the object being drawn (NOT position, index)
      x: 0
      y: 0
    for i in this.arr
      if not this.UIvisible
        i.image.visible = false
      else
        if i instanceof Items.HealPotion1
          i.startInventory(this.player)
        if curr.x >= this.matrix.length  # line is full
          curr.x = 0
          curr.y += 1
        if curr.y >= this.matrix[0].length  # all lines are full
          return
        # show items in the right place
        # image size is doubled
        i.image.cameraOffset.x = start.x + 32 * 2 * curr.x
        i.image.cameraOffset.y = start.y + 32 * 2 * curr.y
        i.image.visible = true
        _.extend(i.image.scale, {x: 2, y: 2})
        i.image.bringToTop()
        curr.x += 1
  
  updateShowInventory: (game, gdim) ->
    # this has to be called whenever the window is resized
    #gdim = game.properties.gdim
    img = game.add.sprite  # just a quicker reference
    width = game.camera.width // gdim - 2
    height = game.camera.height // gdim - 2
    console.log width,height
    c =  # coordinates of the current tile being added
      x: gdim
      y: gdim

    # create empty matrix
    this.matrix = []
    for i in [0..height-1]
      this.matrix[i] = new Array(width)

    for i in [0..height-1]
      for j in [0..width-1]
        # create tile

        # num is the index of the image being displayed
        # the spritesheet is arranged like this:
        #
        #  _____________
        #  | 0| 1| 2| 3|
        #  | 4| 5| 6| 7|
        #  | 8| 9|10|11|
        #  |12|13|14|15|
        #
        #  where the corners are unique, the edges have 2 variants
        #  and the inner tiles have four variante
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





