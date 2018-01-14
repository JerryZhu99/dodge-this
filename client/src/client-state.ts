import State from "../../shared/state";
import PlayerObject from "./player-object";
import { Container } from "pixi.js";
import { stage } from "./game";
import Player from "../../shared/player";
import ProjectileObject from "./projectile-object";
import { Vector } from "../../shared/math-utils";


export default class ClientState extends State{
    playersContainer: Container;
    projectilesContainer: Container;
    constructor(){
        super();
        this.playersContainer = new Container();
        this.projectilesContainer = new Container();
    }
    init(){
        stage.addChild(this.playersContainer);
        stage.addChild(this.projectilesContainer);
    }
    addPlayer(p: PlayerObject){
        super.addPlayer(p);
        this.playersContainer.addChild(p.display);
    }
    removePlayer(p: PlayerObject){
        super.removePlayer(p);
        this.playersContainer.removeChild(p.display);
    }

    createProjectile(p: Vector, v: Vector){
        return new ProjectileObject(p, v);
    }

    addProjectile(p: ProjectileObject){
        super.addProjectile(p);
        this.projectilesContainer.addChild(p.display);
    }
    removeProjectile(p: ProjectileObject){
        super.removeProjectile(p);
        this.projectilesContainer.removeChild(p.display);
    }
}