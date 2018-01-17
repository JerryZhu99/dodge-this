import * as Keyboard from "keyboard";

import {app, stage, player, background} from "game"
import { Vector } from "./../../shared/math-utils";

var keyW = Keyboard.key(Keyboard.keyCode("W"));
var keyA = Keyboard.key(Keyboard.keyCode("A"));
var keyS = Keyboard.key(Keyboard.keyCode("S"));
var keyD = Keyboard.key(Keyboard.keyCode("D"));
var keyP = Keyboard.key(Keyboard.keyCode("P"));
var keySpace = Keyboard.key(32)

keyP.press = function(){
    let canvas = (<any>app.view);
    if(canvas.requestFullscreen){
        canvas.requestFullscreen();
    }
    if(canvas.mozRequestFullScreen){
        canvas.mozRequestFullScreen();
    }
    if(canvas.webkitRequestFullScreen){
        canvas.webkitRequestFullScreen();
    }
    if(canvas.msRequestFullScreen){
        canvas.msRequestFullScreen();
    }
}

export function init(){
    background.interactive = true;
    app.view.ondragover = function(e){e.preventDefault(); return false;};
    app.view.ondrop = function(e){e.preventDefault(); return false;};
    app.view.oncontextmenu = function(e){e.preventDefault(); return false;};
    background.addListener("mousedown", function(event: PIXI.interaction.InteractionEvent){
        player.attack(event.data.getLocalPosition(stage));
        event.stopPropagation();
        event.data.originalEvent.preventDefault();
    });
    background.addListener("rightdown", function(event: PIXI.interaction.InteractionEvent){
        player.attack(event.data.getLocalPosition(stage));
        event.stopPropagation();
        event.data.originalEvent.preventDefault();
    });
}

export function update(deltaTime: number){
    player.velocity.scale(Math.pow(0.96, deltaTime));
    if(keyW.isDown){
        player.velocity.y -= 10 * deltaTime;
    }
    if(keyA.isDown){
        player.velocity.x -= 10 * deltaTime;
    }
    if(keyS.isDown){
        player.velocity.y += 10 * deltaTime;
    }
    if(keyD.isDown){
        player.velocity.x += 10 * deltaTime;
    }
    if(player.velocity.magnitude > 10)player.velocity.length(10);
}

