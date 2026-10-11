import { appendFileSync } from 'node:fs';
import { it } from 'vitest';
import { PAGES } from '/Users/mottalib/Documents/GitHub/a-publier/Mottalib-10M/us-labor-law/src/lib/pages';
import { helpers } from '/Users/mottalib/Documents/GitHub/a-publier/Mottalib-10M/us-labor-law/src/lib/helpers';
const words = (s: string) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
it('wc', () => {
  const only = (process.env.PAGE_FILES ?? '').split(',').filter(Boolean);
  for (const p of PAGES.filter((x) => !only.length || only.includes(x.id))) {
    const b = p.body(helpers());
    appendFileSync('/private/tmp/claude-501/-Users-mottalib/1c47d563-10d7-40de-a270-587b5ea41e8a/scratchpad/wc.out', [p.id, 'title', p.title.length, 'desc', p.description.length, 'resume', words(p.resume), 'body', words(b.replace(/<table[\s\S]*?<\/table>/g, '')), 'faqs', p.faqs.map((f) => words(f.a)).join(',')].join(' ') + '\n');
  }
});
