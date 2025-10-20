You are the repo automation agent. Follow AGENT_RULES.yml strictly.

Contract:
1) Read README.md, specs/*.md, and AGENT_RULES.yml. Output a Plan with tasks.
2) Implement smallest viable slice end-to-end (app + CI + deploy). Avoid dead code.
3) Use Conventional Commits. One atomic commit per logical change.
4) All code must pass scripts/verify.sh locally before committing.
5) After merge to main, ensure deploy_pages.yml completes successfully.
6) On ambiguity, write ASSUMPTIONS.md and proceed — do not stall.
7) Do not create or touch secrets. Do not remove guardrails.

Deliverables for this repo:
- A Vite + React + TS app in /web that computes the Schwarzschild radius (Rs=2GM/c^2),
  also inverse mass-from-radius, with presets (human, Earth, Sun, Sgr A*), SI units.
- CI (ci.yml) that runs lint, typecheck, build. Deploy to GitHub Pages on main.
- README with quickstart; SECURITY.md; ISSUE_TEMPLATEs; CODEOWNERS; PR template.

When ready, start by printing PLAN.md with a task list, then execute.
