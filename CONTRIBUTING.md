# Contributing to FlowerKit

Thanks for helping improve FlowerKit. Bug reports, real frontend use cases, documentation fixes, and focused utility proposals are welcome.

## Before proposing a utility

A new utility should solve a recurring application-level problem, have a small and predictable API, preserve browser and SSR compatibility where applicable, and avoid duplicating an existing FlowerKit helper.

Open an issue before implementing a large or breaking change so the API can be discussed first.

## Local development

FlowerKit requires Node.js 22 or newer.

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
npm run verify:package
npm run verify:size
```

The build command already runs linting, type checking, and tests before generating `dist` and API documentation.

## Utility conventions

- Put each utility in `src/<kit>/<utility>/index.ts`.
- Add a colocated `index.test.ts`.
- Export the function and its public types from the kit `index.ts`.
- Use explicit `.ts` extensions for internal imports.
- Add JSDoc with parameters, return value, errors, and at least one practical example.
- Guard browser globals or use the existing SSR-safe helpers.
- Update `CHANGELOG.md` for user-visible changes.

## Pull requests

Keep pull requests focused and explain the consumer-facing reason for the change. Include tests for behavior changes and do not manually omit generated `dist` or `docs` updates when the public API changes.
