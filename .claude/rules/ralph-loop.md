# Ralph Loop for Example Development

## What is Ralph Loop?

Ralph Loop implements the **Ralph Wiggum technique** - an iterative development methodology based on continuous AI loops, pioneered by Geoffrey Huntley.

**Core concept**: The same prompt is fed to Claude repeatedly. Claude sees its own previous work in the files and git history, creating a self-referential loop where it iteratively improves until completion.

**Each iteration**:
1. Claude receives the SAME prompt
2. Works on the task, modifying files
3. Tries to exit
4. Stop hook intercepts and feeds the same prompt again
5. Claude sees its previous work in the files
6. Iteratively improves until completion

## When to Use Ralph Loop for Example Development

### Good Use Cases

**Documentation creation:**
- "README 만들어", "문서 작성해"
- "예제 설명 추가해"
- Iteratively refine structure, add details, improve clarity

**Example data creation:**
- "마크다운 기획서 샘플 만들어"
- "JSON fixture 만들어"
- Iteratively create, validate, and improve sample data

**Test fixture development:**
- "플로우차트 예제 만들어"
- "UI 목업 샘플 만들어"
- Create examples, verify structure, add variations

**Multi-file example projects:**
- "전체 예제 프로젝트 만들어"
- Iteratively create files, link them, validate consistency

### Not Good For

**One-shot queries:**
- "git status 확인해"
- "파일 읽어봐"
- Simple operations don't benefit from iteration

**Tasks requiring human judgment:**
- "어떤 예제가 더 좋아?"
- Design decisions need user input, not iteration

**Quick fixes:**
- "오타 수정해"
- Simple edits don't need loops

## Commands for Nobi

### `/ralph-loop <PROMPT> [OPTIONS]`

Start a Ralph loop for example development work.

**Usage examples:**
```
/ralph-loop "Create README.md for example repo" --max-iterations 10
/ralph-loop "예제 마크다운 기획서 3개 만들어" --completion-promise "EXAMPLES COMPLETE" --max-iterations 15
/ralph-loop "JSON fixture 만들어" --completion-promise "FIXTURES READY" --max-iterations 12
```

**Options:**
- `--max-iterations <n>` - Max iterations before auto-stop (ALWAYS SET THIS)
- `--completion-promise <text>` - Promise phrase to signal completion

**Typical iteration counts for example development:**
- Documentation: 8-12 iterations
- Simple examples: 10-15 iterations
- Complex multi-file examples: 15-20 iterations
- Full example projects: 20-25 iterations

### `/cancel-ralph`

Cancel an active Ralph loop.

**When to use:**
- Task is complete and you've output the completion promise
- Team lead requests to stop
- You detect an infinite loop or blocker

## Completion Promises

Signal completion with a `<promise>` tag:

```
<promise>NOBI DOCS COMPLETE</promise>
```

**CRITICAL RULES:**
- ✅ Only output when the statement is **completely TRUE**
- ❌ NEVER output false promises to escape the loop
- ✅ Verify all files are correct before promising
- ✅ Check all examples work as expected

**Example-specific completion checks:**
- Documentation: All sections complete, examples clear, no TODOs
- Fixtures: Valid JSON structure, complete data, no placeholders
- Examples: All files created, links work, consistent formatting

## Example Development Workflow with Ralph Loop

### Pattern 1: Creating Example Documentation

```
Team Lead: "노비, README 만들어"
Nobi: /ralph-loop "Create comprehensive README.md" --completion-promise "README COMPLETE" --max-iterations 10

Iteration 1: Create basic README structure
Iteration 2: Add project overview and purpose
Iteration 3: Add usage examples
Iteration 4: Add sample data descriptions
Iteration 5: Review and improve clarity
Iteration 6: Add links and references
Iteration 7: Final review, output <promise>README COMPLETE</promise>
/cancel-ralph
```

### Pattern 2: Creating Sample Data Files

```
Team Lead: "노비, 플로우차트 예제 3개 만들어"
Nobi: /ralph-loop "Create 3 flowchart example markdown files" --completion-promise "FLOWCHART EXAMPLES COMPLETE" --max-iterations 15

Iteration 1: Create example-flowchart-1.md (simple)
Iteration 2: Review structure, improve
Iteration 3: Create example-flowchart-2.md (moderate complexity)
Iteration 4: Review and refine
Iteration 5: Create example-flowchart-3.md (complex)
Iteration 6: Review all three for consistency
Iteration 7: Add descriptive comments
Iteration 8: Verify markdown syntax
Iteration 9: Final review, output <promise>FLOWCHART EXAMPLES COMPLETE</promise>
/cancel-ralph
```

### Pattern 3: Creating JSON Fixtures

```
Team Lead: "노비, JSON fixture 만들어"
Nobi: /ralph-loop "Create JSON fixture for flowchart renderer" --completion-promise "FIXTURE COMPLETE" --max-iterations 12

Iteration 1: Create basic JSON structure
Iteration 2: Add sample nodes and edges
Iteration 3: Validate JSON syntax
Iteration 4: Add metadata fields
Iteration 5: Review against schema
Iteration 6: Add comments/documentation
Iteration 7: Final validation, output <promise>FIXTURE COMPLETE</promise>
/cancel-ralph
```

### Pattern 4: Multi-File Example Project

