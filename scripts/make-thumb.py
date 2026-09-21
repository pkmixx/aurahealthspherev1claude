"""Create small, fast-loading images for cards and menus.

Writes:
  src/assets/thumbs/<id>.webp  480x320 (3:2)  — activity / area / category cards
  src/assets/mini/<id>.webp    96x96  (1:1)   — dropdown & menu thumbnails

Usage:
  python scripts/make-thumb.py <id> <file-or-url> [focus_x=0.5] [focus_y=0.5]
"""
import io, sys, pathlib, subprocess
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
THUMBS = ROOT / 'src' / 'assets' / 'thumbs'
MINI = ROOT / 'src' / 'assets' / 'mini'
THUMBS.mkdir(parents=True, exist_ok=True)
MINI.mkdir(parents=True, exist_ok=True)


def load(src: str) -> Image.Image:
    if src.startswith('http'):
        # curl is used because the Canva CDN rejects Python's HTTP client.
        data = subprocess.run(['curl', '-sL', '-m', '120', src], capture_output=True, check=True).stdout
    else:
        data = pathlib.Path(src).read_bytes()
    return Image.open(io.BytesIO(data)).convert('RGB')


def crop(im: Image.Image, ratio: float, fx: float, fy: float) -> Image.Image:
    W, H = im.size
    if W / H > ratio:
        nw = round(H * ratio)
        x = min(max(round(W * fx - nw / 2), 0), W - nw)
        return im.crop((x, 0, x + nw, H))
    nh = round(W / ratio)
    y = min(max(round(H * fy - nh / 2), 0), H - nh)
    return im.crop((0, y, W, y + nh))


def make(ident: str, src: str, fx: float = 0.5, fy: float = 0.5) -> None:
    im = load(src)
    crop(im, 3 / 2, fx, fy).resize((480, 320), Image.LANCZOS).save(THUMBS / f'{ident}.webp', quality=68, method=6)
    crop(im, 1, fx, fy).resize((96, 96), Image.LANCZOS).save(MINI / f'{ident}.webp', quality=70, method=6)
    t = (THUMBS / f'{ident}.webp').stat().st_size // 1024
    m = (MINI / f'{ident}.webp').stat().st_size // 1024
    print(f'{ident}: thumb {t}KB, mini {m}KB')


if __name__ == '__main__':
    make(sys.argv[1], sys.argv[2], *(float(a) for a in sys.argv[3:5]))
