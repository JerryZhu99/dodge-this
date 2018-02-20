import { testState } from "tests/shared/state.test";
import ClientState from "client/src/client-state";
import * as sinon from "sinon";
import * as WebSocket from "ws";

describe("Client State", function () {
    Object.defineProperty(global, "location", {
        value: {host: "localhost"}
    }); 
    Object.defineProperty(global, "WebSocket", {
        get: ()=>WebSocket
    }); 
    testState(function () {
        return new ClientState();
    });

    it("should have containers for display");
    it("should add the containers to the stage");
    it("should add and remove players from the container");
    it("should add and remove projectile sfrom the container");

    it("should listen for local player info");
    it("should listen for state update");
})