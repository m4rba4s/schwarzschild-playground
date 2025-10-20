# Schwarzschild Playground

Open-source Vite + React + TypeScript micro-app for exploring the Schwarzschild radius. Compute the event horizon for any mass or invert the equation to find the mass required for a target radius. Presets cover Earth, Sun, Sagittarius A*, and more to support both quick astrophysics reference and interactive learning.

## Quick Start

1. Clone repository:
   ```bash
   git clone git@github.com:m4rba4s/schwarzschild-playground.git
   cd schwarzschild-playground
   ```
2. Install dependencies (pnpm preferred, falls back to npm):
   ```bash
   ./scripts/bootstrap.sh
   ```
   or manually
   ```bash
   cd web
   pnpm install # npm install
   pnpm run build
   ```
3. Run locally:
   ```bash
   cd web
   pnpm run dev # npm run dev
   ```
4. Before committing, run the full check:
   ```bash
   ./scripts/verify.sh
   ```
5. Pushes to `main` trigger GitHub Pages deployment via Actions.

## Local Development
1. Install Node.js 20+ (pnpm recommended).
2. `cd web && pnpm install` (or `npm install`).
3. `pnpm run dev` to launch Vite’s dev server (`npm run dev` also works).
4. Edit files under `web/src`; the playground lives in `App.tsx`.

## Repository Layout
- `AGENT_RULES.yml` — automation guardrails (single source of truth).
- `AGENT_PROMPT.md` — seed prompt with execution contract.
- `planning/PLAN.md` — kickoff checklist printed before work begins.
- `specs/` — product brief and architecture notes for the app.
- `scripts/` — helper scripts used locally and in CI.
- `web/` — Vite + React SPA that computes Schwarzschild radius and inverse mass.
- `.github/` — CI configuration, issue templates, CODEOWNERS, and deploy workflow.
- `SECURITY.md` — vulnerability disclosure policy.

## Automation Expectations
1. Agents must read `README.md`, `specs/*.md`, and `AGENT_RULES.yml` before planning work.
2. All edits must pass `./scripts/verify.sh` locally prior to commit.
3. Conventional commits only; each logical change is an atomic commit.
4. On missing permissions or ambiguities, create `ASSUMPTIONS.md` or open an issue as directed in `AGENT_RULES.yml`.

## Deployment
GitHub Actions builds the site on `main` and publishes the `web/dist` artifact to GitHub Pages via `.github/workflows/deploy_pages.yml`. Ensure Pages is enabled and pointed at the `github-pages` environment.

## License

MIT
