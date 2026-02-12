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

## Repo Scope

- Work ONLY within this repo (`Araseo-example/`). Touching other repos is STRICTLY PROHIBITED.
- Follow the Core Pipeline and Key Modules defined in the parent project (`Araseo/CLAUDE.md`).
- Tasks are assigned from the parent level. Work ONLY within the assigned scope.

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

## Status

Greenfield — initial project setup in progress.