```
Team Lead: "노비, 전체 예제 프로젝트 만들어"
Nobi: /ralph-loop "Create full example project with markdown, JSON, and docs" --completion-promise "PROJECT COMPLETE" --max-iterations 20

Iteration 1: Plan directory structure
Iteration 2: Create README.md
Iteration 3: Create sample markdown planning documents
Iteration 4: Create corresponding JSON fixtures
Iteration 5: Review consistency between markdown and JSON
Iteration 6: Add usage documentation
Iteration 7: Create example outputs
Iteration 8: Link all files together
Iteration 9: Review completeness
Iteration 10: Final validation, output <promise>PROJECT COMPLETE</promise>
/cancel-ralph
```

## Best Practices for Nobi

### 1. Always Set Max Iterations

**DO:**
```
/ralph-loop "예제 만들어" --max-iterations 15
```

**DON'T:**
```
/ralph-loop "예제 만들어"  # Can run forever!
```

**Recommended ranges:**
- Simple docs: 8-10 iterations
- Standard examples: 12-15 iterations
- Complex projects: 18-25 iterations

### 2. Use Specific Completion Promises

**GOOD:**
```
--completion-promise "EXAMPLES COMPLETE"
--completion-promise "FIXTURES READY"
--completion-promise "DOCS COMPLETE"
--completion-promise "NOBI TASK DONE"
```

**BAD:**
```
--completion-promise "done"  # Too vague
--completion-promise "maybe"  # Not definitive
```

### 3. Check Before Promising Completion

Before outputting `<promise>EXAMPLES COMPLETE</promise>`:

- ✅ Read all files you created to verify correctness
- ✅ Check JSON syntax is valid
- ✅ Verify markdown renders correctly
- ✅ Ensure all examples are complete (no placeholders)
- ✅ Confirm file names and paths are correct
- ✅ Check git status for uncommitted work

### 4. Report Progress to Team Lead

During long-running loops, send progress updates:

```
SendMessage to team-lead:
"Working on example project. Completed: README, 2/5 markdown samples. Next: JSON fixtures."
```

### 5. Iterate, Don't Rush

Ralph Loop is designed for iteration:
- Create basic version first
- Review and improve in subsequent iterations
- Add details incrementally
- Refine until truly complete

**Example iteration pattern:**
1. Create skeleton
2. Fill in basic content
3. Review structure
4. Add examples/details
5. Improve clarity
6. Final review
7. Promise completion

## Example-Specific Iteration Strategies

### For Markdown Planning Documents

**Iteration 1-2**: Structure and outline
**Iteration 3-5**: Content filling
**Iteration 6-8**: Examples and details
**Iteration 9-10**: Final polish and validation

### For JSON Fixtures

**Iteration 1-2**: Basic schema structure
**Iteration 3-5**: Sample data filling
**Iteration 6-8**: Validation and edge cases
**Iteration 9-10**: Documentation and comments

### For Multi-File Projects

**Iteration 1-3**: Directory structure and core files
**Iteration 4-8**: Individual file creation
**Iteration 9-15**: Inter-file consistency and linking
**Iteration 16-20**: Documentation, README, final review

## Integration with Git Workflow

Ralph Loop works seamlessly with git branch & PR workflow:

1. Already on feature branch (e.g., `wogus/ARASEO-INIT`)
2. Start Ralph Loop for example development task
3. Loop creates/modifies example files iteratively
4. Loop commits work incrementally (optional)
5. Loop completes when examples are ready
6. Output completion promise
7. /cancel-ralph
8. Report to team lead for PR creation

**Example:**
```
Current branch: wogus/ARASEO-DOCS

/ralph-loop "Create example markdown and JSON fixtures" --completion-promise "FIXTURES COMPLETE" --max-iterations 15

[Loop iterates, creating examples]

<promise>FIXTURES COMPLETE</promise>
/cancel-ralph

SendMessage to team-lead: "Examples complete. Ready for review and PR."
```

## Troubleshooting

### Loop Taking Too Long

**Symptom**: Exceeds expected iterations for simple task

**Check:**
- Are you making actual progress? (read git log)
- Is completion criteria too strict?
- Are you overthinking simple examples?

**Solution:**
- Simplify completion criteria
- Focus on "good enough" not "perfect"
- Trust max-iterations to stop eventually

### Can't Decide When Complete

**Symptom**: Unsure if examples are ready

**Checklist:**
- All requested files created?
- Examples demonstrate intended use cases?
- No placeholders or TODOs remaining?
- JSON validates correctly?
- Markdown renders without errors?

If all YES → output completion promise

### Stuck in Perfectionism

**Symptom**: Keep refining examples endlessly

**Remember:**
- Examples don't need to be perfect
- "Good enough" is better than endless iteration
- Trust your judgment
- Max iterations will stop eventually

## Communication with Team Lead

### When to Report

**Start of task:**
```
SendMessage to team-lead: "Starting Ralph Loop for [task]. Targeting completion in ~X iterations."
```

**Mid-progress (for long tasks):**
```
SendMessage to team-lead: "Iteration N/M: Created [files]. Next: [remaining work]."
```

**Completion:**
```
SendMessage to team-lead: "Task complete. Created [summary]. Ready for review."
```

### What to Report

Include:
- Files created/modified
- Key accomplishments
- Any issues encountered
- Next steps (if applicable)

## Learn More

- Original technique: https://ghuntley.com/ralph/
- Ralph Orchestrator: https://github.com/mikeyobrien/ralph-orchestrator
- Parent repo Ralph Loop rules: `Araseo/.claude/rules/ralph-loop.md`
