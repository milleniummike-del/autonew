const filepath = "x:\\inputmixed\\PoolsideDreamsLSM4416_split_pieces_42_parts\\";
const downloadDir = "x:\\inputimages\\gentubepull";
const path = require('path');
function waitForKeypress() {
    return new Promise(resolve => {
        console.log('\nPress any key to continue');

        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }

        process.stdin.resume();

        process.stdin.once('data', () => {
            if (process.stdin.isTTY) {
                process.stdin.setRawMode(false);
            }

            process.stdin.pause();
            resolve();
        });
    });
}
module.exports = {
    filepath,
    downloadDir,
    waitForKeypress
};
