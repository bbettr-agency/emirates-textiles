#!/usr/bin/env python3
"""Produce the final optimised asset set into public/img/ from real client photos."""
from PIL import Image, ImageOps, ImageFilter
import numpy as np
import os, shutil

SRC = "public/fabrics"
OUT = "public/img"
os.makedirs(OUT, exist_ok=True)


def load(name):
    return ImageOps.exif_transpose(Image.open(os.path.join(SRC, name))).convert("RGB")


def crop_frac(im, l, t, r, b):
    W, H = im.size
    return im.crop((int(l * W), int(t * H), int(r * W), int(b * H)))


def save(im, name, w=None, q=84):
    if w and im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    p = os.path.join(OUT, name)
    im.save(p, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"  {name}  {im.size}  {os.path.getsize(p)//1024}KB")


# ---- seamless woven texture (tuned) ----
def weave(N=1024, threads=46, light=0.62, hi=1.0, seed=7):
    rng = np.random.default_rng(seed)
    ax = (np.arange(N) / N) * threads
    U, V = np.meshgrid(ax, ax)
    iu, iv = np.floor(U).astype(int), np.floor(V).astype(int)
    fu, fv = U - iu, V - iv
    ridge = lambda f: np.sin(np.pi * f) ** 0.6
    warp, weft = ridge(fu), ridge(fv)
    top = ((iu + iv) % 2 == 0)
    val = np.where(top, warp - 0.42 * (1 - weft), weft - 0.42 * (1 - warp))
    val = (val - val.min()) / (val.max() - val.min())
    val = light + (hi - light) * val
    noise = rng.normal(0, 1, (N, N))
    noise = np.array(Image.fromarray((noise * 40 + 128).astype("uint8")).filter(
        ImageFilter.GaussianBlur(0.5)), dtype=float)
    val = np.clip(val + (noise - 128) / 128 * 0.025, 0, 1)
    return Image.fromarray((val * 255).astype("uint8"))


weave().convert("RGB").save(f"{OUT}/weave.jpg", "JPEG", quality=88, optimize=True)
print(f"  weave.jpg 1024  {os.path.getsize(f'{OUT}/weave.jpg')//1024}KB")

# ---- hero: folded fabric stack (portrait) + a wide crop ----
mf = load("microfresh-soft-touch.jpg")
save(crop_frac(mf, 0.0, 0.02, 1.0, 0.70), "hero-stack.jpg", w=1120, q=84)
save(crop_frac(mf, 0.0, 0.05, 1.0, 0.34), "fabric-band.jpg", w=1600, q=82)  # wide band for CTA/heritage

# ---- category macros (real fabric) ----
save(crop_frac(mf, 0.0, 0.11, 1.0, 0.30), "cat-sheeting.jpg", w=900)          # sateen folds
save(crop_frac(mf, 0.0, 0.40, 1.0, 0.60), "cat-curtaining.jpg", w=900)        # deeper coloured drapes
dm = load("damask-tabling.jpg")
save(crop_frac(dm, 0.24, 0.20, 0.72, 0.30), "cat-tabling.jpg", w=900)         # jacquard/damask
ct = load("cotton-toweling.jpg")
save(crop_frac(ct, 0.66, 0.19, 0.93, 0.35), "cat-towelling.jpg", w=760)       # terry
bd = load("bull-denim.jpg")
save(crop_frac(bd, 0.24, 0.475, 0.70, 0.55), "cat-upholstery.jpg", w=900)     # olive twill
cw = load("conlyn-weave.jpg")
save(crop_frac(cw, 0.18, 0.20, 0.70, 0.30), "cat-hospitality.jpg", w=900)     # white plain weave (clean)

print("done")
