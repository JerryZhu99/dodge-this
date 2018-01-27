import * as chai from "chai";
import {
    Vector,
    Coord
} from "shared/math-utils";

chai.should();

describe("Vectors", function () {
    it("should exist", function () {
        Vector.should.exist;
    });
    it("should clone", function () {
        let a = Vector.coords(0, 0);
        a.clone().should.not.equal(a);
        a.clone().should.deep.equal(a);
    });
    it("should add", function () {
        let a = Vector.coords(1, -2);
        let b = Vector.coords(3, 5);
        a.add(b);
        a.x.should.equal(4);
        a.y.should.equal(3);
    });
    it("should rotate", function () {
        let a = Vector.coords(1, 2);
        a.rotate(90);
        a.x.should.be.approximately(-2, 0.0001);
        a.y.should.be.approximately(1, 0.0001);
    });
    it("should scale", function () {
        let a = Vector.coords(2, 4);
        a.scale(1.5);
        a.x.should.equal(3);
        a.y.should.equal(6);
    });
    it("should create a scaled clone", function () {
        let a = Vector.coords(2, 4);
        a.should.not.change;
        let b = a.scaled(1.5);
        b.x.should.equal(3);
        b.y.should.equal(6);
    });
    it("should set length", function () {
        let a = Vector.coords(3, 4);
        a.length(10).should.equal(a);
        a.x.should.equal(6);
        a.y.should.equal(8);
    });
    it("should return magnitude", function () {
        let a = Vector.coords(3, 4);
        a.magnitude.should.equal(5);
    });
    it("should set magnitude", function () {
        let a = Vector.coords(3, 4);
        a.magnitude = 10;
        a.x.should.equal(6);
        a.y.should.equal(8);
    });
    it("should create a normalized clone", function (){
        let a = Vector.coords(3, 4);
        let b = a.normalized();
        b.should.not.equal(a);
        b.magnitude.should.be.approximately(1, 0.0001);
    });
    it("should normalize", function (){
        let a = Vector.coords(3, 4);
        a.normalize().should.equal(a);
        a.magnitude.should.be.approximately(1, 0.0001);
    });
    it("should calculate distance to another", function (){
        let a = Vector.coords(3, 4);
        let b = Vector.coords(0, 8);
        a.distanceTo(b).should.be.approximately(5, 0.0001);
    });
})