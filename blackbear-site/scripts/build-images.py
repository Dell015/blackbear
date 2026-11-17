"""Resize + compress source assets into public/img and write lib/images.json.
Run: python3 scripts/build-images.py <path-to-Assets-folder>"""
import sys, os, json
from PIL import Image
SRC = sys.argv[1]
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'img')
FOLDERS = ['02-menu-boards/food-posters', '01-brand', '03-products', '04-campaigns', '05-places', '06-people']
WIDTHS = [480, 960, 1600]
manifest = {}
os.makedirs(OUT, exist_ok=True)
for folder in FOLDERS:
    for root, _, files in os.walk(os.path.join(SRC, folder)):
        for f in sorted(files):
            if not f.lower().endswith(('.jpg', '.jpeg', '.png')): continue
            slug = os.path.splitext(f)[0]
            im = Image.open(os.path.join(root, f)).convert('RGB')
            w, h = im.size
            small = im.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
            srcs = {}
            for tw in WIDTHS:
                if tw > w and srcs: break
                tw2 = min(tw, w)
                r = im.resize((tw2, round(h * tw2 / w)), Image.LANCZOS)
                name = f'{slug}-{tw2}.webp'
                r.save(os.path.join(OUT, name), 'WEBP', quality=78, method=6)
                srcs[tw2] = f'/img/{name}'
            manifest[slug] = {'w': w, 'h': h, 'color': '#%02x%02x%02x' % small,
                              'group': os.path.relpath(root, SRC).replace(os.sep, '/'), 'srcs': srcs}
json.dump(manifest, open(os.path.join(os.path.dirname(__file__), '..', 'lib', 'images.json'), 'w'), indent=1)
print(len(manifest), 'images')
