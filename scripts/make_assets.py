#!/usr/bin/env python3
"""
2nd pass: synthesise a seamless woven-cloth texture (crisp at any size, powers the
swatch experience) and produce tighter category macro crops from the real cards.
"""
from PIL import Image, ImageOps, ImageEnhance, ImageFilter
import numpy as np
import os

SRC = "public/fabrics"
PREV = "public/proc-preview"
os.makedirs(PREV, exist_ok=True)


def load(name):
    im = Image.open(os.path.join(SRC, name))
    return ImageOps.exif_transpose(im).convert("RGB")


def crop_frac(im, l, t, r, b):
    W, H = im.size
    return im.crop((int(l * W), int(t * H), int(r * W), int(b * H)))


def save_jpg(im, path, w=None, q=84):
    if w and im.width > w:
        h = round(im.height * w / im.width)
        im = im.resize((w, h), Image.LANCZOS)
    im.save(path, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"  {path}  {im.size}  {os.path.getsize(path)//1024}KB")


# ---------- SEAMLESS WOVEN TEXTURE ----------
def weave(N=1024, threads=72, light=0.74, hi=1.0, seed=7):
    rng = np.random.default_rng(seed)
    ax = (np.arange(N) / N) * threads          # 0..threads across
    U, V = np.meshgrid(ax, ax)
    iu, iv = np.floor(U).astype(int), np.floor(V).astype(int)
    fu, fv = U - iu, V - iv
    # rounded thread ridge: bright centre, dark at the gap between threads
    ridge = lambda f: np.sin(np.pi * f) ** 0.65
    warp, weft = ridge(fu), ridge(fv)
    top_warp = ((iu + iv) % 2 == 0)            # plain weave interlace (seamless: threads even)
    val = np.where(top_warp,
                   warp - 0.28 * (1 - weft),
                   weft - 0.28 * (1 - warp))
    val = (val - val.min()) / (val.max() - val.min())        # 0..1
    val = light + (hi - light) * val                          # compress to light band
    # fine slub/fibre noise for a natural, non-digital surface
    noise = rng.normal(0, 1, (N, N))
    noise = np.array(Image.fromarray((noise * 40 + 128).astype("uint8")).filter(
        ImageFilter.GaussianBlur(0.6)), dtype=float)
    noise = (noise - 128) / 128
    val = np.clip(val + noise * 0.02, 0, 1)
    img = Image.fromarray((val * 255).astype("uint8"), "L")
    return img


w = weave()
w.convert("RGB").save(f"{PREV}/weave.jpg", "JPEG", quality=90, optimize=True)
print(f"  weave.jpg {w.size} {os.path.getsize(f'{PREV}/weave.jpg')//1024}KB")
# tile-check: paste 2x2 to confirm seamlessness
tile = Image.new("L", (w.width * 2, w.height * 2))
for x in (0, w.width):
    for y in (0, w.height):
        tile.paste(w, (x, y))
save_jpg(tile.convert("RGB"), f"{PREV}/weave-tile2x2.jpg", w=900, q=84)

# ---------- REFINED CATEGORY MACROS ----------
ct = load("cotton-toweling.jpg")
save_jpg(crop_frac(ct, 0.67, 0.20, 0.92, 0.34), f"{PREV}/m-towelling.jpg", w=760)

bd = load("bull-denim.jpg")
save_jpg(crop_frac(bd, 0.26, 0.20, 0.66, 0.26), f"{PREV}/m-denim.jpg", w=760)   # natural twill, below staples

dm = load("damask-tabling.jpg")
save_jpg(crop_frac(dm, 0.26, 0.205, 0.70, 0.255), f"{PREV}/m-damask.jpg", w=760)  # french blue jacquard

cw = load("conlyn-weave.jpg")
save_jpg(crop_frac(cw, 0.20, 0.455, 0.66, 0.50), f"{PREV}/m-weave-green.jpg", w=760)  # hunter green plain weave
save_jpg(crop_frac(cw, 0.20, 0.545, 0.66, 0.59), f"{PREV}/m-weave-navy.jpg", w=760)   # navy blue plain weave

mf = load("microfresh-soft-touch.jpg")
save_jpg(crop_frac(mf, 0.0, 0.12, 1.0, 0.26), f"{PREV}/m-sheeting.jpg", w=820)
print("done")
