---
name: Component
about: Add or change a Ni* field in one or both variants
title: "[COMPONENT] "
labels: ["COMPONENT"]
---

<!--
Formatting rules (Huly renders these issues too, and its markdown parser breaks on):
1. Hard-wrapped paragraphs — a paragraph split across multiple lines by single line
   breaks. Write each paragraph as one unbroken line, no matter how long.
2. GFM pipe tables (| a | b |) — use a bullet list instead.
Either one turns the whole issue body into flat/raw text in Huly. This comment itself
is invisible once rendered.
-->

## Component

Name of the field (e.g. `NiInput`) and which variant this covers.

## Variant

- [ ] Base UI (`@nimbuscn`)
- [ ] Radix UI (`@nimbuscn/radix`)

## Underlying Primitive

The Base UI or Radix primitive it wraps. If the target library has no equivalent primitive, say what it is built from instead.

## Work Mode

- [ ] UNCONTROLLED — a native input react-hook-form can register
- [ ] CONTROLLED — needs a value prop or emits a non-event payload

## Recipe

- [ ] Source extracted and `@monorepo/*` imports rewritten to shadcn aliases
- [ ] Registry item added with correct `registryDependencies`
- [ ] Demo file added under `registry/examples/`
- [ ] Docs page written (anatomy, props, examples)
- [ ] Live preview renders and hydrates
- [ ] Accessibility pass — keyboard map and ARIA contract documented

## Flag Behavior

How `readOnly`, `disabled`, `required` and `hideErrors` apply. If the field has a satellite picker, say how the flag reaches it.

## References
