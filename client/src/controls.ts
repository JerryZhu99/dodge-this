import * as Keyboard from "keyboard";

import { app, stage, state, background } from "game"
import { Vector } from "shared/math-utils";

var keyW = Keyboard.key(Keyboard.keyCode("W"));
var keyA = Keyboard.key(Keyboard.keyCode("A"));
var keyS = Keyboard.key(Keyboard.keyCode("S"));
var keyD = Keyboard.key(Keyboard.keyCode("D"));
var keyP = Keyboard.key(Keyboard.keyCode("P"));
var keySpace = Keyboard.key(32)

keyP.press = function () {
    let canvas = (<any>app.view);
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    }
    if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    }
    if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
    }
    if (canvas.msRequestFullScreen) {
        canvas.msRequestFullScreen();
    }
}

export function init() {
    background.interactive = true;
    app.view.ondragover = function (e) { e.preventDefault(); return false; };
    app.view.ondrop = function (e) { e.preventDefault(); return false; };
    app.view.oncontextmenu = function (e) { e.preventDefault(); return false; };
    background.addListener("mousedown", function (event: PIXI.interaction.InteractionEvent) {
        if (state.localPlayer) state.localPlayer.attacking = true;
        state.socket.send("attacking", true);
        event.stopPropagation();
        event.data.originalEvent.preventDefault();
    });
    background.addListener("mousemove", function (event: PIXI.interaction.InteractionEvent) {
        let mousePosition = event.data.getLocalPosition(stage);
        if (state.localPlayer) state.localPlayer.target = mousePosition;
        event.stopPropagation();
        event.data.originalEvent.preventDefault();
    });
    background.addListener("mouseup", function (event: PIXI.interaction.InteractionEvent) {
        if (state.localPlayer) state.localPlayer.attacking = false;
        event.stopPropagation();
        event.data.originalEvent.preventDefault();
    });
    background.addListener("rightdown", function (event: PIXI.interaction.InteractionEvent) {
        if (state.localPlayer) state.localPlayer.special(event.data.getLocalPosition(stage));
        state.socket.send("special", event.data.getLocalPosition(stage));
        event.stopPropagation();
        event.data.originalEvent.preventDefault();
    });
}

export function update(deltaTime: number) {
    let direction = Vector.zero;
    if (keyW.isDown) {
        direction.y -= 1;
    }
    if (keyA.isDown) {
        direction.x -= 1;
    }
    if (keyS.isDown) {
        direction.y += 1;
    }
    if (keyD.isDown) {
        direction.x += 1;
    }
    if (direction.magnitude != 0 && state.localPlayer) {
        state.localPlayer.move(direction)
    }
    if (state.localPlayer && state.localPlayer.attacking) {
        state.localPlayer.attack(state.localPlayer.target);
        state.socket.send("attack", state.localPlayer.target);
    }
}

