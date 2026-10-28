# kb — the support knowledge base

## S01E03 follow-up

- [Signed follow-up source](src/routes/kb/incidents/4471-followup/+page.svx)
- [Rendered follow-up HTML](rendered/kb/incidents/4471-followup/index.html) — download and open locally, or serve `rendered/` with a static server. This is actual Svelte server-rendered output, not a screenshot or a hand-written approximation. Interactive controls on the historical triage page are static in this export.
- [Public tickets](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/issues)
- [Auditable report membership](evidence/report-membership.json)
- [Proposed replacement decision](src/routes/kb/decisions/0002-dedupe-by-evidence/+page.svx)

The first commit preserves the unmodified course export. Accepted decision 0001 and the original incident,
triage rules and cause classifier remain unchanged. The KB index discovers both added pages automatically.
The follow-up reproduces the desk's exported counts: parser 379 and form hint 33.
Four one-day shifts and one premature invite are flagged within the parser total, not subtracted from it.
Their supplementary investigation tickets do not assert a shared root cause or add reports to the total.
Counts cover the export through 2026-10-04, not a live queue.
The later [engineering update](src/lib/data/engineering-update.json) says #4471 closed 05 oct:
parser fixed; hint won't fix because booking-v3 was retired. These are distinct outcomes,
not a claim that every closed ticket received a fix. Supplementary symptom evidence is retained,
without claiming it was resolved.

### Reproduce

Requires Node.js 22.19 or newer and npm. Project-local build dependencies are locked in `package-lock.json`.

```sh
npm ci
npm run build
npm test
```

`scripts/render.mjs` compiles MDsveX and Svelte, resolves the original Vite glob imports and renders every
KB page with its runbook layout and component CSS. It derives the report membership JSON from the same
logic as the page. `node scripts/issue-drafts.mjs` regenerates local issue bodies but does not change GitHub.
No build script sends reports anywhere. No GitHub Pages site has been enabled.

The render uses the build machine's current date for the original layout's staleness calculation.
The source page's signature is passed to the original `RenderStamp`, which derives the desk reference.
Reports contain fictional course-story evidence; no sign-in links or credentials belong in this repo.

---

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.
