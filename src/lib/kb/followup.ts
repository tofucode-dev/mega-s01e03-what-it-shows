import raw from '#lib/data/reports-4471.json';
import notes from '#lib/data/desk-notes.json';
import { causeOf, groupByCause, uniqueById, type Report } from '#lib/kb/causes';
import { tenantOf } from '#lib/kb/locales';

export const reports = uniqueById(raw as Report[]).filter((r) => r.mergedInto === 4471);
export const originalGroups = groupByCause(reports, tenantOf);
export const timingIds = new Set(notes.oneDayMove);
export const labels = {
  parser: 'Shared parser ignores day-first tenant dates',
  hint: 'booking-v3 date hint contradicts tenant parsing',
  timing: 'One-day date shifts: timing investigation',
  premature: 'Invite reportedly arrives before booking creation',
  unplaced: 'Unplaced: manual investigation required',
};
export type Problem = keyof typeof labels;

// Notes flag the exception set; the bodies, not the intake tags, justify investigation.
// A premature invite is not evidence of a one-day shift: track it separately.
export function problemOf(r: Report): Problem {
  if (r.id === 'R-41236') return 'premature';
  if (timingIds.has(r.id)) return 'timing';
  return causeOf(r, tenantOf(r)) ?? 'unplaced';
}

export const groups = (Object.keys(labels) as Problem[]).map((key) => {
  const members = reports.filter((r) => problemOf(r) === key);
  const days = members.map((r) => r.receivedAt.slice(0, 10)).sort();
  return {
    key, label: labels[key], reports: members, count: members.length,
    tenants: new Set(members.map((r) => r.tenant)).size,
    first: days[0], last: days.at(-1),
  };
}).filter((g) => g.count);

export const mergeDays = [...Map.groupBy(reports, (r) => r.mergedAt?.slice(0, 10) ?? 'missing')]
  .map(([day, rs]) => ({ day, count: rs.length }))
  .sort((a, b) => b.count - a.count);
export const oldest = reports.map((r) => r.receivedAt.slice(0, 10)).sort()[0];
export const newest = reports.map((r) => r.receivedAt.slice(0, 10)).sort().at(-1);
export const exportRows = raw.length;
