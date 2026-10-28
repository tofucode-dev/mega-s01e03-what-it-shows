# #4471 follow-up: booking-v3 date hint contradicts tenant parsing

**Report count: 33 unique reports** in the 2026-10-04 export; received 2026-04-17 to 2026-09-22, across 3 tenants. This is a snapshot, not a live count.

## Mechanism and impact

booking-v3 prints MM/DD/YYYY under the date field, but the form reads the date in the day-first tenant's order. Following the hint can therefore swap month and day. This differs from the shared parser bug and needs a separate fix. R-41241 is an alder.physio form report (de-DE, booking-v3) with browserLocale en-US; tenant/form context, not browser or intake, determines this category. No running-product reproduction or shipped fix has been verified.

## Scope and proposed fix

Form-channel reports from day-first tenants running booking-v3: alder.physio, copper.studio and pale.harbour. Align the hint, validation, parsing and saved value with the tenant's date contract.

## Acceptance

A user following the displayed hint gets the intended date. Regression tests distinguish booking-v2/v3 and app/email/form, including browsers whose locale differs from the tenant. A shared-parser patch alone is not evidence this is fixed.

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

## Report IDs (33)

R-41230, R-41241, R-41251, R-41259, R-41262, R-41275, R-41294, R-41305, R-41308, R-41366, R-41372, R-41384, R-41387, R-41396, R-41400, R-41406, R-41415, R-41416, R-41418, R-41428, R-41439, R-41441, R-41449, R-41453, R-41456, R-41460, R-41472, R-41485, R-41493, R-41539, R-41572, R-41582, R-41584
