Write-Host "Installing Chocolatey apps..."
choco install mongodb -y
choco install nodejs-lts -y
choco install terraform -y
choco install vscode -y
choco install yarn -y

Write-Host "Pinning VS Code, as it will update itself..."
choco pin add -n=vscode

Write-Host "Done!"
