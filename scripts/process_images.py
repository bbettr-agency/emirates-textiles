#!/usr/bin/env python3
"""
Process real Emirates Textiles fabric photography into optimised web assets.
Source photos are the client's own fabric shots (public/fabrics/*.jpg).
Outputs go to public/proc-preview/ for visual QA, then final assets to public/img/.
"""
from PIL import Image, ImageOps, ImageEnhance
import os

SRC = "public/fabrics"
PREV = "public/proc-preview"
OUT = "public/img"
os.makedirs(PREV, exist_ok=True)
os.makedirs(OUT, exist_ok=True)


def load(name):
    im = Image.open(os.path.join(SRC, name))
    return ImageOps.exif_transpose(im).convert("RGB")


def crop_frac(im, l, t, r, b):
    """Crop by fractional box (0..1)."""
    W, H = im.size
    return im.crop((int(l * W), int(t * H), int(r * W), int(b * H)))


def save_jpg(im, path, w=None, q=82):
    if w and im.width > w:
        h = round(im.height * w / im.width)
        im = im.resize((w, h), Image.LANCZOS)
    im.save(path, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"  {path}  {im.size}  {os.path.getsize(path)//1024}KB")


# ---- HERO: microfresh folded-fabric stack, label cropped off ----
mf = load("microfresh-soft-touch.jpg")   # 1285 x 2560 portrait
print("microfresh:", mf.size)
# keep top ~68% (removes the teal label + wood at very bottom); trim tiny top sliver
hero = crop_frac(mf, 0.0, 0.02, 1.0, 0.70)
save_jpg(hero, f"{PREV}/hero-stack.jpg", w=1120, q=84)
# a wider landscape variant (upper region of the stack) for mobile / bands
hero_wide = crop_frac(mf, 0.0, 0.05, 1.0, 0.42)
save_jpg(hero_wide, f"{PREV}/hero-wide.jpg", w=1280, q=84)

# ---- WEAVE TILE: clean white plain-weave patch from Conlyn white swatch ----
cw = load("conlyn-weave.jpg")   # 1756 x 2381
print("conlyn:", cw.size)
# white swatch sits top-centre under the letterhead; avoid staples (very top) & edges
weave = crop_frac(cw, 0.28, 0.20, 0.62, 0.30)
weave_g = ImageOps.grayscale(weave)
weave_g = ImageOps.autocontrast(weave_g, cutoff=1)
weave_g = ImageEnhance.Contrast(weave_g).enhance(1.15)
save_jpg(weave_g.convert("RGB"), f"{PREV}/weave-white.jpg", w=800, q=88)

# ---- CATEGORY MACROS ----
# Towelling terry — grey terry swatch top-right of cotton-toweling card
ct = load("cotton-toweling.jpg")  # 1752 x 2461
print("toweling:", ct.size)
tow = crop_frac(ct, 0.62, 0.14, 0.95, 0.30)
save_jpg(tow, f"{PREV}/cat-towelling.jpg", w=800, q=84)
# also white terry (left column)
tow2 = crop_frac(ct, 0.06, 0.14, 0.34, 0.30)
save_jpg(tow2, f"{PREV}/cat-towelling-white.jpg", w=800, q=84)

# Denim twill — natural/white twill (top band) of bull-denim, shows diagonal weave
bd = load("bull-denim.jpg")   # 1389 x 1863
print("denim:", bd.size)
den = crop_frac(bd, 0.20, 0.15, 0.72, 0.27)
save_jpg(den, f"{PREV}/cat-denim.jpg", w=800, q=84)
den2 = crop_frac(bd, 0.20, 0.50, 0.72, 0.60)  # olive band
save_jpg(den2, f"{PREV}/cat-denim-olive.jpg", w=800, q=84)

# Damask jacquard — royal blue band of damask-tabling
dm = load("damask-tabling.jpg")  # 1920 x 2560
print("damask:", dm.size)
dam = crop_frac(dm, 0.22, 0.76, 0.74, 0.85)   # royal blue-ish lower band
save_jpg(dam, f"{PREV}/cat-damask.jpg", w=800, q=84)
dam2 = crop_frac(dm, 0.22, 0.20, 0.74, 0.28)  # french blue top band
save_jpg(dam2, f"{PREV}/cat-damask-blue.jpg", w=800, q=84)

# Plain weave colour — hunter green Conlyn band
wv = crop_frac(cw, 0.16, 0.44, 0.70, 0.52)
save_jpg(wv, f"{PREV}/cat-weave-green.jpg", w=800, q=84)

# Sheeting sateen — a clean fold from microfresh (white/stone region)
sh = crop_frac(mf, 0.0, 0.10, 1.0, 0.24)
save_jpg(sh, f"{PREV}/cat-sheeting.jpg", w=900, q=84)

print("done")
