# Componentry

A multi-framework design system built with Stencil web components.

## Packages

| Package | Description |
|---|---|
| `@componentry/stencil` | Web components source of truth |
| `@componentry/react` | React wrappers (auto-generated) |
| `@componentry/angular` | Angular wrappers (auto-generated) |
| `@componentry/shared` | Shared types & utilities |

## Apps

| App | Description |
|---|---|
| `docs` | Storybook documentation |
| `examples-react` | React usage examples |
| `examples-angular` | Angular usage examples |
| `user-stories` | User story showcase |

## Getting Started

```bash
# Install dependencies
pnpm install

# Build everything (stencil first, then wrappers)
pnpm build

# Start docs
cd apps/docs && pnpm dev

# Start React examples
cd apps/examples-react && pnpm dev
```

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
