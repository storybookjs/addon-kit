# Agent Instructions for addon-kit

Keep this file, `AGENTS.md`, up to date when the repo's release tooling, workflows, or contributor guidance changes.

This file is the canonical instruction source for coding agents. `CLAUDE.md` points here instead of duplicating instructions.

## Release Process

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

```bash
pnpm changeset   # Create a changeset for your changes
pnpm release     # Run prerelease checks, build, and publish (CI handles this automatically)
```

**Before committing, always run the format script to avoid CI failures:**

```bash
pnpm format
```

### Creating Changesets (MANDATORY for user-facing changes)

When making changes that affect users (bug fixes, new features, breaking changes, dependency updates), you **must** create a changeset file.

1. Create a new `.md` file in the `.changeset/` directory.
2. Use naming convention: `<random-word>-<random-word>-<random-word>.md`.
3. Format it like this:

```markdown
---
'storybook-addon-kit': patch
---

Short description of what changed.
```

**Version bump types:**

- `patch` — Bug fixes, internal improvements, dependency updates (non-breaking)
- `minor` — New features (backward compatible)
- `major` — Breaking changes

Keep the description short. Only add migration notes or examples for breaking changes or new public APIs.
