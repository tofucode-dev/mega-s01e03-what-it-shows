# #4471 follow-up: One-day shifts / premature invite: timing investigation

**Report count: 5 unique reports** in the 2026-10-04 export; received 2026-04-02 to 2026-10-04, across 5 tenants. This is a snapshot, not a live count.

## Observed symptoms; root cause unconfirmed

Five bodies do not establish a month/day swap. They mention a one-day offset, differing days between Lisbon and Toronto, or an invite preceding booking. This is an investigation ticket, not a claim that all five share a root cause. Split further if evidence proves distinct mechanisms.

The original causes.ts classifier reads tenant/channel/form but never report bodies; it places these five under parser. desk-notes.json flags the same IDs as oneDayMove. Thus its original parser total includes these five; the reconciled parser ticket excludes them, with no double counting.

## Evidence

- **R-41202**, kettle.books, email, received 2026-04-02T10:41:00+02:00:
  > Invite says Tuesday 12 May. Calendar says Monday 11 May. My client turned up on the Monday. We had coffee.

- **R-41209**, alder.physio, app, received 2026-04-06T15:18:00+02:00:
  > Every booking in June is one day off. Only June. Why only June.

- **R-41236**, nine.lanterns, app, received 2026-04-20T11:52:00+02:00:
  > The invite arrived before I made the booking. I would like to know how.

- **R-41344**, pale.harbour, email, received 2026-06-12T09:58:00+01:00:
  > Client in Lisbon got Tuesday. Client in Toronto got Monday. Same meeting. We held it twice.

- **R-41620**, lantern.row, email, received 2026-10-04T21:49:00+02:00:
  > Tuesday 6 October showed as Monday. I moved it myself. I have stopped reporting these but my colleague says it helps you.

## Investigation and acceptance

Collect the original input and intended local date, tenant/client timezones, UTC payload, invite/reminder timestamps and booking creation time for each ID. Compare Lisbon/Toronto displays of the same event and check DST boundaries; neither timezone nor DST is proven. R-41236 has no timestamps establishing causality. Link reproductions and confirmed mechanisms before assigning a fix or closing.

## Counting method and sources

427 export rows deduplicate by report ID to 412 reports merged into #4471. The disjoint follow-up split is parser: 374, hint: 33, timing: 5. The original classifier gives parser 379 and hint 33; the five body-level timing exceptions explain the difference. Intake labels are guesses, not causes. These are counts of reports, not distinct people or confirmed failures.

- [Raw reports](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/lib/data/reports-4471.json)
- [Tenant directory](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/lib/data/tenants)
- [Original classification logic](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/lib/kb/causes.ts)
- [Desk notes](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/lib/data/desk-notes.json)
- [Reconciled logic](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/lib/kb/followup.ts)
- [Membership and merge dates](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/evidence/report-membership.json)
- [Signed KB follow-up](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/src/routes/kb/incidents/4471-followup/+page.svx)
- [Actual rendered page](https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/rendered/kb/incidents/4471-followup/index.html)

## Report IDs (5)

R-41202, R-41209, R-41236, R-41344, R-41620
