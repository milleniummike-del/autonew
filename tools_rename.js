const { execFile } = require('child_process');
const path = require('path');
const { downloadDir } = require('./environment');
const workingDirectory1 = downloadDir;
const scriptPath1 = path.join(__dirname, 'ps_rename_files.ps1');

execFile('powershell.exe', [
    '-NoProfile',
    '-ExecutionPolicy', 'Bypass',
    '-File', scriptPath1,
    '-InputFolder', workingDirectory1
], (error, stdout, stderr) => {

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);

    if (error) {
        console.error('PowerShell error:', error.message);
        return;
    }

    console.log('File rename complete.');
});