#!/usr/bin/env python3
"""Generate a 1200x630 OpenGraph image from the real fabric band + brand overlay."""
from PIL import Image, ImageDraw, ImageFont, ImageOps
import os

OUT = "public/img/og.jpg"
W, H = 1200, 630

base = ImageOps.exif_transpose(Image.open("public/img/fabric-band.jpg")).convert("RGB")
# cover-crop to 1200x630
scale = max(W / base.width, H / base.height)
base = base.resize((round(base.width * scale), round(base.height * scale)), Image.LANCZOS)
left = (base.width - W) // 2
top = (base.height - H) // 2
img = base.crop((left, top, left + W, top + H))

# navy scrim (left-weighted) for legible text
scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(scrim)
for x in range(W):
    a = int(210 * max(0, 1 - x / (W * 0.72)))
    d.line([(x, 0), (x, H)], fill=(7, 23, 51, a))
img = Image.alpha_composite(img.convert("RGBA"), scrim).convert("RGB")

d = ImageDraw.Draw(img)


def font(path, size):
    return ImageFont.truetype(path, size)


serif = "/System/Library/Fonts/Supplemental/Georgia.ttf"
serif_b = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
sans = "/System/Library/Fonts/Supplemental/Arial.ttf"

# gold eyebrow
d.text((70, 150), "F A B R I C   &   T E X T I L E S   ·   E S T .   1 9 9 9",
       font=font(sans, 20), fill=(198, 154, 63))
# wordmark / headline
d.text((66, 200), "Emirates Textiles", font=font(serif_b, 78), fill=(255, 255, 255))
d.text((70, 300), "Fabric for every space.", font=font(serif, 52), fill=(233, 224, 210))
d.text((72, 400),
       "Quality fabrics & textiles, supplied across South Africa.",
       font=font(sans, 26), fill=(255, 255, 255))
# gold rule
d.rectangle([72, 470, 72 + 90, 474], fill=(198, 154, 63))

img.save(OUT, "JPEG", quality=86, optimize=True)
print(OUT, os.path.getsize(OUT) // 1024, "KB")
