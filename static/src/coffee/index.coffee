boxx = null

class @Box
    constructor: () ->
        # initializes map, properties, game and input. 
        width = $("#main").width()
        height = $("#main").height()
        this.properties = new Properties()
        this.m = new map(this)
        this.game = new Phaser.Game(width, height, Phaser.CANVAS, 'main',
            {preload: preload,
            create: createGame,
            update: update,
            render: render})
        this.toDebug = false
        this.dbl = []
        this.input = new Input(this)

    renderDebug: () ->
        # Tells the game to print out debug info with game.debug.text()
        x = 15
        this.game.debug.text("DEBUG:", 10, x)
        _.each(this.dbl,
            (m) ->
                x += 15
                this.game.debug.text(m.text, 10, x, m.color)
            , this)
        this.dbl = []  # clear debug list

    debug: (text, color) ->
        # pushes a debug text to the queue
        this.dbl.push({text: text, color: color})

    onResize: () ->
        # doesn't work
        box = boxx
        width = $("#main").width()
        height = $("#main").height()

        box.game.width = width
        box.game.height = height
        box.game.camera.setSize(width, height)
        box.game.scale.setSize()

    myCreate: (jMap) ->
        # actualli loads the map, initializes phyisics and input.
        # creates UI
        # starts time cycle
        # start game
        this.game.physics.startSystem(Phaser.Physics.P2JS)
        this.m.loadMap(jMap)
        this.game.camera.follow(this.m.player.image)
        this.m.player.fixedToCamera = true

        # input
        this.input.createKeys()
        this.game.input.onDown.add(this.input.handleDown, this.input)
        this.game.input.onUp.add(this.input.handleUp, this.input)

        createUI(this)

        this.m.time.myUpdate()
        this.game.paused = false

$(document).ready(() ->
    boxx = new Box()
    $(window).resize(boxx.onResize))

createGame = () ->
    # initializes a socket connection to retrieve the map
    # when received, game can actually be created
    boxx.socket = io.connect('http://' + document.domain + ':' + location.port + '/game')
    boxx.socket.on('map', (msg) ->
        boxx.myCreate(msg))
    boxx.game.paused = true


update = () ->
    boxx.m.player.image.body.setZeroVelocity()
    boxx.input.handleInput()
    boxx.m.player.update()

render = () ->
    box = boxx
    if box.toDebug
        box.debug("playerHP: " + box.m.player.hp)
        box.debug("desktop: " + box.game.device.desktop)
        if box.m.entitiesL[0]
            box.debug("Wolf HP: " + box.m.entitiesL[0].hp)
        box.debug(box.game.time.fps || '--', "#00ff00")
        box.debug("fpsMin: " + box.game.time.fpsMin || '--', "#00ff00")
        box.renderDebug()

preload = () ->
    box = boxx
    baseAssetsFolder = box.properties.baseAssetsFolder
    box.game.time.advancedTiming = true;  # to show fps
    # entities #
    box.game.load.image('heart', baseAssetsFolder + '/hearth.png');
    box.game.load.image('greeny', baseAssetsFolder + '/character.png');
    box.game.load.image('princess', baseAssetsFolder + '/dragon.png');

    # objects
    box.game.load.image('potion', baseAssetsFolder + '/potion.png');

    # tiles
    box.game.load.image('grass', baseAssetsFolder + '/grass.png');
    box.game.load.image('dirt', baseAssetsFolder + '/dirt.png');

    # ui
    box.game.load.image('debug_button', baseAssetsFolder + '/debug_button.png');
    box.game.load.image('fullscreen_button', baseAssetsFolder + '/fullscreen_button.png');
    box.game.load.image('yellow_border', baseAssetsFolder + '/yellow_border.png');
    box.game.load.image('controller_ball', baseAssetsFolder + '/controller_ball.png');
    box.game.load.image('controller_ball_r', baseAssetsFolder + '/controller_ball_r.png');
    box.game.load.image('controller_base', baseAssetsFolder + '/controller_base.png');
    box.game.load.image('controller_base_r', baseAssetsFolder + '/controller_base_r.png');

    # icons
    # box.game.load.image('bag', baseAssetsFolder + '/bag.png');
    box.game.load.image('tileset', baseAssetsFolder + '/tileset.png');
    # box.game.load.tilemap('tilemap', baseAssetsFolder + "/map.json", null, Phaser.Tilemap.TILED_JSON);
