"""Build web media from research/raw: hero + band videos (Pexels, licensed) and project stills
from the client's Instagram reels / posts. Usage: python -I scripts/build_media.py <project-root> [stills|video|all]

Reel stills are cropped above the burned-in subtitles (they sit at ~62-75 % of the frame height).
"""
import os, subprocess, sys
import imageio_ffmpeg
from PIL import Image, ImageEnhance

FF = imageio_ffmpeg.get_ffmpeg_exe()
root = sys.argv[1]
what = sys.argv[2] if len(sys.argv) > 2 else 'all'
R = os.path.join(root, 'research/raw')
OUT_IMG = os.path.join(root, 'public/images')
OUT_VID = os.path.join(root, 'public/video')
TMP = os.path.join(R, 'tmp')
for d in (OUT_IMG, OUT_VID, TMP):
    os.makedirs(d, exist_ok=True)


def run(*a):
    r = subprocess.run([FF, '-y', '-loglevel', 'error', *a], capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-800:]); raise SystemExit(1)


# (output path under public/images, source, time s or None for a still, crop box as fractions x0,y0,x1,y1)
TOP = (0, 0.0, 1, 0.6)
STILLS = [
    # Прилиманське, 15 кВт гібрид, 2 електромобілі
    ('objects/prylymanske/01', 'video/DaAQackAoB3.mp4', 31, (0, 0.04, 1, 0.6)),
    ('objects/prylymanske/02', 'video/DaAQackAoB3.mp4', 22, TOP),
    ('objects/prylymanske/03', 'video/DaAQackAoB3.mp4', 46, (0, 0.05, 1, 0.62)),
    ('objects/prylymanske/04', 'video/DaAQackAoB3.mp4', 55, (0, 0.1, 1, 0.62)),
    ('objects/prylymanske/05', 'video/DaAQackAoB3.mp4', 34, TOP),
    # Санжійка, 12 кВт гібрид, зелений тариф, $9 500
    ('objects/sanzhiika/01', 'video/DYWwA7lA2Fm.mp4', 16, (0, 0.12, 1, 0.62)),
    ('objects/sanzhiika/02', 'video/DYWwA7lA2Fm.mp4', 22, (0, 0.04, 1, 0.6)),
    ('objects/sanzhiika/03', 'video/DYWwA7lA2Fm.mp4', 40, (0, 0.04, 1, 0.6)),
    ('objects/sanzhiika/04', 'video/DYWwA7lA2Fm.mp4', 85, (0, 0.04, 1, 0.6)),
    # Одеса, 15 кВт + EV, $15 000
    ('objects/odesa-15/01', 'video/DacJQZdsE2b.mp4', 4, (0, 0.0, 1, 0.58)),
    ('objects/odesa-15/02', 'video/DacJQZdsE2b.mp4', 13, (0, 0.0, 1, 0.58)),
    ('objects/odesa-15/03', 'video/DacJQZdsE2b.mp4', 22, (0, 0.0, 1, 0.6)),
    ('objects/odesa-15/04', 'video/DacJQZdsE2b.mp4', 31, (0, 0.0, 1, 0.6)),
    ('objects/odesa-15/05', 'video/DacJQZdsE2b.mp4', 16, (0, 0.0, 1, 0.58)),
    # Бюджетна 5 кВт, $4 500
    ('objects/budget-5/01', 'video/DZcURpAA9rb.mp4', 22, (0, 0.0, 1, 0.6)),
    ('objects/budget-5/02', 'video/DZcURpAA9rb.mp4', 10, (0, 0.0, 1, 0.6)),
    ('objects/budget-5/03', 'video/DZcURpAA9rb.mp4', 46, (0, 0.0, 1, 0.6)),
    ('objects/budget-5/04', 'video/DZcURpAA9rb.mp4', 49, (0, 0.05, 1, 0.62)),
    # Дальник, 8 кВт гібрид
    ('objects/dalnyk/01', 'video/Db5w6uMobUJ.mp4', 10, (0, 0.0, 1, 0.6)),
    ('objects/dalnyk/02', 'video/Db5w6uMobUJ.mp4', 28, (0, 0.0, 1, 0.6)),
    ('objects/dalnyk/03', 'video/Db5w6uMobUJ.mp4', 7, (0, 0.0, 1, 0.6)),
    ('objects/dalnyk/04', 'video/Db5w6uMobUJ.mp4', 43, (0, 0.0, 1, 0.6)),
    ('objects/dalnyk/05', 'video/Db5w6uMobUJ.mp4', 22, (0, 0.0, 1, 0.6)),
    # Мережева 30 кВт під зелений тариф
    ('objects/merezheva-30/01', 'video/DZDpeWOAH3u.mp4', 37, (0, 0.0, 1, 0.6)),
    ('objects/merezheva-30/02', 'video/DZDpeWOAH3u.mp4', 25, (0, 0.0, 1, 0.6)),
    ('objects/merezheva-30/03', 'video/DZDpeWOAH3u.mp4', 46, (0, 0.0, 1, 0.6)),
    ('objects/merezheva-30/04', 'video/DZDpeWOAH3u.mp4', 70, (0, 0.0, 1, 0.6)),
    # Одеса, дах 10-го поверху, 2,7 кВт
    ('objects/odesa-dakh/01', 'video/DfeKbZvg3zy.mp4', 13, (0, 0.12, 1, 0.62)),
    ('objects/odesa-dakh/02', 'video/DfeKbZvg3zy.mp4', 7, (0, 0.12, 1, 0.62)),
    ('objects/odesa-dakh/03', 'video/DfeKbZvg3zy.mp4', 22, (0, 0.12, 1, 0.62)),
    ('objects/odesa-dakh/04', 'video/DfeKbZvg3zy.mp4', 46, (0, 0.12, 1, 0.62)),
    # Single Instagram photos (clean)
    ('objects/hibrid-16/01', 'ig/DeqyCdRgO2C.jpg', None, (0, 0, 1, 1)),
    ('objects/deye-15/01', 'ig/DfMSJB4gEIx.jpg', None, (0, 0, 1, 1)),
    ('about/expo', 'ig/De9iE-AAA5C.jpg', None, (0, 0, 1, 1)),
    ('about/team-roof', 'ig/DWkH9tAAC30.jpg', None, (0, 0.0, 1, 0.62)),
    # Stock imagery from the client's current site
    ('stock/field', 'site/69cd018b702a2f08095acfce', None, (0, 0, 1, 1)),
    ('stock/house', 'site/69cd031c77397cca3bf76ad8', None, (0, 0, 1, 1)),
    ('stock/engineer', 'site/69cd0364f892884fe0e453bc', None, (0, 0, 1, 1)),
    ('stock/panels', 'site/69cd0341afcdc512652a4722', None, (0, 0, 1, 1)),
    ('stock/docs', 'site/69cd0308afcdc512652a45ed', None, (0, 0, 1, 1)),
    ('stock/meter', 'site/69cd032dafcdc512652a46c0', None, (0, 0, 1, 1)),
]


