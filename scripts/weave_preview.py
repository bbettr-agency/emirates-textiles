#!/usr/bin/env python3
"""Tune the woven texture and preview it tinted with real Emirates dye colours."""
from PIL import Image, ImageOps, ImageFilter, ImageDraw
import numpy as np
import os

PREV = "public/proc-preview"
os.makedirs(PREV, exist_ok=True)


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


W = weave()
W.convert("RGB").save(f"{PREV}/weave2.jpg", "JPEG", quality=90, optimize=True)

# real Emirates dye colours (client's featured 18-colour list, approx hex)
COLS = [
    ("PINK", (232, 194, 199)), ("MINT", (198, 224, 205)), ("LEMON", (240, 228, 170)),
    ("SUNLIGHT", (243, 210, 130)), ("LIGHT GREY", (196, 199, 201)), ("PEACH", (240, 205, 180)),
    ("WHITE", (244, 244, 240)), ("NATURAL", (222, 210, 188)), ("BLACK", (38, 38, 40)),
    ("ORANGE", (216, 120, 55)), ("CORAL", (224, 116, 104)), ("LIGHT OLIVE", (150, 150, 96)),
    ("GREEN", (60, 120, 78)), ("FATIGUE", (104, 104, 82)), ("DARK NAVY", (32, 40, 66)),
    ("PETROL", (44, 96, 110)), ("LIGHT NAVY", (72, 96, 140)), ("RED", (176, 44, 46)),
]


def tinted(color, size=240):
    tex = W.resize((size, size), Image.LANCZOS).convert("L")
    base = Image.new("RGB", (size, size), color)
    t = tex.convert("RGB")
    # multiply blend
    out = Image.fromarray((np.array(base, float) * np.array(t, float) / 255).astype("uint8"))
    # soft top sheen
    sheen = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(sheen)
    for y in range(size):
        d.line([(0, y), (size, y)], fill=int(46 * max(0, 1 - y / (size * 0.6))))
    out = Image.composite(Image.new("RGB", (size, size), (255, 255, 255)), out, sheen)
    return out


# grid of all 18
cell, pad = 200, 10
cols = 6
rows = (len(COLS) + cols - 1) // cols
grid = Image.new("RGB", (cols * (cell + pad) + pad, rows * (cell + pad) + pad), (247, 244, 239))
for i, (name, c) in enumerate(COLS):
    sw = tinted(c, cell)
    x = pad + (i % cols) * (cell + pad)
    y = pad + (i // cols) * (cell + pad)
    grid.paste(sw, (x, y))
grid.save(f"{PREV}/swatch-grid.jpg", "JPEG", quality=86, optimize=True)
print("swatch-grid.jpg", grid.size)

# one large "modal" swatch (petrol) to check texture at large scale
tinted((44, 96, 110), 640).save(f"{PREV}/swatch-large.jpg", "JPEG", quality=88)
print("swatch-large.jpg done")
