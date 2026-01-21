const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const isGlobal = args.includes('--global');

const targetDir = isGlobal
    ? path.join(os.homedir(), '.claude', 'commands', 'imp')
    : path.join(process.cwd(), '.claude', 'commands', 'imp');

const commands = ['plan.md', 'do.md', 'review.md', 'help.md'];
const sourceDir = path.join(path.dirname(require.main.filename), '..', 'commands');
