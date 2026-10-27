import assert from "node:assert/strict";
import test from "node:test";
import { advantageStep } from "../src/lib/advantage-scroll.ts";

test("all five snap positions select the corresponding benefit in both directions", () => {
  let selected = 0;
  for (const index of [0, 1, 2, 3, 4, 3, 2, 1, 0]) {
    selected = advantageStep(index / 4, selected, 5);
    assert.equal(selected, index);
  }
});

test("small trackpad movements do not flicker at a step boundary", () => {
  let selected = 0;
  for (const progress of [0.12, 0.13, 0.124, 0.14]) {
    selected = advantageStep(progress, selected, 5);
    assert.equal(selected, 0);
  }
  selected = advantageStep(0.15, selected, 5);
  assert.equal(selected, 1);
  for (const progress of [0.14, 0.13, 0.12, 0.11]) {
    selected = advantageStep(progress, selected, 5);
    assert.equal(selected, 1);
  }
  assert.equal(advantageStep(0.1, selected, 5), 0);
});

test("fast scrolling, restored positions and endpoints remain valid", () => {
  assert.equal(advantageStep(0.9, 0, 5), 4);
  assert.equal(advantageStep(0.05, 4, 5), 0);
  assert.equal(advantageStep(0.5, 0, 5, true), 2);
  assert.equal(advantageStep(-0.2, 4, 5), 0);
  assert.equal(advantageStep(1.2, 0, 5), 4);
});
