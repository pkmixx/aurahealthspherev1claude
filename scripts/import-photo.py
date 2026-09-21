"""Import a photo (URL or local file) into the site.

Crops to 3:2 (focus point adjustable), and writes
src/assets/photos/<name>-640.webp and <name>-1200.webp, which are picked up
automatically by src/config/images.ts.

Usage:
  python scripts/import-photo.py <name> <url-or-path> [focus_x=0.5] [focus_y=0.5]
"""
import io, sys, pathlib, urllib.request
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
DEST = ROOT / 'src' / 'assets' / 'photos'
DEST.mkdir(parents=True, exist_ok=True)

name, src = sys.argv[1], sys.argv[2]
fx = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5
fy = float(sys.argv[4]) if len(sys.argv) > 4 else 0.5

data = urllib.request.urlopen(urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0'}), timeout=120).read() if src.startswith('http') else open(src, 'rb').read()
im = Image.open(io.BytesIO(data)).convert('RGB')
W, H = im.size
target = 3 / 2
if W / H > target:  # too wide → crop width
    nw = round(H * target)
    x = min(max(round(W * fx - nw / 2), 0), W - nw)
    im = im.crop((x, 0, x + nw, H))
else:  # too tall → crop height
    nh = round(W / target)
    y = min(max(round(H * fy - nh / 2), 0), H - nh)
    im = im.crop((0, y, W, y + nh))
for w in (640, 1200):
    im.resize((w, round(w / target)), Image.LANCZOS).save(DEST / f'{name}-{w}.webp', quality=80, method=6)
print(f'{name}: {W}x{H} -> {im.size}, saved 640/1200 webp')
