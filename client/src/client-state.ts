import State from "shared/state";
import PlayerObject from "player-object";
import { Container } from "pixi.js";
import { stage } from "game";
import Player from "shared/player";
import ProjectileObject from "projectile-object";
import { Vector, Coord } from "shared/math-utils";
import Network from "client-network";


export default class ClientState extends State{
    localPlayer: PlayerObject;
    players: Array<PlayerObject>;
    playersContainer: Container;
    projectilesContainer: Container;
    constructor(){
        super();
        this.playersContainer = new Container();
        this.projectilesContainer = new Container();
        Network.on("state", this.deserialize.bind(this));
        let that = this;
        Network.on("local player", function(id: string){
            that.localPlayer = that.players.find((p: PlayerObject) => (p.id == id));
            if(!that.localPlayer){
                that.localPlayer = new PlayerObject(Vector.zero);
                that.localPlayer.id = id;
                that.addPlayer(that.localPlayer);
            }
            
            that.localPlayer.isLocalPlayer = true;
        })
    }
    init(){
        stage.addChild(this.playersContainer);
        stage.addChild(this.projectilesContainer);
    }
    createPlayer(p: Coord){
        return new PlayerObject(new Vector(p));
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