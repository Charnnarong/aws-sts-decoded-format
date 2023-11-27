import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("aws-sts-decoded-format.format", () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      unescape(editor);
      vscode.languages.setTextDocumentLanguage(editor.document, "json");
    }

    vscode.commands.executeCommand("editor.action.formatDocument");
  });

  context.subscriptions.push(disposable);
}

const unescape = (editor: vscode.TextEditor) => {
  if (!editor) {
    return;
  }

  let selection: vscode.Range | vscode.Selection = editor.selection;
  if (selection.isEmpty) {
    selection = entireDocumentRange(editor);
  }

  editor.edit((editBuilder) => {
    const text = editor.document.getText(selection);
    editBuilder.replace(selection, parseStsJson(text));
  });
};

const entireDocumentRange = (editor: vscode.TextEditor) => {
  return new vscode.Range(new vscode.Position(0, 0), documentEnd(editor));
};

const documentEnd = (editor: vscode.TextEditor) => {
  return editor.document.lineAt(editor.document.lineCount - 1).range.end;
};

export const parseStsJson = (text: string): string => {
  return text.replace(/\\"/g, '"').replace(/"{/g, "{").replace(/}"/g, "}");
};
