// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "react-classname-replacer" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  context.subscriptions.push(
    vscode.commands.registerCommand('react-classname-replacer.replace', replaceClassName),
  );
}

function replaceClassName() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  editor.selections.forEach((selection) => doReplace(selection, editor));
}

function doReplace(selection: vscode.Selection, editor: vscode.TextEditor) {
  const { line, character } = selection.active;

  const { range, content } = getSelection(editor.document, line, character);

  if (range && content) {
    console.log('🎯 Classes detected: ', vscode.window.activeTextEditor?.document.getText(range));
  } else {
    vscode.window.showErrorMessage(
      'Cannot replace content, please reposition the cursor and try again.',
    );

    return;
  }

  // Divide content by possible spaces, like "text-center button"
  const classNames = content.split(' ').filter((className) => className);

  let result: string;

  // Has only 1 class => className={styles['text-center']}
  if (classNames.length === 1) {
    result = convert(classNames[0]);
  }
  // Has more than 1 class => className={`${styles['text-center']} ${styles.button}`}
  else {
    result =
      '`' +
      classNames
        .map((className) => convert(className))
        .map((each) => `$\{${each}\}`)
        .join(' ') +
      '`';
  }

  editor.edit((eb) => eb.replace(range, `{${result}}`));
}

function getSelection(doc: vscode.TextDocument, line: number, column: number) {
  const OFFSET = 10; // The length of "className="
  const { text } = doc.lineAt(line);

  const matches = text.match(/\bclassName=["'`].*?["'`]/g);
  if (matches) {
    let target: string;
    let lastStartIndex = 0;

    // Find in which match is the cursor
    // match should be like: className="xxxx"
    for (const match of matches) {
      const startIndex = text.indexOf(match, lastStartIndex);
      if (startIndex <= column && column <= startIndex + match.length) {
        target = match;
        break;
      }
      lastStartIndex = startIndex;
    }

    const startIndex = text.indexOf(target!);
    const startPosition = new vscode.Position(line, startIndex + OFFSET);
    const endPosition = new vscode.Position(line, startIndex + target!.length);

    // Select the content
    return {
      range: new vscode.Range(startPosition, endPosition),
      content: target!.substring(1 + OFFSET, target!.length - 1),
    };
  }

  return { range: null, content: null };
}

function convert(content: string) {
  // if className contains '-', e.g. 'mt-2', convert it to styles['mt-2']
  if (content.includes('-')) {
    return `styles['${content}']`;
  }
  // else convert it to styles.mt
  return `styles.${content}`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
