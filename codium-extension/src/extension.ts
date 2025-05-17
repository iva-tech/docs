import * as vscode from 'vscode'
import * as path from 'path'
import { execSync } from 'child_process'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('hedgedoc.open', () => {
      vscode.window.showInformationMessage('HedgeDoc extension active!')
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('hedgedoc.editFile', async () => {
      const repoPath = vscode.workspace
        .getConfiguration('hedgedoc')
        .get<string>('CompanyGitID')
      if (!repoPath) {
        vscode.window.showErrorMessage('CompanyGitID not configured')
        return
      }
      const fileName = await vscode.window.showInputBox({
        prompt: 'Enter file name to edit',
      })
      if (!fileName) {
        return
      }
      const fullPath = path.join(repoPath, fileName)
      const doc = await vscode.workspace.openTextDocument(fullPath)
      vscode.window.showTextDocument(doc)
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('hedgedoc.saveToGit', async () => {
      const repoPath = vscode.workspace
        .getConfiguration('hedgedoc')
        .get<string>('CompanyGitID')
      const editor = vscode.window.activeTextEditor
      if (!repoPath || !editor) {
        vscode.window.showErrorMessage('Cannot save to git')
        return
      }
      const fileName = path.basename(editor.document.fileName)
      try {
        editor.document.save()
        execSync(`git -C ${repoPath} add ${fileName}`)
        execSync(`git -C ${repoPath} commit -m "Update ${fileName}"`)
        vscode.window.showInformationMessage('Document committed to git')
      } catch (err) {
        vscode.window.showErrorMessage('Git commit failed: ' + err)
      }
    })
  )
}

export function deactivate() {}
