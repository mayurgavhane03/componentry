# Componentry

A multi-framework design system built with Stencil web components.

## Packages

| Package | Description |
|---|---|
| `@componentry-ui/stencil` | Web components source of truth |
| `@componentry-ui/react` | React wrappers (auto-generated) |
| `@componentry-ui/angular` | Angular wrappers (auto-generated) |
| `@componentry-ui/theme` | Shared light and dark styles |
| `@componentry-ui/vue` | Vue wrappers (auto-generated) |

## Apps

| App | Description |
|---|---|
| `docs` | Docusaurus documentation |
| `examples-react` | React usage examples |
| `examples-angular` | Angular usage examples |
| `examples-vue` | Vue usage examples |
| `user-stories` | User story showcase and Storybook |

## Getting Started

```bash
# Use Node.js 22.12+ and pnpm 10 (see packageManager in package.json)
corepack enable
corepack prepare pnpm@10.0.0 --activate
pnpm install --frozen-lockfile

# Build everything (stencil first, then wrappers)
pnpm build

# Start docs (Docusaurus)
pnpm dev:docs

# Start React examples
pnpm dev:react
```

Run the other examples from the root with `pnpm dev:angular`, `pnpm dev:vue`,
or `pnpm dev:stories`. Use `pnpm storybook` for Storybook and `pnpm dev:stencil`
for the Stencil development server. `pnpm build:packages` builds only the
publishable packages; `pnpm build` builds the whole workspace.

On Windows, if Turbo reports that a path such as
`...\\npm\\node_modules\\pnpm\\pnpm` is not recognized, the installed pnpm
launcher is broken. Repair the pnpm installation (for example, use the Corepack
commands above), open a new terminal, and check `where pnpm` and
`pnpm --version` before rebuilding. A skipped pnpm native binary script only
affects startup performance; it is separate from that missing launcher error.

## Adding a New Component

```bash
cd packages/stencil-core
pnpm generate
# Enter component name, e.g. c-input
```

Then rebuild to regenerate React/Angular wrappers:

```bash
pnpm build
```

## Publishing

```bash
cd packages/stencil-core && npm publish --access public
cd ../react && npm publish --access public
cd ../angular && npm publish --access public
```
