# DIUDARA — Hi-Fi Mockup

Static frontend mockup (React + Vite + TypeScript, no backend/database) for the
DIUDARA paid community gateway product. Purpose: visual/interaction reference for the
dev team, deployed as a static site to Vercel.

## Stack
- React 18 + Vite + TypeScript
- React Router (client-side routing, no SSR)
- Plain CSS with design tokens in `src/styles/tokens.css` — no Tailwind/UI framework
- All data is dummy/mocked in `src/data/mock.ts` — never wire up real APIs here

## Design system
- Palette "Udara — Langit & Sinyal": see CSS variables in `src/styles/tokens.css`
  (`--langit`, `--sinyal`, `--kabut`, `--awan`, `--hijau-lepas`, `--merah-senja`)
- Typography: Bricolage Grotesque (display/headings) + Plus Jakarta Sans (body/UI)
- Reuse existing `.card`, `.btn`, `.badge`, `.input` classes from tokens.css instead of
  inventing new ad-hoc styles.

## Structure
```
src/
  components/layout/AppShell.tsx   sidebar nav wrapper
  components/ui/                   shared small components (Avatar, etc.)
  data/mock.ts                     all dummy Indonesian content
  pages/                           one file per route/page
  styles/tokens.css                design tokens (colors, fonts, base classes)
```

## Session workflow (IMPORTANT — read before starting work)
This project uses a lightweight planning workflow in `Docs/`:
- `Docs/SUMMARY.md` — current overall state of the project, always read this first
- `Docs/pending_works/*.md` — one file per feature/task not yet finished
- `Docs/completed_works/*.md` — finished feature files, moved here when done
- `Docs/LOG.md` — append-only changelog, one entry per session

Use `/start-session` at the beginning of a work session and `/end-session` at the end.
Do not read the entire codebase by default — only read what the active plan file
references. See `.claude/commands/start-session.md` and `end-session.md` for the
exact procedure.

## Conventions
- Bahasa Indonesia for all UI copy/content; English is fine for code, comments, commit
  messages.
- Keep components self-contained per page; avoid premature abstraction until a pattern
  repeats 3+ times.
- Don't add new npm dependencies without a clear reason — this is meant to stay a
  lightweight static mockup.