def grade(im: Image.Image) -> Image.Image:
    """Quiet editorial grade: a touch more contrast, slightly less saturation, cool shadows."""
    im = ImageEnhance.Contrast(im).enhance(1.06)
    im = ImageEnhance.Color(im).enhance(0.9)
    r, g, b = im.split()
    b = b.point(lambda v: min(255, int(v * 1.0 + (255 - v) * 0.035)))
    r = r.point(lambda v: int(v * 0.985))
    return Image.merge('RGB', (r, g, b))


def stills():
    for out, src, t, box in STILLS:
        path = os.path.join(R, src)
        if t is not None:
            tmp = os.path.join(TMP, 'f.png')
            run('-ss', str(t), '-i', path, '-frames:v', '1', tmp)
            im = Image.open(tmp).convert('RGB')
        else:
            im = Image.open(path).convert('RGB')
        W, H = im.size
        x0, y0, x1, y1 = box
        im = im.crop((int(W * x0), int(H * y0), int(W * x1), int(H * y1)))
        im.thumbnail((1400, 1400), Image.LANCZOS)
        im = grade(im)
        dst = os.path.join(OUT_IMG, out + '.webp')
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        im.save(dst, 'WEBP', quality=80, method=6)
    print('stills', len(STILLS))


ENC = ['-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-movflags', '+faststart', '-profile:v', 'high']
# Navy shadows, warm highlights: the sun glare stays golden, the panels go deep blue.
GRADE = 'eq=brightness=-0.05:contrast=1.12:saturation=0.82,colorbalance=rs=-0.08:gs=-0.02:bs=0.1:rh=0.06:gh=0.04:bh=-0.06'


