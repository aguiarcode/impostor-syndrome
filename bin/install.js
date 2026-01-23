#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);

// Parse flags
const flags = {
    help: args.includes('--help') || args.includes('-h'),
    global: args.includes('--global'),
    local: args.includes('--local'),
    uninstall: args.includes('--uninstall'),
    force: args.includes('--force'),
    dryRun: args.includes('--dry-run')
};

// Handle --help flag
if (flags.help) {
    console.log(`
impostor-syndrome - Minimal AI workflow for developers

Usage:
  npx @aguiarcode/impostor-syndrome [options]

Options:
  --global      Install commands to ~/.claude/commands/imp/ (available in every project)
  --local       Install to current project's ./.claude/commands/imp/ (default)
  --uninstall   Remove installed commands from target directory
  --force       Overwrite existing files without prompting
  --dry-run     Preview what will be installed/uninstalled without making changes
  --help, -h    Show this help message

Examples:
  npx @aguiarcode/impostor-syndrome                  # Install locally (default)
  npx @aguiarcode/impostor-syndrome --global         # Install globally
  npx @aguiarcode/impostor-syndrome --dry-run        # Preview installation
  npx @aguiarcode/impostor-syndrome --uninstall      # Remove local installation
  npx @aguiarcode/impostor-syndrome --global --uninstall  # Remove global installation

After install, open Claude Code and type /imp:help to confirm.
`);
    process.exit(0);
}

const targetDir = flags.global
    ? path.join(os.homedir(), '.claude', 'commands', 'imp')
    : path.join(process.cwd(), '.claude', 'commands', 'imp');

const commands = ['plan.md', 'do.md', 'review.md', 'help.md'];
const sourceDir = path.join(__dirname, '..', 'commands', 'imp');

/**
 * Uninstall command files from target directory
 */
function uninstall() {
    const mode = flags.dryRun ? '[DRY-RUN] ' : '';
    console.log(`\n${mode}Uninstalling impostor-syndrome commands...`);
    console.log(`Target: ${targetDir}\n`);

    if (!fs.existsSync(targetDir)) {
        console.log('Nothing to uninstall - target directory does not exist.');
        process.exit(0);
    }

    let removed = 0;
    for (const cmd of commands) {
        const filePath = path.join(targetDir, cmd);

        if (!fs.existsSync(filePath)) {
            console.log(`  [SKIP] ${cmd} - not found`);
            continue;
        }

        if (!flags.dryRun) {
            fs.unlinkSync(filePath);
        }
        console.log(`  [REMOVED] ${cmd}`);
        removed++;
    }

    // Try to remove empty directories (imp/, commands/, .claude/)
    if (!flags.dryRun) {
        try {
            // Remove imp/ if empty
            if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length === 0) {
                fs.rmdirSync(targetDir);
            }
            // Remove commands/ if empty
            const commandsDir = path.dirname(targetDir);
            if (fs.existsSync(commandsDir) && fs.readdirSync(commandsDir).length === 0) {
                fs.rmdirSync(commandsDir);
            }
            // Remove .claude/ if empty
            const claudeDir = path.dirname(commandsDir);
            if (fs.existsSync(claudeDir) && fs.readdirSync(claudeDir).length === 0) {
                fs.rmdirSync(claudeDir);
            }
        } catch (err) {
            // Ignore errors when cleaning up directories
        }
    }

    console.log(`\n${mode}${removed}/${commands.length} commands removed.`);
    if (flags.dryRun) {
        console.log('\nNo changes made (dry-run mode).\n');
    }
}

/**
 * Install command files to target directory
 */
function install() {
    const mode = flags.dryRun ? '[DRY-RUN] ' : '';
    console.log(`\n${mode}Installing impostor-syndrome commands...`);
    console.log(`Target: ${targetDir}\n`);

    try {
        // Create target directory using Node's built-in recursive option (Node 10.12+)
        if (!flags.dryRun) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        let copied = 0;
        let skipped = 0;

        for (const cmd of commands) {
            const src = path.join(sourceDir, cmd);
            const dest = path.join(targetDir, cmd);

            if (!fs.existsSync(src)) {
                console.log(`  [SKIP] ${cmd} - source not found`);
                continue;
            }

            // Check if destination exists and --force is not set
            if (fs.existsSync(dest) && !flags.force) {
                console.log(`  [EXISTS] ${cmd} - use --force to overwrite`);
                skipped++;
                continue;
            }

            if (!flags.dryRun) {
                fs.copyFileSync(src, dest);
            }

            const action = fs.existsSync(dest) && flags.force ? 'OVERWRITE' : 'OK';
            console.log(`  [${action}] ${cmd}`);
            copied++;
        }

        console.log(`\n${mode}${copied}/${commands.length} commands installed.`);

        if (skipped > 0) {
            console.log(`${skipped} file(s) skipped (already exist). Use --force to overwrite.`);
        }

        if (flags.dryRun) {
            console.log('\nNo changes made (dry-run mode).\n');
        } else if (copied > 0) {
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

// Run the appropriate action
if (flags.uninstall) {
    uninstall();
} else {
    install();
}
