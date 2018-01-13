import { Point, Application, Container, Rectangle, Sprite, Graphics } from "pixi.js";

import Time from "time";
import Player from "player";

import * as Controls from "controls";  
import Projectile from "projectile";

export var app: Application;
export var background: Container;
export var stage: Container;
export var player: Player;
export var projectiles: Container;

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

    player = new Player(new Point(0, 0));
    projectiles = new Container();
    stage.addChild(player);
    stage.addChild(projectiles);
    app.ticker.add(Controls.update);
    app.ticker.add(player.update.bind(player));
    app.ticker.add(function(deltaTime){
        projectiles.children.forEach((e:Projectile)=>e.update(deltaTime))
    })
}


