<script lang="ts">
  import { groups, investigations, reports, originalGroups, exportRows, mergeDays, oldest, newest } from '#lib/kb/followup';
  import issues from '#lib/data/followup-issues.json';
  import update from '#lib/data/engineering-update.json';
</script>

<h2>Engineering outcome, reported after the export</h2>
<p><a href={update.source}>Course engineering update</a>, observed {update.observed}: <strong>{update.ticket}</strong>.</p>
<ul>
  <li>Parser: <strong>{update.parser.status}</strong> — {update.parser.reason}. GitHub closure: completed.</li>
  <li>Form hint: <strong>{update.hint.status}</strong> — {update.hint.reason}. GitHub closure: not planned.</li>
</ul>
<p>Closing an issue is not the same as fixing it. Retirement is not a date-hint correction.
  These are engineering's reported outcomes, not independently reproduced product tests.
  The exception reports below remain unverified; closing their supplementary tracking as not planned
  only consolidates evidence into this historical incident page, and does not claim those symptoms were fixed.</p>

<h2>Report counts in the exported desk view</h2>
<p>Snapshot: {oldest} to {newest}. {exportRows} exported rows reduce to <strong>{reports.length} unique reports</strong>
  by report ID; {exportRows - reports.length} repeated rows are not extra reports. All are filed under #4471.</p>
<table>
  <thead><tr><th>Problem</th><th>Unique reports</th><th>Tenants</th><th>Received</th><th>Ticket</th></tr></thead>
  <tbody>
    {#each groups as g (g.key)}
      <tr><td>{g.label}</td><td>{g.count}</td><td>{g.tenants}</td><td>{g.first} to {g.last}</td>
        <td><a href={issues[g.key]}>GitHub issue</a></td></tr>
    {/each}
  </tbody>
</table>
<p>The original component groups by tenant locale and channel/form only:
  {#each originalGroups as g, i}{i ? '; ' : ''}<strong>{g.cause}: {g.reports.length}</strong>{/each}.
  It never reads the body. The flagged reports remain in that parser total: desk-notes.json and CauseTable
  explicitly count them where filed and footnote them. The two tickets above preserve that counting rule.
  Do not add the overlapping investigation counts below to the cause totals.</p>

<h2>Read the exceptions before merging</h2>
{#each investigations as g}
  <h3>{g.label}</h3>
  <p>{g.count} reports within the parser total need investigation for this symptom.
    <a href={issues[g.key]}>Supplementary investigation ticket</a>.
    They are evidence of symptoms, not proof of a timezone,
    daylight-saving or scheduler defect. The premature-invite report has its own ticket, separate from date shifts.
    Split further when timestamps or a reproduction establish distinct mechanisms.</p>
  {#each g.reports as r (r.id)}
    <h3>{r.id} · {r.tenant} · {r.channel}</h3>
    <blockquote>{r.body}</blockquote>
  {/each}
{/each}

<h2>Received is not merged</h2>
<p>The busiest merge day was {mergeDays[0].day}: {mergeDays[0].count} reports were merged then.
  This is desk activity, not evidence that the bugs began that day. Reports were already arriving on {oldest}.
  The last report in this export arrived on {newest}; the queue itself is not evidence of a completed fix.
  The later engineering update above supplies the distinct recorded outcomes.</p>

<h2>Report membership</h2>
<p>These two disjoint cause-ID lists reproduce the exported desk view. Recompute them when a new export arrives.</p>
{#each groups as g (g.key)}
  <details><summary>{g.label}: {g.count} report IDs</summary>
    <p>{g.reports.map((r) => r.id).join(', ')}</p>
  </details>
{/each}
