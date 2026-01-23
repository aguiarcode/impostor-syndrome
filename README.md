# impostor-syndrome

[![npm version](https://img.shields.io/npm/v/@aguiarcode/impostor-syndrome.svg)](https://www.npmjs.com/package/@aguiarcode/impostor-syndrome)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Using AI to write code always made me feel like an impostor. This project accepts the discomfort and turns it into a minimal, explicit workflow.

**Requires [Claude Code](https://docs.anthropic.com/en/docs/claude-code)** - Anthropic's official CLI tool. These commands won't work in the Claude web interface or API.

These commands / meta-prompts shine brightest when you already know how to code. Their real power is acceleration and structure - not teaching fundamentals. If you're still learning syntax, debugging patterns, or system design, the value drops sharply.

**Full human control is non-negotiable.**

## Installation

```bash
npx @aguiarcode/impostor-syndrome
```

After install, open Claude Code in your project and type `/imp:help` to confirm.

## Options

| Flag | Description |
|------|-------------|
| `--global` | Install commands to `~/.claude/commands/imp/` (available in every project) |
| `--local` | Install to current project's `./.claude/commands/imp/` (default) |
| `--uninstall` | Remove installed commands from target directory |
| `--force` | Overwrite existing files without prompting |
| `--dry-run` | Preview what will be installed/uninstalled without making changes |
| `--help`, `-h` | Show help message |

### Examples

```bash
# Install locally (default)
npx @aguiarcode/impostor-syndrome

# Install globally (available in all projects)
npx @aguiarcode/impostor-syndrome --global

# Preview installation without making changes
npx @aguiarcode/impostor-syndrome --dry-run

# Force overwrite existing files
npx @aguiarcode/impostor-syndrome --force

# Remove local installation
npx @aguiarcode/impostor-syndrome --uninstall

# Remove global installation
npx @aguiarcode/impostor-syndrome --global --uninstall
```

## Commands

| Command | Purpose |
|---------|---------|
| `/imp:plan` | Describe what you want. AI proposes approach. No code yet. |
| `/imp:do` | AI executes approved plan in small chunks. |
| `/imp:review` | AI shows what changed. You accept, reject, or tweak. |
| `/imp:help` | Quick reference for all commands. |

## Workflow

```
You think -> /imp:plan -> approve? -> /imp:do -> /imp:review -> accept?
                 |                                    |
                 v                                    v
              refine                                tweak
```

## Philosophy

- **Minimalism beats complexity** - The prompt should be short enough to fully understand at a glance.

- **Explicit control over implicit automation** - Nothing should happen without your approval or awareness.

- **Discomfort is a signal, not a flaw** - Impostor syndrome isn't ignored here - it's the reason the system exists.

## License

MIT
