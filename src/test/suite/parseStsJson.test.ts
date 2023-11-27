import * as assert from "assert";
import * as vscode from "vscode";
import { parseStsJson } from "../../extension";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  test("ParseStsJson", () => {
    const textIn = '{"DecodedMessage": "{\\"allowed\\":false}\\"}';
    const expected = '{"DecodedMessage": {"allowed":false}}';
    assert.equal(expected, parseStsJson(textIn));
  });
});
