import { Point, Application, Container, Rectangle, Sprite, Graphics } from "pixi.js";

import PlayerObject from "player-object";

import * as Controls from "controls";  
import ProjectileObject from "projectile-object";
import { Vector } from "../../shared/math-utils";

import State from "./../../shared/state";
import ClientState from "./client-state";

export var app: Application;
export var background: Container;
export var stage: Container;

export var player: PlayerObject;
export var state = new ClientState();

export function init(canvas: HTMLCanvasElement) {
    app = new PIXI.Application({
        width: 1600,
        height: 900,
        view: canvas,
        antialias: true
    })
    PIXI.autoDetectRenderer()
    background = new PIXI.Graphics().beginFill(0x000000).drawRect(0, 0, 3000, 3000);
    app.stage.addChild(background);
    stage = new Container();
    stage.x = (app.screen.width - stage.width) / 2;
    stage.y = (app.screen.height - stage.height) / 2;
    stage.scale = new Point(app.screen.height/1000, app.screen.height/1000);
    app.stage.addChild(stage);
    
    Controls.init();
    state.init();
    player = new PlayerObject(Vector.zero);
    player.isLocalPlayer = true;
    state.addPlayer(player);
    app.ticker.add(Controls.update);
    app.ticker.add(player.update.bind(player));
    app.ticker.add(function(deltaTime){
        state.projectiles.forEach(function(e:ProjectileObject){e.update(deltaTime)})
    })
}


