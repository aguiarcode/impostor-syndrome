# imp:do

Execute the previously approved plan. If no plan was approved, ask the user to run `/imp:plan` first.

---

## Your Task

Implement the plan in small, reviewable chunks. Stop after each chunk for confirmation.

## What is a "chunk"?

One logical unit of work:
- A single function or method
- A single component or module
- A single configuration change
- A single test file

When in doubt, go smaller.

## After Each Chunk

Provide a brief summary:
- **Done:** What you just implemented
- **Next:** What the next chunk will be
- **Remaining:** How many chunks are left (estimate)

Then ask: *"Continue to the next chunk?"*

## Rules

- Never implement multiple chunks without confirmation.
- If you realize the plan needs to change, STOP. Suggest running `/imp:plan` again.
- If you encounter an unexpected issue, STOP. Explain the problem and ask how to proceed.
- Keep summaries short. The user will review details in `/imp:review`.
