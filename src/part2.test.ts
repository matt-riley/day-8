import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";
import { getGcd, getLcm, getResult } from "./part2";

describe("Part 2", () => {
  describe("getGcd", () => {
    it("returns the greatest common divisor of two numbers", () => {
      const a = 12;
      const b = 15;
      const expected = 3;
      const actual = getGcd(a, b);
      assert.strictEqual(actual, expected);
    });
  });
  describe("getLcm", () => {
    it("returns the least common multiple of two numbers", () => {
      const a = 12;
      const b = 15;
      const expected = 60;
      const actual = getLcm(a, b);
      assert.strictEqual(actual, expected);
    });
  });
  describe("getResult", () => {
    it("solves the puzzle using the input file", () => {
      const input = fs.readFileSync("./src/input.txt", "utf-8");
      const expected = 21083806112641;
      const actual = getResult(input);
      assert.strictEqual(actual, expected);
    });
  });
});
