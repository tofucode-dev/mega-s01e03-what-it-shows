# #4471 follow-up: Invite reportedly arrives before booking creation

**Report count: 1 unique reports** in the 2026-10-04 export; received 2026-04-20 to 2026-04-20, across 1 tenants. This is a snapshot, not a live count.

## Observed problem: invite reportedly arrived before its booking

R-41236, nine.lanterns, app, received 2026-04-20T11:52:00+02:00:

> The invite arrived before I made the booking. I would like to know how.

This does not report a month/day swap or a one-day date shift. It requires its own ticket, not a shared fix inferred from other reports. No scheduler defect, clock defect or other root cause is proven.

## Investigation and acceptance

Collect booking creation and invite generation/delivery timestamps, booking identity, audit logs and correlation IDs. Check event ordering, retries and which booking the invite references. Determine whether the claimed ordering is real before assigning a fix. Reproduce any established ordering failure and verify it is resolved before closing.

The original tenant-only classifier files this report under parser; desk-notes.json includes it in oneDayMove. Its body supports neither label. This ticket covers only R-41236 and removes it from both the parser and one-day-shift counts.

## Counting method and sources

427 export rows deduplicate by report ID to 412 reports merged into #4471. The disjoint follow-up split is parser: 374, hint: 33, timing: 4, premature: 1. The original classifier gives parser 379 and hint 33; the five body-level timing exceptions explain the difference. Intake labels are guesses, not causes. These are counts of reports, not distinct people or confirmed failures.

- [Raw reports](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/lib/data/reports-4471.json)
- [Tenant directory](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/lib/data/tenants)
- [Original classification logic](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/lib/kb/causes.ts)
- [Desk notes](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/lib/data/desk-notes.json)
- [Reconciled logic](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/lib/kb/followup.ts)
- [Membership and merge dates](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/evidence/report-membership.json)
- [Signed KB follow-up](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/routes/kb/incidents/4471-followup/+page.svx)
- [Actual rendered page](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/rendered/kb/incidents/4471-followup/index.html)

## Report IDs (1)

R-41236
