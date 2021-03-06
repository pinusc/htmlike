bullets = null
window.load_status =
  preload: () ->
    box = boxx
    baseAssetsFolder = box.properties.baseAssetsFolder
    this.game.time.advancedTiming = true;  # to show fps
    # entities #
    this.game.load.image('heart', baseAssetsFolder + '/hearth.png');
    this.game.load.image('greeny', baseAssetsFolder + '/character.png');
    this.game.load.image('princess', baseAssetsFolder + '/dragon.png');
    this.game.load.image('hit', baseAssetsFolder + '/hit.png');

    # objects
    this.game.load.image('potion', baseAssetsFolder + '/potion.png');
    this.game.load.image('sword', baseAssetsFolder + '/sword.png');

    # tiles
    this.game.load.image('grass', baseAssetsFolder + '/grass.png');
    this.game.load.image('dirt', baseAssetsFolder + '/dirt.png');

    # ui
    this.game.load.image('bullets', baseAssetsFolder + '/bullets.png');
    this.game.load.spritesheet('inventory_sprite', baseAssetsFolder + '/inventory.png', 32, 32);
    this.game.load.image('debug_button', baseAssetsFolder + '/debug_button.png');
    this.game.load.image('fullscreen_button', baseAssetsFolder + '/fullscreen_button.png');
    this.game.load.image('yellow_border', baseAssetsFolder + '/yellow_border.png');
    this.game.load.image('controller_ball', baseAssetsFolder + '/controller_ball.png');
    this.game.load.image('controller_ball_r', baseAssetsFolder + '/controller_ball_r.png');
    this.game.load.image('controller_base', baseAssetsFolder + '/controller_base.png');
    this.game.load.image('controller_base_r', baseAssetsFolder + '/controller_base_r.png');
    #this.game.load.bitmapFont('pixelmix', baseAssetsFolder + '/pixelmix_font/font.png', baseAssetsFolder + '/pixelmix_font/font.fnt');
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    # icons
    this# .game.load.image('bag', baseAssetsFolder + '/bag.png');
    this.game.load.image('tileset', baseAssetsFolder + '/tileset.png');
    this# .game.load.tilemap('tilemap', baseAssetsFolder + "/map.json", null, Phaser.Tilemap.TILED_JSON);

  create: () ->
    # display load screen
    bullets = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'bullets');
    text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 128, "HTMLYPSE WORLD", {font: "bold 40pt Arial", fill: "red"})
    text.anchor.setTo(0.5)
    bullets.anchor.setTo(0.5)

    # set callback when loaded
    this.game.socket = io.connect('http://' + document.domain + ':' + location.port + '/game')
    that = this
    this.game.socket.on('map', (msg) ->
      that.game.jMap = msg
      that.game.state.start('main_state'))

  update: () ->
    bullets.angle += 2

  render: () ->
    return

WebFontConfig =

    # 'active' means all requested fonts have finished loading
    # We set a 1 second delay before calling 'createText'.
    # For some reason if we don't the browser cannot
    # render the text the first time it's created.
    active: () ->
      window.boxx.game.time.events.add(Phaser.Timer.SECOND, createText, this)

    # The Google Fonts we want to load (specify as many as you like in the array
    google:
      families: ['VT323']
