# Ralph Loop Enforcement Rules for Nobi (MANDATORY COMPLIANCE)

**⚠️ HIGHEST PRIORITY: This document defines MANDATORY ralph-loop usage for all example development work. Non-compliance is a CRITICAL VIOLATION. ⚠️**

## Core Principle

**Ralph Loop is NOT optional. It is the DEFAULT working mode for Nobi.**

Every task assigned to Nobi (除非明确例外) MUST be executed within a ralph-loop. Working without ralph-loop is equivalent to working incorrectly.

## Ralph Loop Plugin Configuration

**CRITICAL: ralph-loop is a PLUGIN, not a built-in command.**

### What is ralph-loop?

- **Type**: Claude Code plugin
- **Provides**: Slash commands `/ralph-loop` and `/cancel-ralph`
- **Not**: A skill, not a built-in CLI command

### Installation

**Required for all teammates:**
```bash
npm install -g @anthropic-ai/ralph-loop
```

### Configuration

Must be configured in `.claude/settings.json`:
```json
{
  "enabledPlugins": {
    "ralph-loop@claude-plugins-official": true
  }
}
```

### Verification

Check if plugin is available:
```
/ralph-loop:help
```

If this command works, plugin is properly installed.

### If Plugin Unavailable

**MANDATORY Response:**
```
"CRITICAL: ralph-loop plugin is not available in my environment.
Installing immediately: npm install -g @anthropic-ai/ralph-loop

If installation fails, I will report to team lead immediately."
```

**Do NOT proceed with work until plugin is available.**

### Plugin vs Command vs Skill

