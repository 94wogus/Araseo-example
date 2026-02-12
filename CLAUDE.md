# CLAUDE.md — Araseo-example

## Project Overview

**Araseo-example** is the example and sample data repository for the [Araseo](../README.md) project. It provides test fixtures, sample inputs, and expected outputs used to validate the parser and renderer pipeline.

Araseo (알아서) automatically converts AI conversation content into interactive visual mockups and diagrams. This repo supplies the raw materials — markdown documents, ASCII diagrams, and structured JSON — that drive development and testing of that pipeline.

## Owner

**노비 (Nobi)** — Example development teammate.

## Role

- Manage sample markdown documents and ASCII diagrams for parser testing.
- Maintain structured JSON fixtures representing expected parser output.
- Provide sample input/output pairs for flowchart and UI mockup renderers.
- Supply end-to-end example data covering the full Araseo pipeline:
  1. Markdown/ASCII source → Parser → Structured JSON
  2. Structured JSON → Renderer → Visual output reference

## Repo Scope

- Work ONLY within this repo (`Araseo-example/`). Touching other repos is STRICTLY PROHIBITED.
- Follow the Core Pipeline and Key Modules defined in the parent project (`Araseo/CLAUDE.md`).
- Tasks are assigned from the parent level. Work ONLY within the assigned scope.

## Writing Convention

- All directives and instructions in rules/CLAUDE.md MUST be written in English.
- Examples and sample user expressions MUST be written in Korean.

## Status

Greenfield — initial project setup in progress.
