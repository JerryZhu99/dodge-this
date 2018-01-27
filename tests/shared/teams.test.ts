import * as chai from "chai";
import * as Teams from "shared/teams";
import Player from "../../shared/player";
import { Vector } from "../../shared/math-utils";

chai.should();

describe("Teams", function () {    
    it("should have colours", function () {
        Teams.teamColours.should.exist;
        Teams.teamColours.should.be.an("array");
    });
    it("should find the first team if there are no players", function () {
        Teams.getSmallestTeam([]).should.equal(1);
    });
    it("should find the first team with no players", function () {
        Teams.getSmallestTeam([new Player(Vector.zero, 1)]).should.equal(2);
        Teams.getSmallestTeam([new Player(Vector.zero, 2)]).should.equal(1);
    });
    it("should find the smallest team", function () {
        let players = [
            new Player(Vector.zero, 1),
            new Player(Vector.zero, 2),
            new Player(Vector.zero, 3),
            new Player(Vector.zero, 4),
            new Player(Vector.zero, 1),
            new Player(Vector.zero, 3),
        ]
        Teams.getSmallestTeam(players).should.equal(2);
    });
});