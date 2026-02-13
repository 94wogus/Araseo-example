# Permissions for Nobi (Example Development)

## Your Assigned Repository

**Path**: `/Users/wogus/Wogus/Araseo/Araseo-example/`

You have **full, unrestricted access** to everything inside this directory.

## What You CAN Do (No Permission Required)

### ✅ Create Files Freely

```
Write: /Users/wogus/Wogus/Araseo/Araseo-example/examples/flowchart-1.md
Write: /Users/wogus/Wogus/Araseo/Araseo-example/examples/ui-mockup.json
Write: /Users/wogus/Wogus/Araseo/Araseo-example/fixtures/sample-data.json
Write: /Users/wogus/Wogus/Araseo/Araseo-example/README.md
```

No permission prompts. Just create.

### ✅ Edit Files Freely

```
Edit: /Users/wogus/Wogus/Araseo/Araseo-example/CLAUDE.md
Edit: /Users/wogus/Wogus/Araseo/Araseo-example/.claude/rules/ralph-loop.md
Edit: /Users/wogus/Wogus/Araseo/Araseo-example/examples/flowchart-1.md
```

No permission prompts. Just edit.

### ✅ Delete Files Freely

```
Bash: rm /Users/wogus/Wogus/Araseo/Araseo-example/old-example.md
```

No permission prompts. Just delete.

### ✅ Create/Modify Directory Structure

```
Bash: mkdir -p /Users/wogus/Wogus/Araseo/Araseo-example/examples/flowcharts
Bash: mv /Users/wogus/Wogus/Araseo/Araseo-example/old /Users/wogus/Wogus/Araseo/Araseo-example/new
```

No permission prompts. Full control.

## What You CANNOT Do

### ❌ Modify Files Outside Your Repo

```
Edit: /Users/wogus/Wogus/Araseo/CLAUDE.md                    # Main repo - NOT YOURS
Edit: /Users/wogus/Wogus/Araseo/Araseo-skill/CLAUDE.md      # Sugiri's repo - NOT YOURS
Edit: /Users/wogus/Wogus/Araseo/mole/CLAUDE.md              # Mole's repo - NOT YOURS
```

These will FAIL. Don't attempt.

### ❌ Read/Write in Other Teammate Repos

You can READ from other repos for reference, but you CANNOT WRITE to them.

**Reading is OK:**
```
Read: /Users/wogus/Wogus/Araseo/Araseo-skill/.claude/skills/araseo/SKILL.md  ✅
Read: /Users/wogus/Wogus/Araseo/CLAUDE.md  ✅
```

**Writing is NOT OK:**
```
Edit: /Users/wogus/Wogus/Araseo/Araseo-skill/CLAUDE.md  ❌
Write: /Users/wogus/Wogus/Araseo/mole/notes.md  ❌
```

## Repo Isolation Principle

**Simple rule**:
- Your repo = `/Users/wogus/Wogus/Araseo/Araseo-example/`
- Everything inside = YOURS to modify freely
- Everything outside = READ ONLY or OFF LIMITS

## Trust the Permission System

### No Need to Ask

When working in `Araseo-example/`, you NEVER need to:
- Ask "Can I modify this file?"
- Request permission before editing
- Hesitate before creating files
- Check with team lead for approval

### Just Do It

If it's in `/Users/wogus/Wogus/Araseo/Araseo-example/`, you have permission. Period.

**Example workflow:**
```
Task: "Create example flowchart markdown files"

Nobi:
1. Write /Users/wogus/Wogus/Araseo/Araseo-example/examples/flowchart-simple.md
   → No prompt, just write ✅
2. Write /Users/wogus/Wogus/Araseo/Araseo-example/examples/flowchart-complex.md
   → No prompt, just write ✅
3. Edit /Users/wogus/Wogus/Araseo/Araseo-example/CLAUDE.md to document examples
   → No prompt, just edit ✅
4. Done!
```

## If You Need Something Outside Your Repo

### Cross-Repo Changes Require Coordination

If you need a change in another repo:

**Step 1**: Send message to the repo owner
```
SendMessage to team-lead:
"I need the main CLAUDE.md to reference the example files.
Can you add a link in the Key Modules section?"
```

**Step 2**: Wait for the owner to make the change

**Step 3**: Continue your work

### Who Owns What

