# #4471 follow-up: booking-v3 date hint contradicts tenant parsing

**Report count: 33 unique reports** in the 2026-10-04 export; received 2026-04-17 to 2026-09-22, across 3 tenants. This is a snapshot, not a live count.

## Mechanism and impact

booking-v3 prints MM/DD/YYYY under the date field, but the form reads dates in the day-first tenant's order. Following that hint can swap month and day. R-41241 is an alder.physio form report (de-DE, booking-v3) with browserLocale en-US; use tenant/form context rather than browser or intake. No running-product reproduction or shipped fix has been verified.

## Scope and proposed fix

Only form-channel reports from day-first tenants running booking-v3: alder.physio, copper.studio and pale.harbour. This ticket covers only the misleading date-format hint and the listed IDs. Align the hint, validation, date interpretation and saved value with the tenant contract.

## Acceptance

A user following the displayed hint gets the intended date. Regression tests distinguish booking-v2/v3 and app/email/form, including browsers whose locale differs from the tenant. Verify this form behavior independently of other tickets.

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

## Report IDs (33)

R-41230, R-41241, R-41251, R-41259, R-41262, R-41275, R-41294, R-41305, R-41308, R-41366, R-41372, R-41384, R-41387, R-41396, R-41400, R-41406, R-41415, R-41416, R-41418, R-41428, R-41439, R-41441, R-41449, R-41453, R-41456, R-41460, R-41472, R-41485, R-41493, R-41539, R-41572, R-41582, R-41584
