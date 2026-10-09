const { execFileSync } = require('child_process');
const path = require('path');

console.log('Checking submodule metadata for GitHub Pages checkout...');

execFileSync('git', ['submodule', 'status', '--recursive'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
});

console.log('PASS: All tracked submodules have valid metadata.');
