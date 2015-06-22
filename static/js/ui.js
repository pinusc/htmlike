var joystick_ball_l, joystick_base_l;  // joystick_base is the grey circle, joystick_ball the red circle
var joystick_ball_r, joystick_base_r;  // joystick_base is the grey circle, joystick_ball the blue circle
var yellow_border; // used in debug to see player position

function createUI(box)
{
    //enable fullscreen
    box.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    // debug plgin - for a better fps monitoring
    box.game.add.plugin(Phaser.Plugin.Debug);

    /* debug button */
    box.input.dbutton = box.game.add.button(box.game.width - 32 * 3, 0, 'debug_button', Box.prototype.toggleDebug, box);
    box.input.dbutton.onInputDown.add(box.input.dbutton_down, box.input);
    box.input.dbutton.fixedToCamera = true;

    /* fullscreen button */
    box.input.fbutton = box.game.add.button(box.game.width - 32 * 3, 32, 'fullscreen_button', box.input.gofull, box);
    //box.input.fbutton.onInputDown.add(box.input.fbutton_down, box.input);
    box.input.fbutton.fixedToCamera = true;

    /* joystick l*/
    box.input.joystick_base_l = box.game.add.sprite(0, 0, 'controller_base');
    box.input.joystick_base_l.alpha = 0.5;
	box.input.joystick_base_l.visible = false;
	box.input.joystick_base_l.fixedToCamera = true;
	box.input.maxJoystickDistance_l = box.input.joystick_base_l.width / 2;  // radius of the ball

    box.input.joystick_ball_l = box.game.add.image(0, 0, 'controller_ball');
    box.input.joystick_ball_l.alpha = 0.5;
    box.input.joystick_ball_l.fixedToCamera = true;
	box.input.joystick_ball_l.visible = false;

    /* joystick r*/
    box.input.joystick_base_r = box.game.add.sprite(0, 0, 'controller_base_r');
    box.input.joystick_base_r.alpha = 0.5;
    box.input.joystick_base_r.visible = false;
    box.input.joystick_base_r.fixedToCamera = true;
    box.input.maxJoystickDistance_r = box.input.joystick_base_r.width / 2;  // radius of the ball

    box.input.joystick_ball_r = box.game.add.image(0, 0, 'controller_ball_r');
    box.input.joystick_ball_r.alpha = 0.5;
    box.input.joystick_ball_r.fixedToCamera = true;
    box.input.joystick_ball_r.visible = false;

}
