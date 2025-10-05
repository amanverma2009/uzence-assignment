# Uzence - Front-End Assignment

## Tech

React + TypeScript + Tailwind CSS + Storybook

## Screenshot

![Screenshot](./src/assets/Screenshot%202025-10-05%20133748.png)

## Run locally

1. `npm install`
2. `npm run dev` - start app
3. `npm run storybook` - open Storybook at localhost
4. `npm test` - run tests (vitest + testing-library)

## What I built

- `InputField` — flexible text input with label, helper, error, disabled, invalid, variants (filled/outlined/ghost), sizes (sm/md/lg), optional clear button, password toggle, loading state, ARIA attributes.
- `DataTable` — generic table with column sorting, row selection (single/multiple), loading & empty states. Proper TypeScript generics and basic accessibility attributes.

## Storybook

- Components documented in Storybook. Build and deploy with Chromatic.

## Tests

- Basic tests using Vitest and React Testing Library (see `src/components/*/*.test.tsx`).

## Deployment

- Build Storybook (`npm run build-storybook`)
- For Chromatic: `npx chromatic --project-token=<TOKEN>` (add token from chromatic.com).

## Notes

- No external component libraries used. All UI coded from scratch with Tailwind classes.
- Accessibility: `aria-invalid`, `aria-describedby`, `aria-sort` and labels included for basic a11y.
