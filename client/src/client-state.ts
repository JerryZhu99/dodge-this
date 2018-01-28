import State from "shared/state";
import PlayerObject from "player-object";
import { Container } from "pixi.js";
import { stage } from "game";
import Player from "shared/player";
import ProjectileObject from "projectile-object";
import { Vector, Coord } from "shared/math-utils";
import Projectile from "shared/projectile";
import SocketWrapper from "shared/socket-wrapper";
SocketWrapper.webSocketClass = WebSocket;

export default class ClientState extends State {
    localPlayer: PlayerObject;

    players: PlayerObject[];
    projectiles: ProjectileObject[];

    playersContainer: Container;
    projectilesContainer: Container;

    socket: SocketWrapper;

    constructor() {
        super();
        this.playersContainer = new Container();
        this.projectilesContainer = new Container();

        this.socket = new SocketWrapper(new WebSocket(`ws://${location.host}`));

        this.socket.on("state", this.deserialize.bind(this));
        let that = this;
        this.socket.on("local player", function (player: any) {
            that.localPlayer = that.players.find((p: PlayerObject) => (p.id == player.id));
            if (!that.localPlayer) {
                that.localPlayer = that.createPlayer(player.position, player.team);
                that.localPlayer.id = player.id;

                that.addPlayer(that.localPlayer);
            }
            that.localPlayer.isLocalPlayer = true;
        })
    }
    init() {
        stage.addChild(this.projectilesContainer);
        stage.addChild(this.playersContainer);
    }
    destroy(){
        this.playersContainer.destroy();
        this.projectilesContainer.destroy();
    }
    createPlayer(p: Coord, team: number) {
        return new PlayerObject(new Vector(p), team);
    }
    addPlayer(p: PlayerObject) {
        super.addPlayer(p);
        this.playersContainer.addChild(p.display);
    }
    removePlayer(p: PlayerObject) {
        super.removePlayer(p);
        this.playersContainer.removeChild(p.display);
    }

    createProjectile(p: Vector, v: Vector, team: number) {
        return new ProjectileObject(p, v, team);
    }

    addProjectile(p: ProjectileObject) {
        super.addProjectile(p);
        this.projectilesContainer.addChild(p.display);
    }
    removeProjectile(p: ProjectileObject) {
        super.removeProjectile(p);
        this.projectilesContainer.removeChild(p.display);
    }
}