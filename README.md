# Schwarzschild Radius Playground

Open-source web calculator for exploring the physics of black holes.

- Instantly compute the Schwarzschild radius for any mass, or reverse-calculate the necessary mass for a given event horizon.
- Includes presets for common objects (Earth, Sun, Sgr A*), transparent units, and accessible explanations.
- Built with Vite + React, auto-committing and deploying via GitHub Actions.
- Designed for both learning and quick astrophysics reference.

## Quick Start

1. Clone repository:
   ```
   git clone https://github.com/m4rba4s/schwarzschild-playground.git
   cd schwarzschild-playground
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run locally:
   ```
   npm run dev
   ```

4. On push to `main`, auto-deploys to GitHub Pages.

## File structure

- `src/` — Calculator UI (React)
- `.github/workflows/deploy.yml` — GitHub Pages deploy workflow
- `AGENT_RULES.yml` — agent orchestration rules
- `PLAN.md` — agent build plan
- `verify.sh` — minimal CI sanity checks

## License

MIT