| Repo | Owner | Contact |
|------|-------|---------|
| `/Users/wogus/Wogus/Araseo/` (main) | Team Lead | Send message to "team-lead" |
| `/Users/wogus/Wogus/Araseo/Araseo-skill/` | Sugiri | Send message to "sugiri" |
| `/Users/wogus/Wogus/Araseo/Araseo-example/` | **YOU (Nobi)** | This is YOUR repo |
| `/Users/wogus/Wogus/Araseo/mole/` | Mole | Send message to "mole" |

## Permission Verification

### Test Your Permissions

When you first start, verify permissions work:

```bash
# Should succeed without prompts
echo "test" > /Users/wogus/Wogus/Araseo/Araseo-example/test.txt
cat /Users/wogus/Wogus/Araseo/Araseo-example/test.txt
rm /Users/wogus/Wogus/Araseo/Araseo-example/test.txt
```

If you get permission prompts during this test, report it to team lead.

## Common Scenarios

### Scenario 1: Creating Examples

```
Task: "예제 마크다운 기획서 3개 만들어"

Nobi's workflow:
1. Write /Users/wogus/Wogus/Araseo/Araseo-example/examples/planning-simple.md
   → Permission? NO ✅
2. Write /Users/wogus/Wogus/Araseo/Araseo-example/examples/planning-moderate.md
   → Permission? NO ✅
3. Write /Users/wogus/Wogus/Araseo/Araseo-example/examples/planning-complex.md
   → Permission? NO ✅
4. Complete!
```

### Scenario 2: Updating Documentation

```
Task: "CLAUDE.md에 예제 섹션 추가해"

Nobi's workflow:
1. Read /Users/wogus/Wogus/Araseo/Araseo-example/CLAUDE.md
2. Edit /Users/wogus/Wogus/Araseo/Araseo-example/CLAUDE.md (add examples section)
   → Permission? NO ✅
3. Complete!
```

### Scenario 3: Creating JSON Fixtures

```
Task: "JSON fixture 만들어"

Nobi's workflow:
1. Write /Users/wogus/Wogus/Araseo/Araseo-example/fixtures/flowchart-sample.json
   → Permission? NO ✅
2. Write /Users/wogus/Wogus/Araseo/Araseo-example/fixtures/ui-mockup-sample.json
   → Permission? NO ✅
3. Complete!
```

### Scenario 4: Need Main Repo Change

```
Task: "Update main CLAUDE.md to reference examples"

Nobi's workflow:
1. ❌ DON'T: Edit /Users/wogus/Wogus/Araseo/CLAUDE.md directly
2. ✅ DO: Send message to team-lead
   "Team Lead, I created example files in Araseo-example/examples/.
    Can you add a reference to them in the main CLAUDE.md?"
3. Wait for team lead to make the change
4. Continue with your work
```

## Integration with Ralph Loop

Ralph Loop + Permissions = Seamless Automation

When you run Ralph Loop in your repo:
- All file operations succeed without prompts
- Loop can iterate freely
- No permission interruptions
- Autonomous completion

**Example:**
```
/ralph-loop "Create comprehensive example project" --max-iterations 20

Iteration 1: Create directory structure
  → mkdir, no prompts ✅
Iteration 2-5: Create markdown examples
  → Write files, no prompts ✅
Iteration 6-10: Create JSON fixtures
  → Write files, no prompts ✅
Iteration 11-15: Create documentation
  → Edit CLAUDE.md, Write README.md, no prompts ✅
Iteration 16-20: Final refinements
  → Edit multiple files, no prompts ✅

<promise>PROJECT COMPLETE</promise>
```

## Troubleshooting

### Getting Permission Prompts in Your Repo

**Symptom**: Permission prompt appears when editing files in `Araseo-example/`

**This should NEVER happen.**

**If it does:**
1. Check the file path - is it really in `/Users/wogus/Wogus/Araseo/Araseo-example/`?
2. Report to team lead immediately
3. There may be a configuration issue

### Can't Modify a File

**Symptom**: Write/Edit operation fails in your repo

**Solutions:**
1. Verify the full file path
2. Check file system permissions (ls -la)
3. Report to team lead if path is correct

### Accidentally Modified Wrong Repo

**Symptom**: You edited a file outside `Araseo-example/`

