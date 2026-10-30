const { filepath } = require('./environment');
const { execFile } = require('child_process');
const path = require('path');

const scriptPath2 = path.join(__dirname, 'ps_merge_videos.ps1');
const workingDirectory2 = filepath + "\\chop\\";

execFile('powershell.exe', [
    '-NoProfile',
    '-ExecutionPolicy', 'Bypass',
    '-File', scriptPath2,
    workingDirectory2
], (error, stdout, stderr) => {

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);

    if (error) {
        console.error('PowerShell error:', error.message);
        return;
    }

    console.log('Video processing completed.');
});