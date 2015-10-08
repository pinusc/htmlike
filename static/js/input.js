// Generated by CoffeeScript 1.9.3
(function() {
  this.Input = (function() {
    function Input(box, game) {
      this.box = box;
      this.game = game;
      this.joystick_l_down = false;
      this.joystick_r_down = false;
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.game.input.onUp.add(this.handleUp, this);
      this.game.input.onDown.add(this.handleDown, this);
    }

    Input.prototype.handleInput = function() {
      this.handleKeys();
      if (this.game.input.x < this.game.world.width) {
        return this.handleJoystick(this.joystick_base_l, this.joystick_ball_l, this.maxJoystickDistance_l);
      } else {
        return this.handleJoystick(this.joystick_base_r, this.joystick_ball_r, this.maxJoystickDistance_r);
      }
    };

    Input.prototype.handleKeys = function() {
      var m;
      m = this.box.m;
      if (this.cursors.left.isDown) {
        move(-m.player.pixelSpeed, 0, m.player.image.body);
      } else if (this.cursors.right.isDown) {
        move(m.player.pixelSpeed, 0, m.player.image.body);
      }
      if (this.cursors.up.isDown) {
        move(0, -m.player.pixelSpeed, m.player.image.body);
      } else if (this.cursors.down.isDown) {
        move(0, m.player.pixelSpeed, m.player.image.body);
      }
      if (this.game.input.keyboard.isDown(71)) {
        return m.player.getItemOnGround();
      } else if (this.game.input.keyboard.isDown(13)) {
        return m.time.myUpdate();
      }
    };

    Input.prototype.handleDown = function() {
      var x, y;
      if (true || !this.game.device.desktop) {
        x = this.game.input.x;
        y = this.game.input.y;
        if (x < this.game.camera.width / 2) {
          this.joystick_l_down = true;
          this.joystick_base_l.visible = true;
          this.joystick_base_l.cameraOffset.x = x - this.joystick_base_l.height / 2;
          this.joystick_base_l.cameraOffset.y = y - this.joystick_base_l.width / 2;
          this.joystick_ball_l.visible = true;
          this.joystick_ball_l.cameraOffset.x = x - this.joystick_ball_l.height / 2;
          return this.joystick_ball_l.cameraOffset.y = y - this.joystick_ball_l.width / 2;
        } else {
          this.joystick_r_down = true;
          this.joystick_base_r.visible = true;
          this.joystick_base_r.cameraOffset.x = x - this.joystick_base_r.height / 2;
          this.joystick_base_r.cameraOffset.y = y - this.joystick_base_r.width / 2;
          this.joystick_ball_r.visible = true;
          this.joystick_ball_r.cameraOffset.x = x - this.joystick_ball_r.height / 2;
          return this.joystick_ball_r.cameraOffset.y = y - this.joystick_ball_r.width / 2;
        }
      }
    };

    Input.prototype.handleUp = function() {
      if (this.joystick_ball_l.visible || this.joystick_base_l.visible) {
        this.joystick_l_down = false;
        this.joystick_base_l.visible = false;
        this.joystick_ball_l.visible = false;
      }
      if (this.joystick_ball_r.visible || this.joystick_base_r.visible) {
        this.joystick_r_down = false;
        this.joystick_base_r.visible = false;
        return this.joystick_ball_r.visible = false;
      }
    };

    Input.prototype.gofull = function() {
      if (this.game.scale.isFullScreen) {
        return this.game.scale.stopFullScreen();
      } else {
        return this.game.scale.startFullScreen(false);
      }
    };

    Input.prototype.toggleDebug = function() {
      return this.box.toDebug = !this.box.toDebug;
    };

    Input.prototype.dbutton_down = function() {
      return this.toggleDebug();
    };

    Input.prototype.fbutton_down = function() {
      return this.gofull();
    };

    Input.prototype.hJoystick = function() {
      var baseCenterX, baseCenterY, dis, joystick_ball, joystick_base, maxJoystickDistance, point, xOffset, xVelocity, xdiff, yOffset, yVelocity, ydiff;
      point = this.game.input.activePointer;
      if (!point.isDown) {
        return;
      }
      if (point.x < this.game.camera.width / 2) {
        joystick_ball = this.joystick_ball_l;
        joystick_base = this.joystick_base_l;
        maxJoystickDistance = this.maxJoystickDistance_l;
      } else {
        if (!joystick_r_down) {
          handleUp();
        }
        joystick_ball = this.joystick_ball_r;
        joystick_base = this.joystick_base_r;
        maxJoystickDistance = maxJoystickDistance_r;
      }
      baseCenterX = joystick_base.cameraOffset.x + joystick_base.width / 2;
      baseCenterY = joystick_base.cameraOffset.y + joystick_base.height / 2;
      xdiff = point.x - baseCenterX;
      ydiff = point.y - baseCenterY;
      dis = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
      if (dis > maxJoystickDistance) {
        xOffset = maxJoystickDistance * xdiff / dis;
        yOffset = maxJoystickDistance * ydiff / dis;
        joystick_ball.cameraOffset.x = baseCenterX + xOffset - joystick_ball.width / 2;
        joystick_ball.cameraOffset.y = baseCenterY + yOffset - joystick_ball.height / 2;
      } else {
        xOffset = xdiff;
        yOffset = ydiff;
        joystick_ball.cameraOffset.x = point.x - joystick_ball.height / 2;
        joystick_ball.cameraOffset.y = point.y - joystick_ball.width / 2;
      }
      if (point.x < this.game.camera.width / 2) {
        xVelocity = xOffset / maxJoystickDistance * m.player.pixelSpeed;
        yVelocity = yOffset / maxJoystickDistance * m.player.pixelSpeed;
        return move(xVelocity, yVelocity, m.player.image.body);
      } else {
        m.player.interact(direction(joystick_ball.cameraOffset.x, joystick_ball.cameraOffset.y, baseCenterX, baseCenterY));
        m.time.myUpdate();
        return this.handleUp();
      }
    };

    Input.prototype.handleJoystick = function() {
      var point;
      point = this.game.input.activePointer;
      if (!point.isDown) {
        return;
      }
      if (point.x < this.game.camera.width / 2) {
        return this.handleJoystick_l(point, this.joystick_ball_l, this.joystick_base_l, this.maxJoystickDistance_l);
      } else {
        return this.handleJoystick_r(point, this.joystick_ball_r, this.joystick_base_r, this.maxJoystickDistance_r);
      }
    };

    Input.prototype.handleJoystick_l = function(point, joystick_ball, joystick_base, maxJoystickDistance) {
      var baseCenterX, baseCenterY, dis, xOffset, xVelocity, xdiff, yOffset, yVelocity, ydiff;
      baseCenterX = joystick_base.cameraOffset.x + joystick_base.width / 2;
      baseCenterY = joystick_base.cameraOffset.y + joystick_base.height / 2;
      xdiff = point.x - baseCenterX;
      ydiff = point.y - baseCenterY;
      dis = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
      if (dis > maxJoystickDistance) {
        xOffset = maxJoystickDistance * xdiff / dis;
        yOffset = maxJoystickDistance * ydiff / dis;
        joystick_ball.cameraOffset.x = baseCenterX + xOffset - joystick_ball.width / 2;
        joystick_ball.cameraOffset.y = baseCenterY + yOffset - joystick_ball.height / 2;
      } else {
        xOffset = xdiff;
        yOffset = ydiff;
        joystick_ball.cameraOffset.x = point.x - joystick_ball.height / 2;
        joystick_ball.cameraOffset.y = point.y - joystick_ball.width / 2;
      }
      if (point.x < this.game.camera.width / 2) {
        xVelocity = xOffset / maxJoystickDistance * this.box.m.player.pixelSpeed;
        yVelocity = yOffset / maxJoystickDistance * this.box.m.player.pixelSpeed;
        return move(xVelocity, yVelocity, this.box.m.player.image.body);
      }
    };

    Input.prototype.handleJoystick_r = function(point, joystick_ball, joystick_base, maxJoystickDistance) {
      var baseCenterX, baseCenterY, dis, xOffset, xdiff, yOffset, ydiff;
      if (!this.joystick_r_down) {
        return;
      }
      baseCenterX = joystick_base.cameraOffset.x + joystick_base.width / 2;
      baseCenterY = joystick_base.cameraOffset.y + joystick_base.height / 2;
      xdiff = point.x - baseCenterX;
      ydiff = point.y - baseCenterY;
      dis = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
      if (dis < maxJoystickDistance) {
        xOffset = xdiff;
        yOffset = ydiff;
        joystick_ball.cameraOffset.x = point.x - joystick_ball.height / 2;
        return joystick_ball.cameraOffset.y = point.y - joystick_ball.width / 2;
      } else {
        this.box.m.player.interact(direction(joystick_ball.cameraOffset.x, joystick_ball.cameraOffset.y, baseCenterX, baseCenterY));
        this.box.m.time.myUpdate();
        return this.handleUp();
      }
    };

    return Input;

  })();

  window.move = function(x, y, body) {
    if (x) {
      body.velocity.x = x;
    }
    if (y) {
      return body.velocity.y = y;
    }
  };

}).call(this);

//# sourceMappingURL=input.js.map
