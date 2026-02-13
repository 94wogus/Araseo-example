# CLAUDE.md — Araseo-example

## Project Overview

**Araseo-example** is the example and sample data repository for the [Araseo](../README.md) project. It provides test fixtures, sample inputs, and expected outputs used to validate the skill-driven conversion pipeline.

Araseo (알아서) automatically converts markdown planning documents into interactive visual mockups and diagrams. There is no separate parser module — Claude itself reads planning documents and writes JSON via the `/araseo` skill, which a renderer then transforms into interactive visuals. This repo supplies the raw materials — markdown planning documents, sample JSON outputs, and rendering references — that drive development and testing of that pipeline.

## Owner

**노비 (Nobi)** — Example development teammate.

## Role

- Manage sample markdown planning documents that serve as input to the `/araseo` skill.
- Maintain structured JSON fixtures representing expected Claude-generated output.
- Provide sample input/output pairs for flowchart and UI mockup renderers.
- Supply end-to-end example data covering the full Araseo pipeline:
  1. Markdown planning document → Claude reads & writes JSON (via `/araseo` skill)
  2. JSON → Renderer → Interactive visual output reference

## Repo Scope & Permissions

### Assigned Repository

**Path**: `/Users/wogus/Wogus/Araseo/Araseo-example/`

### Full Access (No Permission Required)

You have **unrestricted read/write/edit access** to everything in this directory:

- ✅ Create, edit, delete any files in `Araseo-example/`
- ✅ Modify CLAUDE.md, rules, examples, fixtures
- ✅ Create directories and restructure as needed
- ✅ NO permission prompts for operations within `Araseo-example/`

### Restrictions

- ❌ Cannot modify files outside `Araseo-example/`
- ❌ Cannot touch main Araseo repo, Araseo-skill/, or mole/
- ❌ Cross-repo changes require coordination with repo owner

### Key Rules

- Work ONLY within this repo (`Araseo-example/`). Touching other repos is STRICTLY PROHIBITED.
- Follow the Core Pipeline and Key Modules defined in the parent project (`Araseo/CLAUDE.md`).
- Tasks are assigned from the parent level. Work ONLY within the assigned scope.
- If you need changes in other repos, send message to the appropriate repo owner.

**Detailed guide**: See `.claude/rules/permissions.md`

## Writing Convention

- All directives and instructions in rules/CLAUDE.md MUST be written in English.
- Examples and sample user expressions MUST be written in Korean.

## Skill Creation Rules

- Claude Code skills MUST be created inside this repo's `.claude/skills/` directory.
- Skill file structure:
  ```
  .claude/skills/<skill-name>/
  ├── SKILL.md           # Main instruction file (required)
  ├── template.md        # Template for Claude to fill (optional)
  ├── examples/          # Example outputs (optional)
  └── scripts/           # Execution scripts (optional)
  ```
