import Projectile from "projectile";
import Player from "./player";
import {
    Vector, Coord
} from "./math-utils";

/**
 * Describes the state of the game.
 */
export default class State {
    players: Array<Player>;
    projectiles: Array<Projectile>;

    constructor() {
        this.players = new Array < Player > ();
        this.projectiles = new Array < Projectile > ();
    }

    /**
     * Instantiates a new projectile.
     */
    createProjectile(p: Vector, v: Vector) {
        return new Projectile(p, v);
    }

    /**
     * Adds a projectile to the game state.
     * @param p The projectile to add.
     */
    addProjectile(p: Projectile) {
        this.projectiles.push(p);
        p.state = this;
    }

    /**
     * Removes a projectile from the game state.
     * @param p The projectile to remove.
     */
    removeProjectile(p: Projectile) {
        this.projectiles.splice(this.projectiles.indexOf(p), 1);
    }

    createPlayer(p: Coord){
        return new Player(p);
    }
    /**
     * Adds a player to the game state.
     * @param p The player to add.
     */
    addPlayer(p: Player) {
        this.players.push(p);
        p.state = this;
    }

    /**
     * Removes a player from the game state.
     * @param p The player to remove.
     */
    removePlayer(p: Player) {
        this.players.splice(this.players.indexOf(p), 1);
    }

    /**
     * Updates all players and projectiles.
     * @param deltaTime 
     */
    update(deltaTime: number) {
        this.players.forEach(e => e.update(deltaTime));
        this.projectiles.forEach(e => e.update(deltaTime));
    }

    serialize() {
        return {
            players: this.players.map(p => p.serialize()),
            projectiles: this.projectiles.map(p => p.serialize()),
        };
    }
    deserialize(data: any) {
        let newPlayers = data.players.filter((x: Player) => (
            this.players.every((y: Player) => (x.id != y.id))
        ));
        let removedPlayers = this.players.filter((x: Player) => (
            data.players.every((y: Player) => (x.id != y.id))
        ));

        for (const player of removedPlayers) {
            this.removePlayer(player);
        }
        for (const player of this.players) {
            let newPlayerData = data.players.find((y: Player) => y.id == player.id);
            if(newPlayerData) player.deserialize(newPlayerData);
        }
        for (const newPlayer of newPlayers) {
            let player = this.createPlayer(newPlayer.position);
            player.id = newPlayer.id;
            this.addPlayer(player);
        }
        let newProjectiles = data.projectiles.filter((x: Projectile) => (
            this.projectiles.every((y: Projectile) => (x.id != y.id))
        ));
        let removedProjectiles = this.projectiles.filter((x: Projectile) => (data.projectiles.every(
            (y: Projectile) => (x.id != y.id))));

        for (const projectile of removedProjectiles) {
            this.removeProjectile(projectile);
        }

        for (const projectile of this.projectiles) {
            let newProjectileData = data.projectiles.find((y: Projectile) => y.id == projectile.id);
            if(newProjectileData) projectile.deserialize(newProjectileData);
        }

        for (const newProjectile of newProjectiles) {
            let projectile = this.createProjectile(new Vector(newProjectile.position), new Vector(newProjectile.velocity));
            projectile.id = newProjectile.id;
            this.addProjectile(projectile);
        }
    }
}