# AGENTS.md

## Purpose
This file is an execution guide for coding agents working in `@web3r/flowerkit`.
Use it to make safe, fast, repo-native changes with minimal context switching.

## Project Snapshot
- Package: `@web3r/flowerkit`
- Runtime target: browser-first utilities with SSR-safe helpers
- Language/tooling: TypeScript + Rollup + Babel
- Module format output: ESM (`.mjs`) + CJS (`.cjs`) + declarations (`.d.mts`)
- Node engine: read from `package.json > engines.node`
- Monorepo: no (single package)

## High-Level Architecture
- Source of truth is `src/`.
- Public API is split into subpath kits:
  - `arr`, `css`, `date`, `dom`, `evt`, `fn`, `json`, `net`, `num`, `obj`, `str`, `user`
- Root entrypoint `src/index.ts` re-exports namespace kits (`arrKit`, `domKit`, etc.).
- Every utility typically lives in `src/<kit>/<utility>/index.ts`.
- Most utilities have a colocated `index.test.ts`.
- API docs are generated into `docs/*.md` from JSDoc.
- Build artifacts are committed under `dist/`.

## Directory Map
- `src/` implementation and tests.
- `dist/` build output (ESM/CJS/types).
- `docs/` generated API markdown.
- `lib/scripts/docs.ts` docs generator and validator (public API coverage, Markdown, links, and TypeScript examples).
- `lib/scripts/bundleSize.ts` representative bundle-size checks.
- `lib/scripts/removeFiles.ts` declaration post-processing (`.d.ts` cleanup, import rewrite to `.d.mts`).
- `lib/scripts/verifyPackage.ts` packed-package size and consumer smoke tests.
- `rollup.config.ts` build config.
- `eslint.config.ts` lint rules.
- `commitlint.config.ts` commit message rules.
- `.github/workflows/ci.yml` Node.js 22/24 verification matrix.
- `.husky/pre-commit` runs `npm run lint-staged`.
- `.husky/commit-msg` runs commitlint.

## Utility Inventory
Current kits:
- `arr`, `css`, `date`, `dom`, `evt`, `fn`, `json`, `net`, `num`, `obj`, `str`, `user`

Recompute counts quickly when needed:
- Public utility count (counts exported function implementations and ignores barrel `index.ts` files):
  - `$counts = Get-ChildItem src -Recurse -File -Filter index.ts | ForEach-Object { ([regex]::Matches((Get-Content -Raw $_.FullName), '(?m)^export const\s+\w+\s*=')).Count }; ($counts | Measure-Object -Sum).Sum`
- Per-kit public utility counts:
  - `foreach($m in 'arr','css','date','dom','evt','fn','json','net','num','obj','str','user'){ $counts = Get-ChildItem \"src/$m\" -Recurse -File -Filter index.ts | ForEach-Object { ([regex]::Matches((Get-Content -Raw $_.FullName), '(?m)^export const\s+\w+\s*=')).Count }; \"$m=$(($counts | Measure-Object -Sum).Sum)\" }`

## Core Commands
Use `npm.cmd` on Windows PowerShell if `npm.ps1` is blocked by ExecutionPolicy.

- Install deps:
  - `npm.cmd install`
- Lint:
  - `npm.cmd run lint`
- Lint scripts/config files outside `src` explicitly:
  - `npm.cmd exec -- eslint lib rollup.config.ts eslint.config.ts commitlint.config.ts`
- Typecheck:
  - `npm.cmd run typecheck`
- Tests:
  - `npm.cmd test`
- Coverage with enforced thresholds:
  - `npm.cmd run test:coverage`
- Regenerate and validate API docs only:
  - `node ./lib/scripts/docs.ts`
- Representative bundle-size budgets:
  - `npm.cmd run verify:size`
- Packed-package budgets plus ESM/CJS/types consumer smoke tests:
  - `npm.cmd run verify:package`
- Full build pipeline:
  - `npm.cmd run build`

Important lint scope:
- `npm run lint` currently checks only `src/`.
- When changing `lib/**/*.ts` or root TypeScript config files, run ESLint explicitly for those paths in addition to `npm run lint`.

