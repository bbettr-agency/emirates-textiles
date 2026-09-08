#!/usr/bin/env python3
"""
Make the Emirates logo background transparent by flood-filling the OUTER white
region from the border only — so the white "TEXTILES" letters enclosed in the gold
band stay intact. Antialiased edge pixels get proportional alpha for a clean cut.
"""
from PIL import Image
from collections import deque

im = Image.open("public/img/logo.png").convert("RGBA")
W, H = im.size
px = im.load()

def whiteness(p):
    r, g, b, _ = p
    return min(r, g, b)  # high for white/near-white

TH = 222
bg = [[False] * H for _ in range(W)]
q = deque()
for x in range(W):
    for y in (0, H - 1):
        if whiteness(px[x, y]) >= TH and not bg[x][y]:
            bg[x][y] = True; q.append((x, y))
for y in range(H):
    for x in (0, W - 1):
        if whiteness(px[x, y]) >= TH and not bg[x][y]:
            bg[x][y] = True; q.append((x, y))

while q:
    x, y = q.popleft()
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nx, ny = x + dx, y + dy
        if 0 <= nx < W and 0 <= ny < H and not bg[nx][ny] and whiteness(px[nx, ny]) >= TH:
            bg[nx][ny] = True; q.append((nx, ny))

cleared = 0
for x in range(W):
    for y in range(H):
        if bg[x][y]:
            r, g, b, _ = px[x, y]
            # feather: the whiter the pixel, the more transparent (kills light halo)
            w = min(r, g, b)
            a = 0 if w >= 250 else max(0, int((250 - w) * 3))
            px[x, y] = (r, g, b, min(a, 255))
            cleared += 1

im.save("public/img/logo.png")
ex = im.getchannel("A").getextrema()
print(f"cleared {cleared} bg px · alpha extrema {ex} · corner {im.getpixel((0,0))}")
