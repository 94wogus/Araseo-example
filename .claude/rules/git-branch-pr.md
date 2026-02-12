# Git Branch & PR Rules (Highest Priority)

**These rules take precedence over all other git-related rules. If violated, stop immediately and correct.**

## 1. Direct Commits to main Are STRICTLY PROHIBITED

- Committing directly to the main branch is **NEVER allowed**.
- All changes MUST be made on a **separate branch**.
- Branch naming: `{user}/<JIRA-ISSUE-ID>`
  - `{user}` is the non-numeric prefix of the user's email address (e.g., `94wogus@quantit.io` → `wogus`)
  - Example: `wogus/ARK-715`

## 2. Only PR Merges Are Allowed

- Changes to main MUST go through a **PR creation** and be applied **only via PR merge**.
- Direct push, fast-forward merge, or any method that bypasses a PR is STRICTLY PROHIBITED.

## 3. PR Merge Rules (3 Mandatory Requirements)

### 3-1. Single Commit Squash Before Merge Is Mandatory

- **Before** merging the PR, all commits on the branch MUST be **squashed into a single commit**.
- Squash methods: `git rebase -i main` or `git reset --soft main && git commit`
- The squashed commit's title and description MUST include **all prior work without omission**.
- Merge method: **MUST use `--merge`** (`--squash` and `--rebase` are STRICTLY PROHIBITED)
- Merge command:
  ```bash
  gh pr merge <PR_NUMBER> --merge --delete-branch
  ```

### 3-2. Squash Commit Message Quality

- When squashing, write the title and description carefully to ensure **no prior work is omitted**.
- Include all changes, reasons for modifications, and scope of impact in the description.

### 3-3. Remote main Must Be Up-to-Date Before Merge (Pre-Merge Verification)

- The PR branch HEAD **MUST contain the latest commit from remote main**.
- Merging without being up-to-date is **STRICTLY PROHIBITED**.
- Pre-merge sync procedure:
  ```bash
  git fetch origin main:main
  git rebase main  # resolve conflicts if any
  git push --force-with-lease
  ```
- If conflicts arise during rebase and require resolution:
  1. **Report the resolution details to the user**.
  2. Proceed with merge only after user confirmation.
- Allowing an outdated commit to land on main without this process is **NEVER allowed**.
