#!/usr/bin/env python3
"""
Art-direction rework asset set. Reads the client's real fabric photos from the
scratch /raw dir, produces consistently-cropped, optimised images into public/img,
and a contact sheet for QA.
"""
from PIL import Image, ImageOps
import os

RAW = "/private/tmp/claude-501/-Users-eloff-Documents-Bbettr-Website-Os/fe225015-75d8-4792-8bfd-22d75941248a/scratchpad/raw"
OUT = "public/img"
os.makedirs(OUT, exist_ok=True)


def load(name):
    return ImageOps.exif_transpose(Image.open(os.path.join(RAW, name))).convert("RGB")


def crop_frac(im, l, t, r, b):
    W, H = im.size
    return im.crop((int(l * W), int(t * H), int(r * W), int(b * H)))


def to_ratio(im, ratio):  # center-crop to width/height ratio
    W, H = im.size
    if W / H > ratio:  # too wide
        nw = int(H * ratio)
        x = (W - nw) // 2
        return im.crop((x, 0, x + nw, H))
    nh = int(W / ratio)
    y = (H - nh) // 2
    return im.crop((0, y, W, y + nh))


def save(im, name, w, ratio=None, q=84):
    if ratio:
        im = to_ratio(im, ratio)
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    p = os.path.join(OUT, name)
    im.save(p, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"  {name}  {im.size}  {os.path.getsize(p)//1024}KB")
    return p


P45, L32, L169, L43, SQ = 4 / 5, 3 / 2, 16 / 9, 4 / 3, 1 / 1

mf = load("microfresh.jpg")
dm = load("damask.jpg")
tw = load("toweling.jpg")
dn = load("denim.jpg")
cw = load("conlyn.jpg")
sg = load("sateen-grey.jpg")
pl = load("paisley.jpg")

# ---- FABRIC EXPLORER — portrait 4:5, 1000w ----
save(crop_frac(mf, 0.0, 0.03, 1.0, 0.52), "ex-sheeting.jpg", 1000, P45)
save(crop_frac(dm, 0.16, 0.16, 0.68, 0.52), "ex-tabling.jpg", 1000, P45)   # jacquard, no card labels
save(crop_frac(tw, 0.69, 0.14, 0.97, 0.57), "ex-towelling.jpg", 1000, P45) # grey→sky terry, label-free
save(crop_frac(dn, 0.22, 0.40, 0.76, 0.78), "ex-upholstery.jpg", 1000, P45)# olive/chocolate twill
save(crop_frac(mf, 0.0, 0.40, 1.0, 0.66), "ex-curtaining.jpg", 1000, P45)  # deeper coloured drapes
save(crop_frac(cw, 0.15, 0.16, 0.72, 0.44), "ex-hospitality.jpg", 1000, P45) # crisp white weave

# ---- APPLICATIONS lookbook — landscape 3:2, 1400w (varied fabrics) ----
save(crop_frac(mf, 0.0, 0.05, 1.0, 0.34), "app-hospitality.jpg", 1400, L32)   # muted fold stack
save(crop_frac(dm, 0.14, 0.30, 0.68, 0.60), "app-interiors.jpg", 1400, L32)   # jacquard, no card labels
save(crop_frac(mf, 0.0, 0.42, 1.0, 0.66), "app-curtaining.jpg", 1400, L32)    # coloured drape folds
save(crop_frac(cw, 0.14, 0.17, 0.86, 0.35), "app-bedding.jpg", 1400, L32)     # crisp white/ecru weave
save(crop_frac(dn, 0.20, 0.15, 0.78, 0.62), "app-manufacturing.jpg", 1400, L32) # twill

# ---- SIGNATURE moment — wide 16:9, 1800w (rich damask) ----
save(crop_frac(dm, 0.06, 0.30, 0.70, 0.76), "sig-fabric.jpg", 1800, L169)

# ---- HERO macro (square overlap texture — damask jacquard weave) ----
save(crop_frac(dm, 0.35, 0.40, 0.75, 0.74), "hero-macro.jpg", 700, SQ)

# ---- SIMON BAKER — real branded lifestyle bed, overlays cropped out ----
save(crop_frac(sg, 0.0, 0.28, 0.82, 0.99), "sb.jpg", 1500, L32)

# ---- HERITAGE — portrait reuse of the fold stack, distinct crop ----
save(crop_frac(mf, 0.0, 0.20, 1.0, 0.60), "heritage.jpg", 1000, P45)

print("\ncontact sheet…")
names = ["ex-sheeting", "ex-tabling", "ex-towelling", "ex-upholstery", "ex-curtaining",
         "ex-hospitality", "app-hospitality", "app-interiors", "app-curtaining",
         "app-bedding", "app-manufacturing", "sig-fabric", "sb.jpg", "heritage", "hero-macro"]
cell = 300
cols = 5
imgs = []
for n in names:
    fn = n if n.endswith(".jpg") else n + ".jpg"
    im = Image.open(os.path.join(OUT, fn))
    im = to_ratio(im, 1).resize((cell, cell), Image.LANCZOS)
    imgs.append((fn, im))
rows = (len(imgs) + cols - 1) // cols
sheet = Image.new("RGB", (cols * cell, rows * cell), (240, 236, 230))
for i, (fn, im) in enumerate(imgs):
    sheet.paste(im, ((i % cols) * cell, (i // cols) * cell))
sheet.resize((cols * 200, rows * 200), Image.LANCZOS).save(
    "/private/tmp/claude-501/-Users-eloff-Documents-Bbettr-Website-Os/fe225015-75d8-4792-8bfd-22d75941248a/scratchpad/contact.jpg",
    "JPEG", quality=82)
print("contact sheet at scratchpad/contact.jpg")