`npm run build` chain:
1. `prebuild`: lint + typecheck + test
2. rollup build
3. `postbuild`: regenerate and validate docs + normalize declarations

## Test Setup
- Runner: Node test runner (`node --test`)
- DOM environment for tests: `global-jsdom/register` via `NODE_OPTIONS`
- Get current status by running:
  - `npm.cmd test`
- Meta test: `src/index.test.ts` checks each kit `index.ts` exports all utility folders.
- `npm run test:coverage` enforces 90% lines, 80% branches, and 90% functions.

## Coding Conventions (important)

### Imports and module style
- ESM only (`"type": "module"` in package).
- Keep explicit `.ts` extension in internal imports (repo convention).
- Prefer named exports; no default exports in utilities.

### Types pattern
Each utility usually exports:
- `export type T<FnName>Args = Parameters<typeof <fnName>>;`
- `export type T<FnName>Return = ReturnType<typeof <fnName>>;`

Type naming conventions enforced by ESLint:
- Type aliases: PascalCase and must start with `T...`
- Interfaces: PascalCase and must start with `I...`

### Validation style
- Utilities often validate runtime input early.
- Throw or reject with clear `TypeError` messages in format:
  - `<fnName>: <arg> must ...`

### JSDoc
- Public functions are documented.
- Include `@param`, `@returns`, and `@throws` when relevant.
- Every public function must have at least two non-empty `@example` blocks.
- Prefer task-focused examples that reflect realistic frontend search intent; examples are future per-utility page content.
- TypeScript examples must be syntactically valid, but may use illustrative variables such as `products` or `userIds`.
- Mark implementation-only documented helpers with `@internal` and do not export them from the kit index.
- `lib/scripts/docs.ts` filters documentation by the kit's public exports and validates Markdown, links, code fences, example counts, and TypeScript syntax before writing files.

### Formatting/lint specifics
- 2-space indentation.
- Double quotes.
- Semicolons required.
- `import/order` and `sort-exports` are enforced.
- `no-console` is enabled (only specific methods allowed).

## SSR and Browser Compatibility Rules
- For window/document usage, prefer `ssr-window` helpers (`getWindow`, `getDocument`) where applicable.
- `node-html-parser` is used as server-side fallback for `getHTMLFromStr`.
- Avoid direct unguarded browser globals in new code unless intentionally browser-only.

## Build and Packaging Notes
- Rollup preserves module structure (`preserveModules`).
- Output is generated under `dist/` with `.mjs` and `.cjs` per source module.
- Declaration flow:
  - TS plugin emits `.d.ts`
  - copy plugins create `.d.mts`
  - `removeFiles.ts` rewrites declaration imports to `.d.mts` and deletes `.d.ts`
- Subpath exports are explicitly defined in `package.json` (`exports`, `typesVersions`).

## Change Playbooks

### 1) Modify existing utility
1. Edit implementation in `src/<kit>/<utility>/index.ts`.
2. Update/add tests in `src/<kit>/<utility>/index.test.ts`.
3. Ensure JSDoc reflects behavior changes.
4. Run:
   - `npm.cmd run typecheck`
   - `npm.cmd test`
   - `npm.cmd run lint`
5. If runtime output changes, run `npm.cmd run verify:size`.
6. If preparing committed release output, run `npm.cmd run build`.

### 2) Add new utility to existing kit
1. Create folder `src/<kit>/<newUtility>/`.
2. Add `index.ts` with function + exported `T...Args` and `T...Return`.
3. Add `index.test.ts`.
4. Export function and types from `src/<kit>/index.ts`.
5. Run tests; `src/index.test.ts` will fail if exports are incomplete.
6. If preparing release artifacts, run `npm.cmd run build` (updates `dist` and `docs`).
7. Run `npm.cmd run verify:size` and `npm.cmd run verify:package` for a publishable change.

### 3) Add a new top-level kit
1. Create `src/<newKit>/index.ts` and utility folders.
2. Export namespace in `src/index.ts` (`export * as <newKit>Kit ...`).
3. Update `package.json`:
   - `exports["./<newKit>"]`
   - `typesVersions["*"]["<newKit>"]`
