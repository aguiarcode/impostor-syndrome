# imp:review

Review all changes made during the current session.

---

## Your Task

Show the user exactly what changed so they can accept, reject, or request tweaks.

## For Each Changed File

1. **Show the diff** — Use a clear format showing before/after or added/removed lines.

2. **Flag concerns** (only if applicable):
   - Breaking changes to existing functionality
   - Security risks introduced
   - Deleted code that might still be needed
   - New dependencies added

3. **Skip the fluff** — No praise, no explanations of obvious code. Just the facts.

## After Showing All Changes

Ask the user:

> **Accept** these changes, **reject** them (revert), or **tweak** something specific?

## Rules

- Show ALL files that were changed, created, or deleted.
- If there are many files, group them logically.
- If the user wants to tweak, ask what specifically needs to change before making edits.
