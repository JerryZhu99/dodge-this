import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import * as Teams from "shared/teams";
import State from "shared/state";
import { Vector } from "shared/math-utils";
import Projectile from "shared/projectile";
import Player from "shared/player";

chai.should();
chai.use(sinonChai);

describe("State", function () {
    testState(function () {
        return new State();
    });
})

export function testState(init: () => State) {
    let state: State;
    beforeEach(function(){
        state = init();
    });
    it("should have players and projectiles", function () {
        state.players.should.be.an("array");
        state.projectiles.should.be.an("array");
    });
    it("should create projectiles", function () {
        let projectile = state.createProjectile(Vector.coords(1, 1), Vector.coords(2, 0), 2);
        projectile.should.be.an.instanceOf(Projectile);
        projectile.position.x.should.equal(1);
        projectile.position.y.should.equal(1);
        projectile.velocity.x.should.equal(2);
        projectile.velocity.y.should.equal(0);
        projectile.team.should.equal(2);
    });
    it("should add existing projectiles", function () {
        let projectile = state.createProjectile(Vector.coords(1, 1), Vector.coords(2, 0), 2);
        state.addProjectile(projectile);
        projectile.state.should.equal(state);
        state.projectiles.should.contain(projectile);
    });
    it("should remove projectiles", function () {
        let projectile1 = state.createProjectile(Vector.coords(1, 1), Vector.coords(2, 0), 2);
        let projectile2 = state.createProjectile(Vector.coords(2, 2), Vector.coords(1, 1), 1);
        state.addProjectile(projectile1);
        state.addProjectile(projectile2);
        state.removeProjectile(projectile1);
        state.projectiles.should.have.length(1);
        state.projectiles.should.not.contain(projectile1);
        state.projectiles.should.contain(projectile2);
    });
    it("should not remove projectiles it does not have", function () {
        let projectile1 = state.createProjectile(Vector.coords(1, 1), Vector.coords(2, 0), 2);
        let projectile2 = state.createProjectile(Vector.coords(2, 2), Vector.coords(1, 1), 1);
        state.addProjectile(projectile1);
        state.removeProjectile(projectile2);
        state.projectiles.should.have.length(1);
        state.projectiles.should.contain(projectile1);
        state.projectiles.should.not.contain(projectile2);
    });
    it("should create players", function () {
        let player = state.createPlayer(Vector.coords(1, 1), 2);
        player.should.be.an.instanceOf(Player);
        player.position.x.should.equal(1);
        player.position.y.should.equal(1);
        player.velocity.x.should.equal(0);
        player.velocity.y.should.equal(0);
        player.team.should.equal(2);
    });
    it("should add existing players", function () {
        let player = state.createPlayer(Vector.coords(2, 0), 2);
        state.addPlayer(player);
        player.state.should.equal(state);
        state.players.should.contain(player);
    });
    it("should remove players", function () {
        let player1 = state.createPlayer(Vector.coords(1, 1), 2);
        let player2 = state.createPlayer(Vector.coords(2, 2), 1);
        state.addPlayer(player1);
        state.addPlayer(player2);
        state.removePlayer(player1);
        state.players.should.have.length(1);
        state.players.should.not.contain(player1);
        state.players.should.contain(player2);
    });
    it("should not remove players it does not have", function () {
        let player1 = state.createPlayer(Vector.coords(1, 1), 2);
        let player2 = state.createPlayer(Vector.coords(2, 2), 1);
        state.addPlayer(player1);
        state.removePlayer(player2);
        state.players.should.have.length(1);
        state.players.should.contain(player1);
        state.players.should.not.contain(player2);
    });
    it("should update all players and projectiles.", function () {
        let projectile1 = state.createProjectile(Vector.coords(1, 1), Vector.coords(2, 0), 2);
        let player1 = state.createPlayer(Vector.coords(1, 1), 2);
        let projectileUpdate = sinon.spy(projectile1, "update");
        let playerUpdate = sinon.spy(player1, "update");
        state.addProjectile(projectile1);
        state.addPlayer(player1);
        state.update(0.5);
        projectileUpdate.should.have.been.calledOnce;
        projectileUpdate.should.have.been.calledWith(0.5);
        playerUpdate.should.have.been.calledOnce;
        playerUpdate.should.have.been.calledWith(0.5);
    });
    it("should constrain player positions to the map");
    it("should remove dead players");
    it("should serialize and deserialize");
}
