import * as assert from "assert";
import { parseStsJson } from "../../extension";

suite("Extension Test Suite", () => {
  test("Unescape", () => {
    const textIn = '{"DecodedMessage": "{\\"allowed\\":false}\\"}';
    const expected = '{"DecodedMessage": {"allowed":false}}';
    assert.equal(expected, parseStsJson(textIn));
  });
});