4. Ensure docs generation handles the kit name (`lib/scripts/docs.ts`, `getDocName` switch).
5. Build and verify generated `dist/<newKit>` and `docs/<newKit>.md`.
6. Run `npm.cmd run verify:size` and `npm.cmd run verify:package`.

### 4) Update JSDoc or generated API docs
1. Edit JSDoc in `src`; never edit `docs/*.md` manually.
2. Keep at least two realistic examples for every affected public function.
3. Run `node ./lib/scripts/docs.ts`; generation fails on invalid Markdown, missing public entities, bad links, insufficient examples, or invalid TypeScript syntax.
4. Review the generated kit Markdown and commit it with the source change.
5. Run `npm.cmd run build` when release artifacts in `dist/` must also be refreshed.

### 5) Update network utilities (`net/*`)
- Preserve method/body behavior in `getFromServer`.
- Keep timeout and external abort behavior covered by tests.
- Be careful with `multipart/form-data`: do not hardcode content-type boundary headers.

### 6) Prepare package or release output
1. Update source, tests, JSDoc, and `CHANGELOG.md` as appropriate.
2. Run `npm.cmd run build` to refresh tracked `dist/` and `docs/`.
3. Run `npm.cmd run test:coverage` for coverage gates.
4. Run `npm.cmd run verify:size` for representative tree-shaken bundle budgets.
5. Run `npm.cmd run verify:package` to check tarball contents, budgets, ESM/CJS imports, and consumer types.
6. Inspect the final package diff; do not manually edit generated artifacts.

## Known Gotchas
- On PowerShell, `npm` can fail due to `npm.ps1` policy; use `npm.cmd`.
- `rg` (ripgrep) may be unavailable in some Windows environments. If `rg` is missing from `PATH`, use PowerShell fallbacks (`Get-ChildItem` + `Select-String`) instead of failing commands.
- `dist/` is tracked (not ignored). Release-related changes may require committing `dist` updates.
- `docs/` are generated; manual edits may be overwritten by `postbuild`.
- `src/net/getObjFromFormData/index.ts` delegates to `src/obj/getObjFromFormData/index.ts`; change behavior in the object implementation and keep the network facade's tests/JSDoc aligned.
- `lib/scripts/docs.ts` uses `markdownlint` programmatically. Intentional generated-doc exceptions live in that script; do not add broad rule disables without reviewing generated output.
- `npm run lint` does not cover `lib/` or root config files; lint those paths explicitly after changing them.
- `npm run verify:package` creates an npm tarball and a temporary consumer install; run it after a successful build.
- `lint-staged` currently runs `eslint ./src --fix` for `*.ts`, so commits can reformat broader source scope.

## Fast Navigation Shortcuts
- List utility files:
  - `rg --files src`
  - Fallback: `Get-ChildItem -Recurse -File src | ForEach-Object { $_.FullName }`
- Find exported symbols in kit indexes:
  - `rg "^export (type )?\{" src/*/index.ts`
  - Fallback: `Get-ChildItem -File src/*/index.ts | Select-String -Pattern "^export (type )?\{"`
- Find all tests:
  - `rg --files src | rg "index\.test\.ts$"`
  - Fallback: `Get-ChildItem -Recurse -File src -Filter index.test.ts | ForEach-Object { $_.FullName }`
- Find SSR-window usage:
  - `rg "ssr-window" src`
  - Fallback: `Get-ChildItem -Recurse -File src | Select-String -Pattern "ssr-window"`

## Definition of Done (for most code tasks)
- Behavior implemented in `src`.
- Tests updated/added and passing.
- Kit exports updated.
- JSDoc updated with at least two valid examples for every affected public function.
- `npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd test` pass locally.
- Changed TypeScript outside `src/` is linted explicitly.
- If JSDoc or public API changes, regenerate and review `docs/`.
- If runtime, package API, or release output changes, run the full build and review tracked `dist/` and `docs/`.
- For publishable changes, `test:coverage`, `verify:size`, and `verify:package` pass.
