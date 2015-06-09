var joystick_ball_l, joystick_base_l;  // joystick_base is the grey circle, joystick_ball the red circle
var joystick_ball_r, joystick_base_r;  // joystick_base is the grey circle, joystick_ball the blue circle
var yellow_border; // used in debug to see player position

function createUI()
{
    //enable fullscreen
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    // debug plgin - for a better fps monitoring
    game.add.plugin(Phaser.Plugin.Debug);

    /* debug button */
    dbutton = game.add.button(game.width - 32 * 3, 0, 'debug_button', toggleDebug(), this);
    dbutton.onInputDown.add(dbutton_down, this);
    dbutton.fixedToCamera = true;

    /* fullscreen button */
    fbutton = game.add.button(game.width - 32 * 3, 32, 'fullscreen_button', toggleDebug(), this);
    fbutton.onInputDown.add(fbutton_down, this);
    fbutton.fixedToCamera = true;

    /* joystick l*/
    joystick_base_l = game.add.sprite(0, 0, 'controller_base');
    joystick_base_l.alpha = 0.5;
	joystick_base_l.visible = false;
	joystick_base_l.fixedToCamera = true;
	maxJoystickDistance_l = joystick_base_l.width / 2;  // radius of the ball

    joystick_ball_l = game.add.image(0, 0, 'controller_ball');
    joystick_ball_l.alpha = 0.5;
    joystick_ball_l.fixedToCamera = true;
	joystick_ball_l.visible = false;

    /* joystick r*/
    joystick_base_r = game.add.sprite(0, 0, 'controller_base_r');
    joystick_base_r.alpha = 0.5;
    joystick_base_r.visible = false;
    joystick_base_r.fixedToCamera = true;
    maxJoystickDistance_r = joystick_base_r.width / 2;  // radius of the ball

    joystick_ball_r = game.add.image(0, 0, 'controller_ball_r');
    joystick_ball_r.alpha = 0.5;
    joystick_ball_r.fixedToCamera = true;
    joystick_ball_r.visible = false;
}
