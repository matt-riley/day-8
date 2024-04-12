import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";
import {
  getDirections,
  getNodes,
  getNextNode,
  getResult,
  LeftRight,
} from "./part1";

describe("Part 1", () => {
  describe("getDirections", () => {
    it("returns an array of 0s (Left) and 1s (Right)", () => {
      const input = "LRLR\n\n";
      const expected = [0, 1, 0, 1];
      const actual = getDirections(input);
      assert.deepStrictEqual(actual, expected);
    });
    it("throws an error when a character in the directions list is not L or R", () => {
      const input = "LRLRX\n\n";
      assert.throws(() => getDirections(input));
    });
  });
  describe("getNodes", () => {
    it("returns an array of nodes", () => {
      const input = "LLR\n\nA = (B, C)\nB = (D, E)";
      const expected = [
        { name: "A", childNames: ["B", "C"] },
        { name: "B", childNames: ["D", "E"] },
      ];
      const actual = getNodes(input);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe("getNextNode", () => {
    it("returns the next node given the current node and the direction", () => {
      const nodes = [
        { name: "A", childNames: ["B", "C"] },
        { name: "B", childNames: ["D", "E"] },
      ];
      const currentNode = "A";
      const direction = LeftRight.Left;
      const expected = "B";
      const actual = getNextNode(nodes, currentNode, direction);
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe("getResult", () => {
    it("loops through the directions until it reaches the ZZZ node and returns the number of steps it took", () => {
      const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;
      const expected = 6;
      const actual = getResult(input);
      assert.strictEqual(actual, expected);
    });
    it("solves the puzzle using the input file", () => {
      const expected = 21389;
      const actual = getResult(fs.readFileSync("./src/input.txt", "utf-8"));
      assert.strictEqual(actual, expected);
    });
  });
});
