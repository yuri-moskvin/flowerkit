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
- `lib/scripts/docs.ts` docs generator.
- `lib/scripts/removeFiles.ts` declaration post-processing (`.d.ts` cleanup, import rewrite to `.d.mts`).
- `rollup.config.ts` build config.
- `eslint.config.ts` lint rules.
- `commitlint.config.ts` commit message rules.
- `.husky/pre-commit` runs `npm run lint-staged`.
- `.husky/commit-msg` runs commitlint.

## Utility Inventory
Current kits:
- `arr`, `css`, `date`, `dom`, `evt`, `fn`, `json`, `net`, `num`, `obj`, `str`, `user`

Recompute counts quickly when needed:
- Utility implementation file count:
  - `Get-ChildItem -Recurse -File src -Filter index.ts | Where-Object { $_.FullName -notmatch '\\src\\(arr|css|date|dom|evt|fn|json|net|num|obj|str|user)\\index\\.ts$' -and $_.FullName -notmatch '\\src\\index\\.ts$' } | Measure-Object`
- Per-kit utility folder counts:
  - `foreach($m in 'arr','css','date','dom','evt','fn','json','net','num','obj','str','user'){ \"$m=$((Get-ChildItem -Recurse -File \"src/$m\" -Filter index.ts | Where-Object { $_.DirectoryName -notmatch \"\\\\src\\\\$m$\" }).Count)\" }`

## Core Commands
Use `npm.cmd` on Windows PowerShell if `npm.ps1` is blocked by ExecutionPolicy.

- Install deps:
  - `npm.cmd install`
- Lint:
  - `npm.cmd run lint`
- Typecheck:
  - `npm.cmd run typecheck`
- Tests:
  - `npm.cmd test`
- Full build pipeline:
  - `npm.cmd run build`

`npm run build` chain:
1. `prebuild`: lint + typecheck + test
2. rollup build
3. `postbuild`: regenerate docs + normalize declarations

## Test Setup
- Runner: Node test runner (`node --test`)
- DOM environment for tests: `global-jsdom/register` via `NODE_OPTIONS`
- Get current status by running:
  - `npm.cmd test`
- Meta test: `src/index.test.ts` checks each kit `index.ts` exports all utility folders.

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
- Include `@param`, `@returns`, `@throws`, `@example` when relevant.
- Docs generation depends on JSDoc quality.

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

### 2) Add new utility to existing kit
1. Create folder `src/<kit>/<newUtility>/`.
2. Add `index.ts` with function + exported `T...Args` and `T...Return`.
3. Add `index.test.ts`.
4. Export function and types from `src/<kit>/index.ts`.
5. Run tests; `src/index.test.ts` will fail if exports are incomplete.
6. If preparing release artifacts, run `npm.cmd run build` (updates `dist` and `docs`).

### 3) Add a new top-level kit
1. Create `src/<newKit>/index.ts` and utility folders.
2. Export namespace in `src/index.ts` (`export * as <newKit>Kit ...`).
3. Update `package.json`:
   - `exports["./<newKit>"]`
   - `typesVersions["*"]["<newKit>"]`
4. Ensure docs generation handles the kit name (`lib/scripts/docs.ts`, `getDocName` switch).
5. Build and verify generated `dist/<newKit>` and `docs/<newKit>.md`.

### 4) Update network utilities (`net/*`)
- Preserve method/body behavior in `getFromServer`.
- Keep timeout and external abort behavior covered by tests.
- Be careful with `multipart/form-data`: do not hardcode content-type boundary headers.

## Known Gotchas
- On PowerShell, `npm` can fail due to `npm.ps1` policy; use `npm.cmd`.
- `dist/` is tracked (not ignored). Release-related changes may require committing `dist` updates.
- `docs/` are generated; manual edits may be overwritten by `postbuild`.
- There are two similar implementations:
  - `src/obj/getObjFromFormData/index.ts`
  - `src/net/getObjFromFormData/index.ts`
  Keep behavior aligned if touching either.
- `lint-staged` currently runs `eslint ./src --fix` for `*.ts`, so commits can reformat broader source scope.

## Fast Navigation Shortcuts
- List utility files:
  - `rg --files src`
- Find exported symbols in kit indexes:
  - `rg "^export (type )?\{" src/*/index.ts`
- Find all tests:
  - `rg --files src | rg "index\.test\.ts$"`
- Find SSR-window usage:
  - `rg "ssr-window" src`

## Definition of Done (for most code tasks)
- Behavior implemented in `src`.
- Tests updated/added and passing.
- Kit exports updated.
- JSDoc updated.
- Lint + typecheck + tests pass locally.
- If change affects package API or release output, regenerate `dist` and `docs` via build.
