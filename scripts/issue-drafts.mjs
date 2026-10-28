import fs from 'node:fs/promises';
import { runtime } from './render.mjs';

const { server } = await runtime();
try {
  const { groups, investigations } = await server.ssrLoadModule('/src/lib/kb/followup.ts');
  const update = JSON.parse(await fs.readFile(new URL('../src/lib/data/engineering-update.json', import.meta.url), 'utf8'));
  const base = 'https://github.com/tofucode-dev/mega-s01e03-what-it-shows/blob/main/';
  const descriptions = {
    parser: `## Mechanism and impact

The shared parser reads month first, while these tenants write day first. Bookings/invites/reminders land on swapped month/day dates. R-41203: "Booked for 2 December. The invite says 12 February." Reading day-first 02/12/2026 as MM/DD produces 12 February rather than 2 December. This mechanism is documented by exported code; no running-product reproduction or shipped fix has been verified.

## Scope and proposed fix

Resolve tenant locale from the tenant directory, not browser locale or intake tag. This ticket covers the shared parser cause as counted by the exported desk view. Five reports have contradictory symptoms and are footnoted, but remain counted where filed; this is a report count, not proof of 379 identical failures. Make the explicit date contract agree with tenant date order. Test app, email and booking-v2, ambiguous dates, days above twelve, invalid dates and leap days. Preserve date-only semantics.

## Acceptance

The intended date survives input, storage, invite generation and display across affected tenant locales, with regression tests. Do not close merely because a fix is queued.`,
    hint: `## Mechanism and impact

booking-v3 prints MM/DD/YYYY under the date field, but the form reads dates in the day-first tenant's order. Following that hint can swap month and day. R-41241 is an alder.physio form report (de-DE, booking-v3) with browserLocale en-US; use tenant/form context rather than browser or intake. No running-product reproduction or shipped fix has been verified.

## Scope and proposed fix

Only form-channel reports from day-first tenants running booking-v3: alder.physio, copper.studio and pale.harbour. This ticket covers only the misleading date-format hint and the listed IDs. Align the hint, validation, date interpretation and saved value with the tenant contract.

## Acceptance

A user following the displayed hint gets the intended date. Regression tests distinguish booking-v2/v3 and app/email/form, including browsers whose locale differs from the tenant. Verify this form behavior independently of other tickets.`,
    timing: `## Observed problem: one-day date shifts

The listed reports describe a one-day offset or differing days between Lisbon and Toronto. The exact mechanism is unconfirmed. This ticket covers only one-day shifts, not other reported symptoms. Split further if evidence establishes distinct mechanisms.

## Evidence

${investigations.find((g) => g.key === 'timing').reports.map((r) => `- **${r.id}**, ${r.tenant}, ${r.channel}, received ${r.receivedAt}:\n  > ${r.body}`).join('\n\n')}

## Investigation and acceptance

Collect original input and intended local date, tenant/client timezones, UTC payload and invite/reminder timestamps for each ID. Compare Lisbon/Toronto displays of the same event and check DST boundaries; neither timezone nor DST is proven. Link reproductions and confirmed mechanisms before assigning a fix or closing.`,
    premature: `## Observed problem: invite reportedly arrived before its booking

R-41236, nine.lanterns, app, received 2026-04-20T11:52:00+02:00:

> The invite arrived before I made the booking. I would like to know how.

This ticket covers only the reported event-ordering problem and only R-41236. No scheduler defect, clock defect or other root cause is proven.

## Investigation and acceptance

Collect booking creation and invite generation/delivery timestamps, booking identity, audit logs and correlation IDs. Check event ordering, retries and which booking the invite references. Establish whether the claimed ordering is real before assigning a fix. Reproduce any established ordering failure and verify it is resolved before closing.`,
  };
  await fs.mkdir(new URL('../evidence/issues/', import.meta.url), { recursive: true });
  for (const g of [...groups, ...investigations]) {
    const body = `# #4471 follow-up: ${g.label}

**Report count: ${g.count} unique reports** in the 2026-10-04 export; received ${g.first} to ${g.last}, across ${g.tenants} tenants. This is a snapshot, not a live count.

${g.key === 'timing' || g.key === 'premature' ? 'Supplementary symptom investigation: these IDs remain counted in issue #2 under the exported desk view. Do not add this count to the two cause-ticket totals.' : 'Count follows the exported CauseTable: unique report IDs, tenant locale and booking-form/channel context. Desk-note flags are footnotes, not count reassignments.'}

${descriptions[g.key]}

## Latest recorded outcome

${update[g.key] ? `The [course engineering update](${update.source}), observed ${update.observed}, reports ${update.ticket}: **${update[g.key].status}** — ${update[g.key].reason}. Close this ticket as **${update[g.key].githubReason}**. This is engineering's report, not an independently run product test.` : 'Close supplementary tracking as **not planned**, consolidating the original evidence into the signed KB follow-up. No independent cause or verified fix was established for these symptoms; closure does not mean they were fixed.'}

## Counting method and sources

Count each listed report ID once, ignoring overlapping export rows. These are report counts, not distinct people or confirmed failures. This issue covers one problem only; the KB page holds the complete reconciliation across tickets.

- [Raw reports](${base}src/lib/data/reports-4471.json)
- [Tenant directory](${base}src/lib/data/tenants)
- [Original classification logic](${base}src/lib/kb/causes.ts)
- [Desk notes](${base}src/lib/data/desk-notes.json)
- [Reconciled logic](${base}src/lib/kb/followup.ts)
- [Membership and merge dates](${base}evidence/report-membership.json)
- [Signed KB follow-up](${base}src/routes/kb/incidents/4471-followup/+page.svx)
- [Actual rendered page](${base}rendered/kb/incidents/4471-followup/index.html)

## Report IDs (${g.count})

${g.reports.map((r) => r.id).join(', ')}
`;
    await fs.writeFile(new URL(`../evidence/issues/${g.key}.md`, import.meta.url), body);
    console.log(`${g.key}: ${g.count}`);
  }
} finally { await server.close(); }
