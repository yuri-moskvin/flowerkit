# Contributing to FlowerKit

Thanks for helping improve FlowerKit. Bug reports, real frontend use cases,
documentation fixes, tests, and focused utility proposals are welcome.

By participating, you agree to follow the
[Code of Conduct](./CODE_OF_CONDUCT.md). For usage questions and troubleshooting,
see [SUPPORT.md](./SUPPORT.md). Report suspected vulnerabilities privately as
described in [SECURITY.md](./SECURITY.md).

## Before You Start

Search the existing issues and discussions before opening a new one. Open an
issue before implementing a large, cross-kit, or breaking change so the problem
and public API can be discussed first. Small fixes may go directly to a focused
pull request.

A new utility should:

- Solve a recurring application-level problem
- Have a small and predictable API
- Avoid duplicating an existing FlowerKit helper
- Preserve browser and SSR compatibility where applicable
- Be independently importable through the appropriate kit

## Local Development

FlowerKit requires Node.js 22 or newer. Clone the repository and install the
locked dependency versions:

```bash
npm ci
```

Run the main development checks:

```bash
npm run lint
npm run typecheck
npm test
```

The build command runs those checks before generating the package output and API
documentation:

```bash
npm run build
```

## Utility Conventions

When adding or changing a public utility:

- Put the implementation in `src/<kit>/<utility>/index.ts`
- Add or update the colocated `index.test.ts`
- Export the function and its public argument and return types from the kit
  `index.ts`
- Keep explicit `.ts` extensions in internal imports
- Validate runtime inputs early and use clear `<function>: <argument> must ...`
  errors
- Add JSDoc with parameters, return value, thrown errors where relevant, and at
  least two practical `@example` blocks
- Guard browser globals or use the existing SSR-safe helpers
- Update `CHANGELOG.md` for consumer-visible changes

Public function types normally follow this pattern:

```ts
export type TFunctionNameArgs = Parameters<typeof functionName>;
export type TFunctionNameReturn = ReturnType<typeof functionName>;
```

Do not edit generated files in `docs/` or `dist/` by hand. Update the source and
run the build instead.

## Testing and Verification

Tests should cover the intended behavior, invalid runtime inputs, and relevant
browser or SSR edge cases. Before opening a pull request, run:

```bash
npm run build
npm run test:coverage
npm run verify:size
npm run verify:package
```

The package verification installs the generated tarball into a temporary
consumer project and checks ESM, CommonJS, declarations, and public subpath
imports.

## Pull Requests

Keep each pull request focused. In its description, explain:

- The consumer problem being solved
- The chosen behavior and any compatibility considerations
- The tests added or updated
- Any public API, bundle-size, or breaking-change impact

Include generated `docs/` and `dist/` changes when the public API, runtime
output, types, or JSDoc changes. Make sure CI passes and address review feedback
with additional commits rather than hiding unrelated changes in the pull
request.

Commit messages are checked against the Conventional Commits format. Examples:

```text
feat(fn): add cancelable delay utility
fix(dom): preserve nodes during wrapper cleanup
docs(arr): clarify grouping examples
```

By contributing, you agree that your contributions will be licensed under the
project's [MIT License](./LICENSE).
