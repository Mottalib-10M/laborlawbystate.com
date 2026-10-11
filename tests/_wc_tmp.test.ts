import { writeFileSync } from 'node:fs'; const out: unknown[] = [];
import { PAGES } from '../src/lib/pages';
import { helpers } from '../src/lib/helpers';
const only = (process.env.PAGE_FILES ?? '').split(',').filter(Boolean);
const w = (s: string) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const h = helpers();
for (const p of PAGES.filter((x) => !only.length || only.includes(x.id))) {
  const b = p.body(h);
  out.push(p.id, '| title', p.title.length, '| desc', p.description.length, '| resume', w(p.resume), '| body', w(b.replace(/<table[\s\S]*?<\/table>/g, '')), '| faq', p.faqs.map((f) => w(f.a)).join(','));
  if (process.env.SHOW) out.push(p.title, '\n', p.description, '\n', p.resume, '\n', b.replace(/<table[\s\S]*?<\/table>/g, '[TABLE]').replace(/<!--mini[^>]*-->/g, '[MINI]').replace(/<[^>]+>/g, ''), '\n', p.faqs.map((f) => f.q + ' :: ' + f.a).join('\n'));
}
import { it } from 'vitest';
it('wc', () => { writeFileSync('/private/tmp/claude-501/-Users-mottalib/1c47d563-10d7-40de-a270-587b5ea41e8a/scratchpad/wc.txt', out.map(String).join('\n')); });
