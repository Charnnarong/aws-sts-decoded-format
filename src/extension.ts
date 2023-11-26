// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "aws-sts-decoded-format" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
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
  const selection = editor.selection;
  const text = editor.document.getText(selection.isEmpty ? undefined : selection);

  // Perform the replacement
  const replacedText = parseStsJson(text);

  // Apply the changes to the editor
  editor.edit((editBuilder) => {
    if (selection.isEmpty) {
      // Replace the entire document
      const documentEnd = editor.document.lineAt(editor.document.lineCount - 1).range.end;
      editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), documentEnd), replacedText);
    } else {
      // Replace the selected text
      editBuilder.replace(selection, replacedText);
    }
  });
};

export const parseStsJson = (text: string): string => {
  return text.replace(/\\"/g, '"').replace(/"{/g, "{").replace(/}"/g, "}");
};
