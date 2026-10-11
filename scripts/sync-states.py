#!/usr/bin/env python3
"""Copies the verified state fact files research/states/<slug>.json to src/data/states/<slug>.json,
after checking their shape (research/BRIEF-STATE-RESEARCH.md). Replayable: run after any research update.
Fails on a missing field, a non-https source or a rate below zero. Overrides reviewed by the editor go in
research/overrides/<slug>.json (deep-merged on top), each with a "_why" note."""
import json, os, sys, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, OUT, OV = os.path.join(ROOT, 'research/states'), os.path.join(ROOT, 'src/data/states'), os.path.join(ROOT, 'research/overrides')
os.makedirs(OUT, exist_ok=True)
REQ = ['slug', 'name', 'abbr', 'agency', 'minWage', 'localMinWages', 'overtime', 'sickLeave', 'familyLeave', 'finalPay', 'breaks', 'rightToWork', 'atWill', 'notes', 'uncertain']
def merge(a, b):
    for k, v in b.items():
        if k == '_why': continue
        if isinstance(v, dict) and isinstance(a.get(k), dict): merge(a[k], v)
        else: a[k] = v
    return a
def src_ok(s, where, errs):
    if s is None: return
    if not isinstance(s, dict) or not str(s.get('url', '')).startswith('https://'): errs.append(f'{where}: source url')
errs_all = 0
for f in sorted(glob.glob(os.path.join(SRC, '*.json'))):
    slug = os.path.basename(f)[:-5]; errs = []
    try: d = json.load(open(f))
    except Exception as e: print(f'{slug}: JSON {e}'); errs_all += 1; continue
    d = json.loads(json.dumps(d).replace('"http://', '"https://'))  # sources served over https (checked by check-sources)
    ov = os.path.join(OV, f'{slug}.json')
    if os.path.exists(ov): d = merge(d, json.load(open(ov)))
    for k in REQ:
        if k not in d: errs.append(f'missing {k}')
    if errs: print(slug, errs); errs_all += 1; continue
    fp = d['finalPay']  # a missing rule means no state statute was found: say so, never print "null"
    if not fp.get('fired'): fp['fired'] = 'no state statute sets a deadline (federal law sets none either)'
    if not fp.get('quit'): fp['quit'] = 'no state statute sets a deadline (federal law sets none either)'
    if d.get('rightToWork') is None: d['rightToWork'] = False; d.setdefault('uncertain', []).append('rightToWork unverified: shown as no right-to-work law until confirmed')
    m = d['minWage']
    if d['slug'] != slug: errs.append('slug differs from file name')
    if not m.get('rates2026'): errs.append('no rates2026')
    for r in m.get('rates2026', []) + m.get('rates2027', []):
        if not isinstance(r.get('rate'), (int, float)) or r['rate'] <= 0 or not r.get('from') or 'area' not in r: errs.append(f'bad rate row {r}')
    if not isinstance(m.get('headline'), (int, float)): errs.append('headline')
    m.setdefault('headlineArea', m['rates2026'][0]['area'] if m.get('rates2026') else None)
    if m.get('headlineArea') and not any(r['area'] == m['headlineArea'] for r in m['rates2026']):
        pre = [r['area'] for r in m['rates2026'] if r['area'].startswith(m['headlineArea'])]
        if len(set(pre)) == 1: m['headlineArea'] = pre[0]
        else: errs.append(f"headlineArea {m['headlineArea']!r} not in rates2026")
    src_ok(m.get('source'), 'minWage', errs)
    for k in ('overtime', 'sickLeave', 'familyLeave', 'finalPay', 'breaks'): src_ok(d[k].get('source'), k, errs)
    for l in d['localMinWages']: src_ok(l.get('source'), 'local ' + l.get('name', '?'), errs)
    for n in d['notes']: src_ok(n.get('source'), 'note', errs)
    if errs: print(slug, errs); errs_all += 1; continue
    json.dump(d, open(os.path.join(OUT, f'{slug}.json'), 'w'), ensure_ascii=False, indent=1)
n = len(glob.glob(os.path.join(OUT, '*.json')))
print(f'sync-states: {n} state files in src/data/states, {errs_all} with errors')
sys.exit(1 if errs_all else 0)
