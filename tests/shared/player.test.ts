import * as chai from "chai";
import Player from "shared/player";
import { Vector } from "shared/math-utils";
import State from "shared/state";
import { version } from "../../node_modules/@types/react/index";

chai.should();

describe("Players", function () {
    let p: Player;
    beforeEach(function () {
        p = new Player(Vector.zero, 0);
        p.state = new State();
        p.id = "id";
    })
    it("should exist", function () {
        Player.should.exist;
    });
    describe("Basic Tests", function () {

        it("player should update velocity on move", function () {
            p.move(Vector.coords(3, 4));
            p.velocity.magnitude.should.be.approximately(p.maxSpeed, 0.0001);
        });
        it("player should fail to attack without cooldown", function () {
            p.attackTime = p.attackCooldown;
            p.attack(Vector.coords(1, 0));
            p.state.projectiles.should.be.empty;
        });
        it("player should create a projectile on attack", function () {
            p.attack(Vector.coords(1, 0));
            p.state.projectiles.should.have.length(1);
            p.state.projectiles[0].velocity.x.should.equal(p.projectileSpeed);
            p.state.projectiles[0].velocity.y.should.equal(0);
        });
        it("player should fail to use special without cooldown", function () {
            p.specialTime = p.specialCooldown;
            p.special(Vector.coords(1, 0));
            p.state.projectiles.should.be.empty;
        });
        it("player should create projectiles on special", function () {
            p.special(Vector.coords(1, 0));
            p.state.projectiles.should.have.length(7);
        });
    });
    describe("Update Tests", function () {
        it("player should move on update", function () {
            p.move(Vector.coords(1, 0));
            p.update(1);
            p.position.x.should.equal(p.maxSpeed);
        });
        it("velocity should decay on update", function () {
            p.move(Vector.coords(1, 0));
            p.update(1);
            p.velocity.x.should.equal(p.maxSpeed * p.speedDecay);
        });
    });
    describe("Serialization", function () {
        it("should work with JSON.stringify", function () {
            JSON.stringify(p.serialize()).should.be.a("string");
        })
        describe("Properties", function () {
            it("should have id", function () {
                p.serialize().id.should.exist.and.equal(p.id);
            });
            it("should have a team", function () {
                p.serialize().team.should.exist.and.equal(p.team);
            });
            it("should have attack cooldown", function () {
                p.serialize().attackTime.should.exist.and.equal(p.attackTime);
            });
            it("should have special cooldown", function () {
                p.serialize().specialTime.should.exist.and.equal(p.specialTime);

            });
            it("should have position and velocity", function () {
                let serializedData = p.serialize();
                serializedData.position.should.deep.equal(p.position);
                serializedData.velocity.should.deep.equal(p.velocity);
            });
        });
        describe("Deserialization", function(){
            let data: any;
            beforeEach(function(){
                data = {
                    id: "id",
                    position: Vector.coords(1,1),
                    velocity: Vector.coords(1,0),
                    attackTime: 1,
                    specialTime: 1,
                    team: 2
                }
            });
            it("should set properties", function(){
                p.deserialize(data);
                p.position.should.deep.equal(data.position);
                p.velocity.should.deep.equal(data.velocity);
                p.attackTime.should.equal(data.attackTime);
                p.specialTime.should.equal(data.specialTime);
                p.team.should.equal(data.team);
            })
        })
    });
});