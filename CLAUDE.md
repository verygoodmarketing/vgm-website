# VGM Website Development Guide

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier
- `npm run lint` - Check code formatting with Prettier
- `npm run typecheck` - Type check TypeScript files

## Style Guidelines

- **Imports**: Sort imports alphabetically. Group: 1) React/libs 2) Components 3) Utils
- **TypeScript**: Use strict type checking. Prefer explicit types over `any`
- **Components**: React components use `.tsx`, Astro components use `.astro`
- **Naming**: PascalCase for components, camelCase for variables/functions
- **CSS**: Use Tailwind utility classes with composition via `cn()` utility
- **Error handling**: Use try/catch with specific error types and proper logging
- **State management**: Prefer component state/props, use Context for global state
- **File organization**: Group by feature in the `src` directory
- **Path aliases**: Import from `@/*` paths rather than relative paths
