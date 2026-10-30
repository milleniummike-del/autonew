const { filepath } = require('./environment');
const { execFile } = require('child_process');
const path = require('path');

const workingDirectory1 = filepath+"\\4.mp4";
const scriptPath1 = path.join(__dirname, 'ps_cutvideo_file.ps1');

execFile('powershell.exe', [
    '-NoProfile',
    '-ExecutionPolicy', 'Bypass',
    '-File', scriptPath1,
    workingDirectory1
], (error, stdout, stderr) => {

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);

    if (error) {
        console.error('PowerShell error:', error.message);
        return;
    }

    console.log('Video processing completed.');
});