def boomerang(chain, a, b):
    return f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS,fps=30,{chain},split[x][y];[y]reverse[r];[x][r]concat=n=2:v=1[v]"


def video():
    hero = os.path.join(R, 'stock/7038597-uhd_2732_1318_30fps.mp4')
    run('-i', hero, '-filter_complex', boomerang(f'scale=-2:1080:flags=lanczos,crop=1920:1080,{GRADE}', 0, 8), '-map', '[v]', *ENC, '-crf', '25', '-maxrate', '6M', '-bufsize', '12M', os.path.join(OUT_VID, 'hero.mp4'))
    mob = f'crop=ih*9/16:ih:iw*0.6-ih*9/32:0,scale=720:1280:flags=lanczos,{GRADE}'
    run('-i', hero, '-filter_complex', boomerang(mob, 0, 8), '-map', '[v]', *ENC, '-crf', '27', '-maxrate', '3M', '-bufsize', '6M', os.path.join(OUT_VID, 'hero-mobile.mp4'))
    run('-ss', '0.5', '-i', hero, '-frames:v', '1', '-vf', f'scale=-2:1080:flags=lanczos,crop=1920:1080,{GRADE}', '-q:v', '78', os.path.join(OUT_IMG, 'hero-poster.webp'))
    run('-ss', '0.5', '-i', hero, '-frames:v', '1', '-vf', mob, '-q:v', '76', os.path.join(OUT_IMG, 'hero-poster-mobile.webp'))
    mont = os.path.join(R, 'stock/8853517-hd_1920_1080_24fps.mp4')
    run('-i', mont, '-filter_complex', boomerang(f'scale=1280:720:flags=lanczos,{GRADE}', 0, 5), '-map', '[v]', *ENC, '-crf', '28', '-maxrate', '2500k', '-bufsize', '5M', os.path.join(OUT_VID, 'montazh.mp4'))
    run('-ss', '0.5', '-i', mont, '-frames:v', '1', '-vf', f'scale=1280:720:flags=lanczos,{GRADE}', '-q:v', '76', os.path.join(OUT_IMG, 'montazh-poster.webp'))
    for f in sorted(os.listdir(OUT_VID)):
        print(f, round(os.path.getsize(os.path.join(OUT_VID, f)) / 1048576, 2), 'MB')


if what in ('stills', 'all'):
    stills()
if what in ('video', 'all'):
    video()


def sizes():
    """src/lib/media.json: width/height of every public image, for galleries and layout."""
    import json
    out = {}
    for dp, _, fs in os.walk(OUT_IMG):
        for f in sorted(fs):
            if f.endswith('.webp'):
                p = os.path.join(dp, f)
                with Image.open(p) as im:
                    out['/' + os.path.relpath(p, os.path.join(root, 'public'))] = im.size
    json.dump(dict(sorted(out.items())), open(os.path.join(root, 'src/lib/media.json'), 'w'), indent=0)
    print('media.json', len(out))


if what in ('stills', 'all', 'sizes'):
    sizes()
