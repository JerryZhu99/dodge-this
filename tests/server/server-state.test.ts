import { testState } from "tests/shared/state.test";
import ServerState from "server/server-state";


describe("Server State", function () {
    testState(function () {
        return new ServerState();
    });
    it("should generate ids for players");
    it("should generate ids for projectiles");
    it("should check collisions and remove players");
    it("should add connections");
    it("should remove connections");
    it("should send state to all connections");

})