**What to do:**
1. Immediately notify team lead
2. Explain what you changed
3. Let the appropriate repo owner fix it
4. Review this permissions guide

## Best Practices

### 1. Work Confidently in Your Repo

**DO:**
- Create files without asking
- Edit files without hesitation
- Delete files when needed
- Trust that permissions are set correctly

**DON'T:**
- Ask "Can I modify this file?" when it's in your repo
- Request permission before every file operation
- Second-guess file operations in `Araseo-example/`

### 2. Stay Within Boundaries

**Your boundary**: `/Users/wogus/Wogus/Araseo/Araseo-example/`

Everything inside = YOURS
Everything outside = COORDINATE

### 3. Coordinate Politely

When you need cross-repo changes:
- Be specific about what you need
- Explain why it's needed
- Provide the exact change if possible
- Thank the repo owner

### 4. Document Your Work

Keep your repo well-documented:
- Update `CLAUDE.md` when you add major examples
- Create README files in subdirectories
- Add comments in JSON fixtures
- Document example structures

## Permission Matrix

| Operation | In Your Repo (`Araseo-example/`) | Outside Your Repo |
|-----------|----------------------------------|-------------------|
| Read files | ✅ Always allowed | ✅ Usually allowed (for reference) |
| Write new files | ✅ No permission needed | ❌ Not allowed |
| Edit existing files | ✅ No permission needed | ❌ Not allowed |
| Delete files | ✅ No permission needed | ❌ Not allowed |
| Create directories | ✅ No permission needed | ❌ Not allowed |
| Git operations | ✅ No permission needed | ❌ Not allowed |

## Examples of Valid Operations

All of these are VALID and require NO permission prompts:

```
✅ Write: /Users/wogus/Wogus/Araseo/Araseo-example/README.md
✅ Write: /Users/wogus/Wogus/Araseo/Araseo-example/CLAUDE.md
✅ Write: /Users/wogus/Wogus/Araseo/Araseo-example/.claude/rules/permissions.md
✅ Write: /Users/wogus/Wogus/Araseo/Araseo-example/.claude/skills/example-skill/SKILL.md
✅ Write: /Users/wogus/Wogus/Araseo/Araseo-example/examples/flowchart.md
✅ Write: /Users/wogus/Wogus/Araseo/Araseo-example/fixtures/data.json
✅ Write: /Users/wogus/Wogus/Araseo/Araseo-example/docs/guide.md
✅ Write: /Users/wogus/Wogus/Araseo/Araseo-example/test/sample.txt

✅ Edit: /Users/wogus/Wogus/Araseo/Araseo-example/CLAUDE.md
✅ Edit: /Users/wogus/Wogus/Araseo/Araseo-example/.claude/rules/ralph-loop.md
✅ Edit: /Users/wogus/Wogus/Araseo/Araseo-example/examples/flowchart.md

✅ Bash: rm /Users/wogus/Wogus/Araseo/Araseo-example/old-file.txt
✅ Bash: mkdir -p /Users/wogus/Wogus/Araseo/Araseo-example/new-dir
✅ Bash: mv /Users/wogus/Wogus/Araseo/Araseo-example/a.txt /Users/wogus/Wogus/Araseo/Araseo-example/b.txt
```

## Examples of INVALID Operations

These will FAIL and you should NOT attempt:

```
❌ Write: /Users/wogus/Wogus/Araseo/CLAUDE.md (main repo)
❌ Edit: /Users/wogus/Wogus/Araseo/.claude/rules/ralph-loop.md (main repo)
❌ Write: /Users/wogus/Wogus/Araseo/Araseo-skill/CLAUDE.md (Sugiri's repo)
❌ Edit: /Users/wogus/Wogus/Araseo/mole/notes.md (Mole's repo)
❌ Bash: rm /Users/wogus/Wogus/Araseo/README.md (main repo)
```

If you need these changes, coordinate with the repo owner.

## Summary

**Simple mental model:**

```
Is the file path /Users/wogus/Wogus/Araseo/Araseo-example/**/*?
├─ YES → You can create/edit/delete freely ✅
└─ NO → Coordinate with repo owner ❌
```

**Your assigned path pattern**: `/Users/wogus/Wogus/Araseo/Araseo-example/**/*`

Everything matching this pattern = YOURS. Work freely and confidently.
