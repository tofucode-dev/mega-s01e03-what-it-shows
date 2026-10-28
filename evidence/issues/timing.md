# #4471 follow-up: One-day date shifts: timing investigation

**Report count: 4 unique reports** in the 2026-10-04 export; received 2026-04-02 to 2026-10-04, across 4 tenants. This is a snapshot, not a live count.

## Observed problem: one-day date shifts

The listed reports describe a one-day offset or differing days between Lisbon and Toronto. The exact mechanism is unconfirmed. This ticket covers only one-day shifts, not other reported symptoms. Split further if evidence establishes distinct mechanisms.

## Evidence

- **R-41202**, kettle.books, email, received 2026-04-02T10:41:00+02:00:
  > Invite says Tuesday 12 May. Calendar says Monday 11 May. My client turned up on the Monday. We had coffee.

- **R-41209**, alder.physio, app, received 2026-04-06T15:18:00+02:00:
  > Every booking in June is one day off. Only June. Why only June.

- **R-41344**, pale.harbour, email, received 2026-06-12T09:58:00+01:00:
  > Client in Lisbon got Tuesday. Client in Toronto got Monday. Same meeting. We held it twice.

- **R-41620**, lantern.row, email, received 2026-10-04T21:49:00+02:00:
  > Tuesday 6 October showed as Monday. I moved it myself. I have stopped reporting these but my colleague says it helps you.

## Investigation and acceptance

Collect original input and intended local date, tenant/client timezones, UTC payload and invite/reminder timestamps for each ID. Compare Lisbon/Toronto displays of the same event and check DST boundaries; neither timezone nor DST is proven. Link reproductions and confirmed mechanisms before assigning a fix or closing.

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

## Report IDs (4)

R-41202, R-41209, R-41344, R-41620
