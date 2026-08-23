## Summary

## Related Issue

Closes #

## Type of Change

- [ ] Feature
- [ ] Bug fix
- [ ] Chore
- [ ] Docs
- [ ] Breaking change to generated code or the registry contract

## Variants Touched

- [ ] Base UI (`@nimbuscn`)
- [ ] Radix UI (`@nimbuscn/radix`)
- [ ] Neither — site, docs or tooling only

## Checklist

- [ ] `yarn check` passes (`astro check` + `tsc`)
- [ ] `yarn lint` and `yarn format:check` pass
- [ ] `yarn test` passes
- [ ] `yarn registry:build` succeeds and affected items still install into a clean app
- [ ] Every interactive demo carries a `client:*` directive
- [ ] Docs updated where behavior changed

## Upstream Note

Component source in `registry/` is generated from a private monorepo and synced one-way. A change to a generated file here has to be re-applied upstream by a maintainer — describe what needs porting, or say "not generated code".
