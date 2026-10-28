# #4471 follow-up: Invite reportedly arrives before booking creation

**Report count: 1 unique reports** in the 2026-10-04 export; received 2026-04-20 to 2026-04-20, across 1 tenants. This is a snapshot, not a live count.

Supplementary symptom investigation: these IDs remain counted in issue #2 under the exported desk view. Do not add this count to the two cause-ticket totals.

## Observed problem: invite reportedly arrived before its booking

R-41236, nine.lanterns, app, received 2026-04-20T11:52:00+02:00:

> The invite arrived before I made the booking. I would like to know how.

This ticket covers only the reported event-ordering problem and only R-41236. No scheduler defect, clock defect or other root cause is proven.

## Investigation and acceptance

Collect booking creation and invite generation/delivery timestamps, booking identity, audit logs and correlation IDs. Check event ordering, retries and which booking the invite references. Establish whether the claimed ordering is real before assigning a fix. Reproduce any established ordering failure and verify it is resolved before closing.

## Latest recorded outcome

Close supplementary tracking as **not planned**, consolidating the original evidence into the signed KB follow-up. No independent cause or verified fix was established for these symptoms; closure does not mean they were fixed.

## Counting method and sources

Count each listed report ID once, ignoring overlapping export rows. These are report counts, not distinct people or confirmed failures. This issue covers one problem only; the KB page holds the complete reconciliation across tickets.

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
