import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { compile as markdown } from 'mdsvex';
import { compile } from 'svelte/compiler';

export const root = fileURLToPath(new URL('../', import.meta.url));
export async function runtime() {
  const styles = new Map();
  const server = await createServer({
    root, configFile: false, logLevel: 'warn',
    resolve: { alias: { '#lib': path.join(root, 'src/lib') }, conditions: ['node'] },
    server: { middlewareMode: true }, appType: 'custom',
    plugins: [{
      name: 'export-svelte-ssr', enforce: 'pre',
      async transform(source, id) {
        if (!/\.(svelte|svx)$/.test(id)) return;
        let code = source;
        if (id.endsWith('.svx')) {
          code = (await markdown(source, { filename: id, layout: {
            runbook: path.join(root, 'src/lib/layouts/runbook.svelte').replaceAll('\\', '/'),
          } })).code;
        }
        const output = compile(code, { filename: id, generate: 'server', css: 'external' });
        if (output.css?.code) styles.set(id, output.css.code);
        return { code: output.js.code, map: output.js.map };
      },
    }],
  });
  return { server, styles };
}

export async function build() {
  const { server, styles } = await runtime();
  try {
    const { render } = await server.ssrLoadModule('svelte/server');
    const files = await fs.readdir(path.join(root, 'src/routes/kb'), { recursive: true });
    const pages = [];
    for (const file of files.filter((f) => f.endsWith('+page.svx')).sort()) {
      const route = '/kb/' + file.replaceAll('\\', '/').replace('+page.svx', '');
      const mod = await server.ssrLoadModule('/src/routes' + route + '+page.svx');
      const result = render(mod.default);
      pages.push({ route, result });
    }
    const css = [...styles.values()].join('\n');
    for (const { route, result } of pages) {
      const out = path.join(root, 'rendered', route, 'index.html');
      await fs.mkdir(path.dirname(out), { recursive: true });
      const html = '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        + '<meta name="viewport" content="width=device-width,initial-scale=1">'
        + result.head + '<style>' + css + '</style></head><body>' + result.body + '</body></html>';
      await fs.writeFile(out, html);
      console.log('Rendered ' + route);
    }
    const evidence = await server.ssrLoadModule('/src/lib/kb/followup.ts');
    await fs.mkdir(path.join(root, 'evidence'), { recursive: true });
    await fs.writeFile(path.join(root, 'evidence/report-membership.json'), JSON.stringify({
      source: 'support-kb export 2026-10-04; reports-4471.json + tenants + desk-notes',
      rows: evidence.exportRows, unique: evidence.reports.length,
      originalGroups: evidence.originalGroups.map((g) => ({ cause: g.cause, count: g.reports.length, tags: g.taggedAs })),
      problems: evidence.groups.map((g) => ({ ...g, reports: g.reports.map((r) => r.id) })),
      overlappingInvestigations: evidence.investigations.map((g) => ({ ...g, reports: g.reports.map((r) => r.id) })),
      mergeDays: evidence.mergeDays,
    }, null, 2) + '\n');
  } finally { await server.close(); }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
