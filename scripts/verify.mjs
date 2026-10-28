import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { runtime } from './render.mjs';

const { server } = await runtime();
try {
  const e = await server.ssrLoadModule('/src/lib/kb/followup.ts');
  const c = await server.ssrLoadModule('/src/lib/kb/causes.ts');
  const { tenantOf } = await server.ssrLoadModule('/src/lib/kb/locales.ts');
  const { DEDUPE_CASES } = await server.ssrLoadModule('/src/lib/kb/dedupe-cases.ts');
  const { deskRef } = await server.ssrLoadModule('/src/lib/kb/desk-ref.ts');
  assert.equal(e.exportRows, 427);
  assert.equal(e.reports.length, 412);
  const raw = JSON.parse(await fs.readFile(new URL('../src/lib/data/reports-4471.json', import.meta.url), 'utf8'));
  const seen = new Map();
  for (const r of raw) {
    if (seen.has(r.id)) assert.deepEqual(r, seen.get(r.id), `Conflicting duplicate: ${r.id}`);
    seen.set(r.id, r);
  }
  assert.deepEqual(Object.fromEntries(e.originalGroups.map((g) => [g.cause, g.reports.length])), { parser: 379, hint: 33 });
  assert.deepEqual(Object.fromEntries(e.groups.map((g) => [g.key, g.count])), { parser: 379, hint: 33 });
  assert.deepEqual(Object.fromEntries(e.investigations.map((g) => [g.key, g.count])), { timing: 4, premature: 1 });
  const parserIds = new Set(e.groups.find((g) => g.key === 'parser').reports.map((r) => r.id));
  assert(e.investigations.every((g) => g.reports.every((r) => parserIds.has(r.id))));
  const ids = e.groups.flatMap((g) => g.reports.map((r) => r.id));
  assert.equal(ids.length, new Set(ids).size);
  assert.equal(ids.length, e.reports.length);
  assert(e.groups.every((g) => g.reports.every((r) => r.mergedInto === 4471)));
  assert.deepEqual(DEDUPE_CASES.map(({ a, b }) => c.sameCause(a, tenantOf(a), b, tenantOf(b))), [true, false, false, true, false]);
  assert.equal(e.groups.find((g) => g.key === 'hint').tenants, 3);
  const html = await fs.readFile(new URL('../rendered/kb/incidents/4471-followup/index.html', import.meta.url), 'utf8');
  const page = await server.ssrLoadModule('/src/routes/kb/incidents/4471-followup/+page.svx');
  assert(page.metadata.signature.startsWith('v1.'));
  assert(html.includes(deskRef(page.metadata.signature)));
  assert(html.includes('<svg'));
  assert(!html.includes('<FollowupEvidence'));
  assert(!html.includes('href="undefined"'));
  assert(html.includes('379') && html.includes('33'));
  assert(html.includes('fix(dates): parse dd/mm for eu locales'));
  assert(html.includes('booking-v3 form retired'));
  assert(html.includes('GitHub closure: completed') && html.includes('GitHub closure: not planned'));
  const index = await fs.readFile(new URL('../rendered/kb/index.html', import.meta.url), 'utf8');
  assert(index.includes('/kb/incidents/4471-followup'));
  assert(index.includes('/kb/decisions/0002-dedupe-by-evidence'));
  const triage = await fs.readFile(new URL('../rendered/kb/triage/dedupe/index.html', import.meta.url), 'utf8');
  assert(triage.includes('Nobody has re-read this page'));
  console.log('PASS: row deduplication, both original causes, exception membership, disjoint totals, all five dedupe cases, tenant count, actual SSR chart and signature stamp.');
  console.log('Original classifier:', e.originalGroups.map((g) => [g.cause, g.reports.length]));
  console.log('Evidence split:', e.groups.map((g) => [g.key, g.count]));
  console.log('Largest merge day:', e.mergeDays[0]);
} finally { await server.close(); }
