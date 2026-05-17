from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

W, H = 1280, 853
base = Path(__file__).resolve().parents[1]
out = base / 'assets' / 'reset-brand-card.webp'
logo_path = base / 'assets' / 'reset-logo.png'

img = Image.new('RGB', (W, H), '#111315')
d = ImageDraw.Draw(img)

for y in range(H):
    t = y / (H - 1)
    r = int(20 * (1 - t) + 48 * t)
    g = int(22 * (1 - t) + 50 * t)
    b = int(24 * (1 - t) + 52 * t)
    d.line([(0, y), (W, y)], fill=(r, g, b))

for x in range(-W, W * 2, 18):
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.line([(x, 0), (x + 520, H)], fill=(255, 255, 255, 16 if (x // 18) % 2 == 0 else 7), width=3)
    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')

stripe = Image.new('RGBA', (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(stripe)
sd.polygon([(0, 0), (150, 0), (0, H)], fill=(168, 18, 28, 210))
sd.polygon([(1120, 0), (W, 0), (W, H), (1190, H)], fill=(168, 18, 28, 180))
img = Image.alpha_composite(img.convert('RGBA'), stripe).convert('RGBA')

def font(size):
    for path in [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf',
    ]:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()

F_mid = font(46)
F_phone = font(86)
F_small = font(38)
F_tiny = font(30)

if logo_path.exists():
    logo = Image.open(logo_path).convert('RGBA')
    ratio = 540 / logo.width
    logo = logo.resize((540, int(logo.height * ratio)), Image.LANCZOS)
    img.alpha_composite(logo, ((W - logo.width) // 2, 80))

panel = Image.new('RGBA', (1040, 430), (0, 0, 0, 0))
pd = ImageDraw.Draw(panel)
pd.rounded_rectangle((0, 0, 1040, 430), radius=38, fill=(245, 247, 248, 238), outline=(255, 255, 255, 180), width=3)
img.alpha_composite(panel, (120, 300))

d = ImageDraw.Draw(img)
d.text((W // 2, 345), 'CALL OR TEXT FOR A RESET QUOTE', font=F_mid, anchor='ma', fill='#1b1d1f')
d.text((W // 2, 455), '(972) 460-6167', font=F_phone, anchor='ma', fill='#a5121d')
d.text((W // 2, 560), 'Garage and Space Resets • Ellis County', font=F_small, anchor='ma', fill='#2f3234')
d.text((W // 2, 625), '@RESETGARAGECLEANOUTS', font=F_tiny, anchor='ma', fill='#4a4e50')
d.text((W // 2, H - 56), 'Sort what matters • Organize what stays • Remove what needs to go', font=F_tiny, anchor='ma', fill=(245, 247, 248, 230))

img.convert('RGB').save(out, 'WEBP', quality=92, method=6)
print(f'wrote {out} {Image.open(out).size}')