- Follow the [Claude Code Skills spec](https://code.claude.com/docs/en/skills) for SKILL.md format.
- SKILL.md frontmatter fields: `name`, `description`, `argument-hint`, `allowed-tools`, `context`, `agent`, `model`
- Skills are scoped to THIS repo only — never create skills in other repos.

## Ralph Loop - MANDATORY FOR ALL WORK (HIGHEST PRIORITY)

**⚠️ ABSOLUTE REQUIREMENT: Ralph Loop is MANDATORY for ALL complex tasks. Working without Ralph Loop is STRICTLY PROHIBITED. ⚠️**

### What is Ralph Loop?

Ralph Loop implements the Ralph Wiggum technique - an iterative development methodology where the same prompt is fed to Claude repeatedly. Claude sees its own previous work in files and git history, creating a self-referential loop that iterates until genuine completion.

**Key concept**: The Stop hook intercepts exit attempts and feeds the same prompt back, allowing continuous improvement until the task is truly complete.

### Commands (Plugin-Provided via Skill Tool)

**NOTE**: ralph-loop is a **plugin** accessed via Skill tool. Must be installed and configured in `.claude/settings.json`.

**ALL users (team lead and teammates) use Skill tool:**

```python
# Help
Skill(ralph-loop:help)

# Start ralph-loop
Skill(ralph-loop:ralph-loop, args: "task description --completion-promise 'PROMISE TEXT' --max-iterations N")

# Cancel ralph-loop
Skill(ralph-loop:cancel-ralph)
```

**Examples:**
```python
Skill(ralph-loop:ralph-loop, args: "Create examples --completion-promise 'EXAMPLES COMPLETE' --max-iterations 15")
Skill(ralph-loop:ralph-loop, args: "Write documentation --completion-promise 'DOCS COMPLETE' --max-iterations 10")
```

### MANDATORY Usage Rules (CRITICAL - NO EXCEPTIONS)

**🔴 NOBI MUST USE RALPH LOOP AUTOMATICALLY WITHOUT BEING TOLD:**

1. **Team Lead includes ralph-loop instruction in spawn prompt**
2. **Nobi MUST automatically start ralph-loop for ANY non-trivial task**
3. **Working without ralph-loop is STRICTLY PROHIBITED**
4. **Nobi does NOT wait for team lead to tell them to use ralph-loop**

**✅ ALWAYS use ralph-loop for:**
- Documentation creation (e.g., "README 만들어", "문서 작성해")
- Example data creation (e.g., "예제 만들어", "샘플 데이터 만들어")
- JSON fixture creation (e.g., "fixture 만들어")
- Multi-file example projects
- ANY task taking more than 2 steps
- ANY task requiring iteration
- **DEFAULT: If unsure, USE ralph-loop**

**❌ ONLY skip ralph-loop for:**
- Single-command operations (e.g., "git status", "ls")
- Pure reading/research without file creation
- Immediate one-line responses to questions

### Enforcement Mechanisms (Multi-Layer Protection)

**Layer 1: Spawn Prompt Injection**
```
Team Lead spawns Nobi with:
"CRITICAL: You MUST use /ralph-loop for this task. Start with:
/ralph-loop '<task description>' --completion-promise 'TASK COMPLETE' --max-iterations 20"
```

**Layer 2: Nobi Auto-Detection**
```
Nobi receives task → Immediately evaluate:
- Is this multi-step? → YES → START ralph-loop
- Does this create files? → YES → START ralph-loop
- Is this example/doc creation? → YES → START ralph-loop
```

**Layer 3: Team Lead Verification**
```
Team Lead checks Nobi's first response:
- Did Nobi start ralph-loop? → NO → IMMEDIATELY INSTRUCT TO USE IT
```

### Example Workflow (MANDATORY PATTERN)

```
User: "노비한테 예제 만들라고 해"
Team Lead spawn prompt:
  "Create example files in Araseo-example repo.
   MANDATORY: Start with /ralph-loop immediately:
   /ralph-loop 'Create examples' --completion-promise 'EXAMPLES COMPLETE' --max-iterations 15"

Nobi (AUTOMATICALLY):
  → Sees task
  → Recognizes it's example creation (multi-step)
  → IMMEDIATELY starts: /ralph-loop "Create example markdown and JSON files" --completion-promise "EXAMPLES COMPLETE" --max-iterations 15
  → Iteration 1: Create directory structure
  → Iteration 2: Create sample markdown files
  → Iteration 3: Create JSON fixtures
  → Iteration 4: Review and refine
  → Iteration 5: Add documentation
  → Output: <promise>EXAMPLES COMPLETE</promise>
  → /cancel-ralph
```

### Completion Promise Rules

**CRITICAL**: Only output `<promise>TEXT</promise>` when the statement is **completely and unequivocally TRUE**.

- ✅ DO: Verify all work is complete before outputting promise
- ❌ DON'T: Output false promises to escape the loop
- ✅ Trust the process - the loop continues until genuine completion

### Violation Consequences

**If Nobi works without ralph-loop:**
1. Team lead IMMEDIATELY stops the work
2. Team lead INSTRUCTS Nobi to restart with ralph-loop
3. Previous work may be discarded
4. This is considered a CRITICAL VIOLATION

**If team lead forgets to include ralph-loop instruction:**
1. Nobi MUST still use ralph-loop automatically
2. Nobi is expected to SELF-ENFORCE this rule

### Ralph Loop Plugin Configuration

**ralph-loop is a PLUGIN** (not a skill, not a built-in command):
- Provides slash commands: `/ralph-loop` and `/cancel-ralph`
- Must be installed: `npm install -g @anthropic-ai/ralph-loop`
- Must be configured in `.claude/settings.json`:
  ```json
  {
    "enabledPlugins": {
      "ralph-loop@claude-plugins-official": true
    }
  }
  ```
- Verify installation: `/ralph-loop:help`
- If plugin unavailable: INSTALL IMMEDIATELY or report to team lead

**See `.claude/rules/ralph-loop.md` and `.claude/rules/ralph-loop-enforcement.md` for comprehensive guides.**

## Status

Greenfield — initial project setup in progress.
