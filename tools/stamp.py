"""Fingerprint the game's files so no cache (browser, CDN, WeChat's webview) can mix an old copy with a new one.

Rewrites index.html in place:
  - every <script src="x.js"> becomes x.js?v=<hash of that file>, so a changed file gets a new URL;
  - <meta name="lens-audio"> carries a hash of audio/ (the engine appends it to every audio request);
  - <meta name="lens-build"> carries a hash of the whole build; a running page compares it with the one
    online and moves to the new build when they differ.
Idempotent. Run it before every commit (the pre-commit hook does): python3 tools/stamp.py
"""
import hashlib
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
page = root / "index.html"
SCRIPT = re.compile(r'<script src="([^"?]+)(?:\?v=[0-9a-f]+)?"></script>')
META = re.compile(r'<meta name="lens-(?:build|audio)" content="[0-9a-f]*">\n')


def digest(*chunks):
    h = hashlib.sha256()
    for c in chunks:
        h.update(c)
    return h.hexdigest()[:10]


html = page.read_text(encoding="utf-8")
html = META.sub("", html)
html = SCRIPT.sub(lambda m: f'<script src="{m[1]}"></script>', html)   # back to the unstamped form
scripts = SCRIPT.findall(html)
audio = sorted(p for p in (root / "audio").iterdir() if p.is_file())
audio_v = digest(*(p.name.encode() + p.read_bytes() for p in audio))
build = digest(html.encode(), *((root / s).read_bytes() for s in scripts), audio_v.encode())

html = SCRIPT.sub(lambda m: f'<script src="{m[1]}?v={digest((root / m[1]).read_bytes())}"></script>', html)
html = html.replace('<meta charset="utf-8">\n',
                    f'<meta charset="utf-8">\n<meta name="lens-build" content="{build}">\n<meta name="lens-audio" content="{audio_v}">\n', 1)
page.write_text(html, encoding="utf-8")
print(f"build {build} · audio {audio_v} · {len(scripts)} scripts")