**❌ WRONG terminology:**
- "ralph-loop command" (it's a plugin-provided slash command)
- "ralph-loop skill" (it's not a skill)
- "built-in command" (it requires plugin installation)

**✅ CORRECT terminology:**
- "ralph-loop plugin"
- "plugin-provided slash commands"
- "/ralph-loop command" (the command provided by the plugin)

### How to Use Ralph-loop (Skill Tool - MANDATORY)

**ALL users (team lead and teammates) access ralph-loop via Skill tool:**

```python
# Help
Skill(ralph-loop:help)

# Start ralph-loop
Skill(ralph-loop:ralph-loop, args: "task description --completion-promise 'TEXT' --max-iterations N")

# Cancel ralph-loop
Skill(ralph-loop:cancel-ralph)
```

**Examples:**
```python
# Documentation creation
Skill(ralph-loop:ralph-loop, args: "Create README --completion-promise 'README COMPLETE' --max-iterations 12")

# Example creation
Skill(ralph-loop:ralph-loop, args: "Create flowchart examples --completion-promise 'EXAMPLES COMPLETE' --max-iterations 15")

# JSON fixtures
Skill(ralph-loop:ralph-loop, args: "Create JSON fixtures --completion-promise 'FIXTURES COMPLETE' --max-iterations 10")
```

**CRITICAL:**
> Do NOT attempt to use slash commands (`/ralph-loop`) or execute ralph-loop via Bash. ALL users MUST use Skill tool syntax as shown above.

## Automatic Detection Algorithm (MUST FOLLOW)

When Nobi receives ANY task, IMMEDIATELY execute this algorithm:

```
STEP 1: Parse task intent
  - What is being requested?
  - What deliverables are expected?

STEP 2: Evaluate task complexity
  - Will this create new files? → YES = MANDATORY ralph-loop
  - Will this edit existing files? → YES = MANDATORY ralph-loop
  - Does this require 3+ steps? → YES = MANDATORY ralph-loop
  - Is this example/doc/fixture creation? → YES = MANDATORY ralph-loop
  - Is this a single read-only command? → NO ralph-loop (exception)

STEP 3: If MANDATORY ralph-loop → START IMMEDIATELY
  - Do NOT ask for confirmation
  - Do NOT wait for team lead approval
  - Do NOT start working without ralph-loop
  - START /ralph-loop command FIRST

STEP 4: Execute ralph-loop until completion
  - Iterate through task steps
  - Output completion promise when genuinely done
  - /cancel-ralph
```

## Task Type Classification (MANDATORY REFERENCE)

### Category A: ALWAYS MANDATORY Ralph Loop

These tasks ALWAYS require ralph-loop, NO EXCEPTIONS:

| Task Type | Examples | Typical Iterations |
|-----------|----------|-------------------|
| **Documentation creation** | "README 만들어", "문서 작성해", "가이드 만들어" | 10-15 |
| **Example file creation** | "예제 만들어", "샘플 만들어", "기획서 만들어" | 12-18 |
| **JSON fixture creation** | "fixture 만들어", "JSON 만들어" | 10-15 |
| **Multi-file projects** | "프로젝트 만들어", "전체 예제 만들어" | 20-25 |
| **CLAUDE.md updates** | "CLAUDE.md 수정해", "룰 추가해" | 8-12 |
| **Skill creation** | "스킬 만들어", "skill 만들어" | 15-20 |
| **Directory structure** | "디렉토리 만들어", "구조 잡아" | 8-10 |

**Recognition patterns:**
- Korean verbs: "만들어", "작성해", "추가해", "수정해", "구현해"
- English commands: "create", "build", "add", "update", "implement"
- File-related keywords: "file", "document", "example", "fixture", "README"

### Category B: EXCEPTIONS (No Ralph Loop Required)

ONLY these tasks can skip ralph-loop:

| Task Type | Examples | Why Exception? |
|-----------|----------|----------------|
| **Single read operations** | "파일 읽어봐", "내용 확인해" | No file modification |
| **Status checks** | "git status", "ls", "파일 목록 봐" | Single command |
| **Quick questions** | "이거 뭐야?", "설명해" | No deliverable |

**If in doubt → USE RALPH LOOP.** The cost of unnecessary loop is low; the cost of missing loop is high.

## Spawn Prompt Requirements for Team Lead

### Team Lead MUST Include These Elements

Every spawn prompt from team lead to Nobi MUST contain:

```
1. Task description (clear, specific)
2. MANDATORY ralph-loop instruction
3. Completion promise text
4. Max iterations count
```

**Template for team lead:**
```
[TASK DESCRIPTION]

CRITICAL REQUIREMENT: You MUST use /ralph-loop for this task.
Start immediately with:
/ralph-loop '[task description]' --completion-promise '[COMPLETION TEXT]' --max-iterations [N]

Do NOT start working without ralph-loop. This is MANDATORY.
```

**Example (CORRECT):**
```
Create example markdown planning documents in Araseo-example/examples/.

CRITICAL REQUIREMENT: You MUST use /ralph-loop for this task.
Start immediately with:
/ralph-loop 'Create example markdown planning documents' --completion-promise 'EXAMPLES COMPLETE' --max-iterations 15

Do NOT start working without ralph-loop. This is MANDATORY.
```

### Nobi's Response to Spawn

**CORRECT Response (immediate compliance):**
```
Nobi: "Starting ralph-loop for example creation."
[Immediately executes /ralph-loop command]
```

**WRONG Response (violation):**
```
❌ Nobi: "I'll create the examples..." [starts working without ralph-loop]
❌ Nobi: "Do you want me to use ralph-loop?" [asking instead of doing]
❌ Nobi: "Let me read the files first..." [working before ralph-loop]
```

## Self-Enforcement Checklist for Nobi

Before starting ANY task, Nobi MUST verify:

```
☐ Have I parsed the task intent?
☐ Have I classified the task type (Category A or B)?
☐ If Category A → Have I started /ralph-loop?
☐ If Category B exception → Have I confirmed it's truly single-step?
☐ Am I 100% certain ralph-loop is not needed? (If not → USE IT)
```

**Decision tree:**
```
Receive task
  ↓
Is this Category B exception? (read-only, single command, question)
  ├─ YES → Verify it's truly simple → Proceed without loop
  └─ NO → MANDATORY ralph-loop → Start immediately
```

## Violation Detection and Correction

### Signs of Violation

Team lead should watch for these indicators:

**Red Flag 1: Nobi starts working immediately**
```
❌ Nobi: "Creating file structure..." [no /ralph-loop command]
```

**Red Flag 2: Nobi asks about ralph-loop**
```
❌ Nobi: "Should I use ralph-loop for this?"
```

**Red Flag 3: Nobi creates files without loop**
```
❌ Nobi: [Write tool call] [Write tool call] [no loop started]
```

### Immediate Correction Protocol

**Step 1: Team lead STOPS the work**
```
Team Lead → Nobi: "STOP. You MUST use ralph-loop for this task. Restart with /ralph-loop immediately."
```

**Step 2: Nobi restarts with ralph-loop**
```
Nobi: "Understood. Starting ralph-loop."
/ralph-loop '[task]' --completion-promise '[COMPLETION]' --max-iterations [N]
```

**Step 3: Previous work handling**
- If files already created → Keep them, ralph-loop will refine
- If work is incorrect → May need to revert and restart
- Team lead decides whether to keep or discard pre-loop work

## Example Workflows (MANDATORY PATTERNS)

### Workflow 1: Documentation Creation

```
User: "노비한테 README 만들라고 해"

Team Lead spawn:
  "Create comprehensive README.md for Araseo-example repo.

   CRITICAL: You MUST use /ralph-loop.
   Start with: /ralph-loop 'Create README' --completion-promise 'README COMPLETE' --max-iterations 12"

Nobi (immediate response):
  "Starting ralph-loop for README creation."

  /ralph-loop "Create comprehensive README.md for Araseo-example repo" --completion-promise "README COMPLETE" --max-iterations 12

  [Iterations proceed]
  Iteration 1: Create basic structure
  Iteration 2: Add project overview
  Iteration 3: Add usage examples
  Iteration 4: Add sample data descriptions
  Iteration 5: Review and refine
  Iteration 6: Output <promise>README COMPLETE</promise>

  /cancel-ralph

SendMessage to team-lead: "README complete. Created comprehensive documentation with usage examples and sample descriptions."
```

### Workflow 2: Example File Creation

```
User: "노비, 플로우차트 예제 3개 만들어"

Team Lead spawn:
  "Create 3 flowchart example markdown files in Araseo-example/examples/.

   MANDATORY: /ralph-loop 'Create flowchart examples' --completion-promise 'FLOWCHARTS COMPLETE' --max-iterations 15"

Nobi:
  /ralph-loop "Create 3 flowchart example markdown files" --completion-promise "FLOWCHARTS COMPLETE" --max-iterations 15

  Iteration 1: Create flowchart-simple.md
  Iteration 2: Review structure
  Iteration 3: Create flowchart-moderate.md
  Iteration 4: Review consistency
  Iteration 5: Create flowchart-complex.md
  Iteration 6: Add descriptions
  Iteration 7: Final validation
  Iteration 8: Output <promise>FLOWCHARTS COMPLETE</promise>

  /cancel-ralph
```

### Workflow 3: JSON Fixture Creation

```
Team Lead: "노비, JSON fixture 만들어"

Nobi (auto-detects Category A):
  /ralph-loop "Create JSON fixture for renderer testing" --completion-promise "FIXTURE COMPLETE" --max-iterations 12

  Iteration 1: Create basic JSON structure
  Iteration 2: Add sample data
  Iteration 3: Validate JSON syntax
  Iteration 4: Add metadata
  Iteration 5: Review against schema
  Iteration 6: Output <promise>FIXTURE COMPLETE</promise>

  /cancel-ralph
```

### Workflow 4: Exception Case (No Loop Needed)

```
Team Lead: "노비, 현재 파일 목록 보여줘"

Nobi (recognizes Category B exception):
  "This is a read-only query (Category B). No ralph-loop needed."

  [Bash: ls -la /Users/wogus/Wogus/Araseo/Araseo-example/examples/]

  [Report results to team lead]
```

## Completion Promise Guidelines

### What Constitutes "Complete"?

Before outputting `<promise>TASK COMPLETE</promise>`, Nobi MUST verify:

**For documentation:**
- ☑ All sections written (no TODOs or placeholders)
- ☑ Examples included
- ☑ Markdown renders correctly
- ☑ No typos or formatting errors

**For example files:**
- ☑ All requested files created
- ☑ Content is realistic and useful
- ☑ Consistent formatting across files
- ☑ No placeholder data (e.g., "TODO", "FIXME")

**For JSON fixtures:**
- ☑ Valid JSON syntax (no syntax errors)
- ☑ Complete data structure
- ☑ All required fields populated
- ☑ Realistic sample data

**For multi-file projects:**
- ☑ All files created
- ☑ Files are linked/referenced correctly
- ☑ README or docs explain structure
- ☑ Consistent naming conventions

### Example Completion Checks

**Before promising:**
```
Nobi (internal checklist):
  - Did I create all requested files? ✓
  - Did I review each file for completeness? ✓
  - Are there any TODOs or placeholders? ✗ (must fix)
  - Is the work actually done? ✓
  - Can I honestly say "COMPLETE"? ✓

Output: <promise>TASK COMPLETE</promise>
```

**Never promise falsely:**
```
❌ Output <promise>COMPLETE</promise> when:
  - Files have TODOs or placeholders
  - JSON has syntax errors
  - Documentation is incomplete
  - You haven't reviewed the work
  - You want to escape the loop
```

## Iteration Count Guidelines for Nobi

### Recommended Ranges by Task Type

| Task Type | Min Iterations | Typical Iterations | Max Iterations |
|-----------|---------------|-------------------|----------------|
| Simple docs (README) | 8 | 10-12 | 15 |
| Example files (2-3 files) | 10 | 12-15 | 18 |
| JSON fixtures | 8 | 10-12 | 15 |
| Multi-file examples (5+ files) | 15 | 18-22 | 25 |
| Complex projects | 20 | 22-25 | 30 |
| CLAUDE.md updates | 8 | 10-12 | 15 |

### When to Set Higher Iterations

Use higher `--max-iterations` when:
- Task is greenfield (starting from scratch)
- Multiple interconnected files
- Complex validation requirements
- You expect refinement cycles

### When to Set Lower Iterations

Use lower `--max-iterations` when:
- Task is simple (single file)
- Template or pattern already exists
- Quick documentation update
- Small refinement task

## Integration with Git Workflow

### Ralph Loop Within Feature Branch

Typical flow:
```
1. Already on feature branch (e.g., wogus/ARASEO-DOCS)
2. Receive task from team lead
3. Start ralph-loop
4. Loop creates/modifies files
5. Loop commits incrementally (optional)
6. Loop completes → Output promise
7. /cancel-ralph
8. Report to team lead
9. Team lead handles PR creation
```

### Example with Git

```
Current branch: wogus/ARASEO-EXAMPLES

Nobi: /ralph-loop "Create example project" --max-iterations 20

Iteration 1-5: Create files
Iteration 6: git add + commit "Add initial examples"
Iteration 7-12: Refine files
Iteration 13: git add + commit "Refine examples and add docs"
Iteration 14-18: Final touches
Iteration 19: git add + commit "Final validation"
Iteration 20: Output <promise>PROJECT COMPLETE</promise>

/cancel-ralph

SendMessage to team-lead: "Example project complete. All files created and committed to wogus/ARASEO-EXAMPLES. Ready for PR."
```

## Troubleshooting for Nobi

### Problem 1: "I forgot to start ralph-loop"

**Symptom**: Already created some files without ralph-loop

**Solution**:
1. Stop current work
2. Report to team lead: "I started without ralph-loop. Restarting correctly."
3. Start ralph-loop NOW
4. Loop will see existing files and refine them
5. Continue until completion

### Problem 2: "Loop is taking too long"

**Symptom**: Approaching max-iterations but not done

**Check**:
- Am I overthinking? (Simplify)
- Are completion criteria too strict? (Relax)
- Am I making actual progress? (Review git log)

**Solution**:
- Focus on "good enough" not "perfect"
- Complete the core deliverable
- Optional: Note remaining work in comments
- Trust max-iterations to stop

### Problem 3: "I don't know when to output promise"

**Symptom**: Unsure if work is complete

**Use checklist**:
- All requested files created? ✓/✗
- No TODOs or placeholders? ✓/✗
- Validated syntax/structure? ✓/✗
- Reviewed for quality? ✓/✗

If all ✓ → Output promise
If any ✗ → Continue iterating

### Problem 4: "Task seems like exception but I'm not sure"

**Symptom**: Unclear if ralph-loop is needed

**DEFAULT RULE**: When in doubt, USE ralph-loop.

**Questions to ask**:
- Will I create/modify files? → YES = use loop
- Is it multi-step? → YES = use loop
- Is it truly single read command? → NO = use loop

**Only skip loop if 100% certain it's Category B exception.**

## Progress Reporting Requirements

### When to Report to Team Lead

**Mandatory reports:**
- **Start**: "Starting ralph-loop for [task]"
- **Completion**: "[Task] complete. Created [summary]."

**Optional (for long tasks):**
- **Mid-progress**: "Iteration X/Y: Completed [milestone]. Next: [remaining]."

### Report Format

**Good reports:**
```
"Starting ralph-loop for example creation."
"Created 3 flowchart examples. Next: JSON fixtures."
"Examples complete. Created 5 markdown files + 3 JSON fixtures. Ready for review."
```

**Bad reports:**
```
"Working on it." (too vague)
"Almost done." (no details)
"I created some files." (no specifics)
```

## Team Lead Responsibilities

### Pre-Spawn Checklist

Before spawning Nobi, team lead MUST verify:
- ☐ Task description is clear
- ☐ Ralph-loop instruction included
- ☐ Completion promise defined
- ☐ Max iterations set appropriately

### Post-Spawn Monitoring

After spawning Nobi, team lead MUST:
- ☐ Watch for immediate /ralph-loop command
- ☐ Verify Nobi doesn't start work without loop
- ☐ Correct immediately if violation detected

### Violation Response

If Nobi violates ralph-loop rule:
```
1. STOP the work immediately
2. Instruct Nobi to restart with ralph-loop
3. Decide whether to keep or discard pre-loop work
4. Monitor more closely going forward
```

## Summary: The Golden Rules

**For Nobi:**
1. ✅ ALWAYS evaluate task type upon receiving
2. ✅ ALWAYS use ralph-loop for Category A tasks
3. ✅ NEVER start working without ralph-loop (unless Category B exception)
4. ✅ ALWAYS output honest completion promises
5. ✅ ALWAYS set --max-iterations

**For Team Lead:**
1. ✅ ALWAYS include ralph-loop instruction in spawn
2. ✅ ALWAYS verify Nobi starts with ralph-loop
3. ✅ IMMEDIATELY correct violations
4. ✅ Monitor and enforce compliance

**The Core Principle:**
> Ralph Loop is not a tool. It is THE way of working for Nobi.

**Non-compliance = Critical failure.**
