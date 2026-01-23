#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);

// Handle --help flag
if (args.includes('--help') || args.includes('-h')) {
    console.log(`
impostor-syndrome - Minimal AI workflow for developers

Usage:
  npx @aguiarcode/impostor-syndrome [options]

Options:
  --global    Install commands to ~/.claude/commands/imp/ (available in every project)
  --local     Install to current project's ./.claude/commands/imp/ (default)
  --help, -h  Show this help message

After install, open Claude Code and type /imp:help to confirm.
`);
    process.exit(0);
}

const isGlobal = args.includes('--global');

const targetDir = isGlobal
    ? path.join(os.homedir(), '.claude', 'commands', 'imp')
    : path.join(process.cwd(), '.claude', 'commands', 'imp');

const commands = ['plan.md', 'do.md', 'review.md', 'help.md'];
const sourceDir = path.join(__dirname, '..', 'commands', 'imp');

// Create target directory recursively
function mkdirRecursive(dir) {
    if (!fs.existsSync(dir)) {
        mkdirRecursive(path.dirname(dir));
        fs.mkdirSync(dir);
    }
}

// Copy files
function install() {
    console.log(`\nInstalling impostor-syndrome commands...`);
    console.log(`Target: ${targetDir}\n`);

    try {
        mkdirRecursive(targetDir);

        let copied = 0;
        for (const cmd of commands) {
            const src = path.join(sourceDir, cmd);
            const dest = path.join(targetDir, cmd);

            if (!fs.existsSync(src)) {
                console.log(`  [SKIP] ${cmd} - source not found`);
                continue;
            }

            fs.copyFileSync(src, dest);
            console.log(`  [OK] ${cmd}`);
            copied++;
        }

        console.log(`\n${copied}/${commands.length} commands installed.`);

        if (copied > 0) {
            console.log(`\nNext steps:`);
            console.log(`  1. Open Claude Code in your project`);
            console.log(`  2. Type /imp:help to see available commands`);
            console.log(`  3. Start with /imp:plan to describe what you want to build\n`);
        }

    } catch (err) {
        console.error(`\nInstallation failed: ${err.message}`);
        process.exit(1);
    }
}

install();
