<script lang="ts">
  import { groups, reports, originalGroups, exportRows, mergeDays, oldest, newest } from '#lib/kb/followup';
  import issues from '#lib/data/followup-issues.json';
</script>

<h2>Reconciled report counts</h2>
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
  It never reads the body. The timing reports remain in that original parser total; the reconciled split
  above removes them from the parser ticket so each ID is counted once.</p>

<h2>Read the exceptions before merging</h2>
{#each groups.filter((g) => g.key === 'timing') as g}
  <p>{g.count} reports need timing investigation. They are evidence of symptoms, not proof of a timezone,
    daylight-saving or scheduler defect, and not proof that all share one cause. Split this investigation
    further when timestamps or a reproduction establish distinct mechanisms.</p>
  {#each g.reports as r (r.id)}
    <h3>{r.id} · {r.tenant} · {r.channel}</h3>
    <blockquote>{r.body}</blockquote>
  {/each}
{/each}

<h2>Received is not merged</h2>
<p>The busiest merge day was {mergeDays[0].day}: {mergeDays[0].count} reports were merged then.
  This is desk activity, not evidence that the bugs began that day. Reports were already arriving on {oldest}.
  The last report in this export arrived on {newest}; the queue is not evidence of a completed fix.</p>

<h2>Report membership</h2>
<p>These disjoint ID lists make the ticket counts auditable. Recompute them when a new export arrives.</p>
{#each groups as g (g.key)}
  <details><summary>{g.label}: {g.count} report IDs</summary>
    <p>{g.reports.map((r) => r.id).join(', ')}</p>
  </details>
{/each}
