# Trilha + efeitos sonoros 100% sintetizados (sem samples de terceiros)
import numpy as np, wave, sys
SR = 44100
DUR = 98.3
N = int(DUR * SR)
rs = np.random.default_rng(7)

def env(n, a=.005, r=.2):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / r)
    return e
def sine(f, d, ph=0):
    t = np.arange(int(d * SR)) / SR
    f = np.broadcast_to(f, t.shape) if np.ndim(f) else f
    if np.ndim(f): return np.sin(2 * np.pi * np.cumsum(f) / SR + ph)
    return np.sin(2 * np.pi * f * t + ph)
def noise(d): return rs.standard_normal(int(d * SR))
def lp(x, a):  # filtro passa-baixa 1 polo
    y = np.zeros_like(x); s = 0.
    for i in range(len(x)): s += a * (x[i] - s); y[i] = s
    return y
def lpf(x, a):  # versão rápida (média móvel exponencial vetorizada aproximada)
    k = max(1, int(1 / a))
    return np.convolve(x, np.ones(k) / k, 'same')
def hpf(x, a): return x - lpf(x, a)
def add(buf, t, x, g=1.):
    i = int(t * SR)
    if i >= len(buf): return
    x = x[:len(buf) - i]; buf[i:i + len(x)] += x * g
def pluck(f, d=.6, bright=.5):
    n = int(d * SR); p = max(2, int(SR / f))
    buf = rs.uniform(-1, 1, p); out = np.zeros(n)
    for i in range(n):
        out[i] = buf[i % p]
        buf[i % p] = bright * buf[i % p] + (1 - bright) * .5 * (buf[i % p] + buf[(i + 1) % p]) if False else .5 * (buf[i % p] + buf[(i + 1) % p]) * .996
    return out * env(n, .002, d * .5)
def ks(f, d=.6):  # Karplus-Strong vetorizado por blocos (rápido)
    n = int(d * SR); p = max(2, int(round(SR / f)))
    out = np.zeros(n + p); out[:p] = rs.uniform(-1, 1, p)
    for i in range(p, n + p, p):
        seg = out[i - p:i]; nxt = .5 * (seg + np.roll(seg, -1)) * .994
        out[i:i + p] = nxt[:len(out[i:i + p])]
    return out[:n] * env(n, .001, d * .6)
def bell(f, d=1.2, g=1.):
    t = np.arange(int(d * SR)) / SR
    x = (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 6) + .3 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t * 12))
    return x * env(len(t), .002, d * .35) * g
def nf(n): return 440 * 2 ** ((n - 69) / 12)

music = np.zeros(N); sfx = np.zeros(N)
BPM = 120; beat = 60 / BPM
# progressão I-V-vi-IV em Dó
CH = [[60, 64, 67], [55, 59, 62, 67], [57, 60, 64], [53, 57, 60, 65]]
BASS = [36, 43, 45, 41]
MEL = [76, 79, 81, 79, 76, 74, 72, 74, 76, 74, 72, 67, 69, 72, 74, 72]
def groove(t0, t1, level=1., mel=True, full=True, minor=False):
    t = t0; k = 0
    ch = CH if not minor else [[57, 60, 64], [52, 55, 59], [53, 57, 60], [52, 56, 59]]
    bs = BASS if not minor else [33, 40, 41, 40]
    while t < t1:
        bar = (k // 8) % 4
        # baixo pizzicato nos tempos 1 e 3
        if k % 4 in (0, 2) or (full and k % 8 == 7):
            add(music, t, ks(nf(bs[bar] + 12), .35) * 1.0, .5 * level)
        # "ukulele" nos contratempos
        if full and k % 2 == 1:
            for j, n in enumerate(ch[bar]): add(music, t + j * .012, ks(nf(n + 12), .3), .16 * level)
        # shaker
        if full: add(music, t, hpf(noise(.05), .3) * env(int(.05 * SR), .001, .015), .06 * level)
        # glockenspiel melodia (colcheias alternadas)
        if mel and k % 2 == 0:
            n = MEL[(k // 2) % 16] - (3 if minor else 0)
            add(music, t, bell(nf(n + 12), .5), .09 * level)
        t += beat / 2; k += 1
groove(0, 53.4, 1.0)
# drama: drone grave + tique-taque
d = sine(nf(33), 5.5) * .5 + sine(nf(40), 5.5) * .3
add(music, 53.5, d * np.minimum(1, np.arange(len(d)) / SR / .8) * np.exp(-np.arange(len(d)) / SR / 6), .25)
for i in range(11): add(music, 53.6 + i * .5, hpf(noise(.03), .2) * env(int(.03 * SR), .001, .01), .25 if i % 2 else .18)
groove(58.9, 77.2, .75, mel=True, full=False, minor=True)
# brilho crescente antes da virada
for i in range(28): add(music, 77.3 + i * .125, bell(nf(72 + (i * 2) % 24), .6), .05 + i * .003)
sw = noise(3.5); sw = lpf(sw, .05) * np.linspace(0, 1, len(sw)) ** 2
add(music, 77.3, sw, .35)
groove(81.9, 97.2, 1.1)
# acorde final
for n in [48, 60, 64, 67, 72, 76]: add(music, 97.25, ks(nf(n), 1.1), .25)
add(music, 97.25, bell(nf(84), 1.0), .15)

# ---------- SFX ----------
def plim(t):
    add(sfx, t, bell(1568, .9), .45); add(sfx, t + .06, bell(2349, .8), .3)
def pop(t, f=600):
    d = .09; fr = np.linspace(f * 2.2, f, int(d * SR)); add(sfx, t, sine(fr, d) * env(int(d * SR), .001, .03), .5)
def whoosh(t, d=.35, g=.35):
    x = noise(d); x = hpf(lpf(x, .25), .02) * np.sin(np.linspace(0, np.pi, len(x))) ** 2; add(sfx, t, x, g)
def boing(t, f0=180, f1=520, d=.35):
    fr = np.linspace(f0, f1, int(d * SR)) * (1 + .08 * np.sin(np.arange(int(d * SR)) / SR * 2 * np.pi * 18)); add(sfx, t, sine(fr, d) * env(int(d * SR), .005, .15), .4)
def thud(t, g=.6):
    d = .3; fr = np.linspace(140, 45, int(d * SR)); add(sfx, t, sine(fr, d) * env(int(d * SR), .001, .08) + lpf(noise(d), .05) * env(int(d * SR), .001, .04) * 2, g)
def clang(t, g=.5):
    tt = np.arange(int(1.4 * SR)) / SR; x = sum(np.sin(2 * np.pi * f * tt) * np.exp(-tt * dk) for f, dk in [(523, 2.5), (1187, 3), (1741, 4), (2690, 6), (3311, 7)])
    add(sfx, t, x * env(len(tt), .001, .6) / 3, g)
def crack(t, g=.8):
    for i in range(7): add(sfx, t + i * .012 + rs.random() * .01, hpf(noise(.02), .4) * env(int(.02 * SR), .0005, .006), g * (1 - i / 9))
def tink(t, f=3000, g=.15): add(sfx, t, bell(f, .25), g)
def ding(t): add(sfx, t, bell(1318, .8), .4); add(sfx, t + .35, bell(1046, 1), .4)
def trombone(t):
    for i, n in enumerate([55, 54, 53, 52]):
        d = .32 if i < 3 else .9; tt = np.arange(int(d * SR)) / SR
        f = nf(n) * (1 + (.03 * np.sin(2 * np.pi * 6 * tt) if i == 3 else 0))
        x = sine(f if np.ndim(f) else np.full(len(tt), f), d); x = np.sign(x) * np.abs(x) ** .5
        add(sfx, t + i * .3, lpf(x, .15) * env(len(tt), .02, d), .3)
def sneeze(t):
    e_ = np.concatenate([np.linspace(0, 1, int(.05 * SR)), np.exp(-np.arange(int(.3 * SR)) / SR / .08)]); x = lpf(rs.standard_normal(len(e_)), .2) * e_; add(sfx, t, x, .5)
def scratch(t):
    d = .45; tt = np.arange(int(d * SR)) / SR; fr = 300 + 900 * np.abs(np.sin(2 * np.pi * 3 * tt))
    add(sfx, t, (sine(fr, d) * .4 + hpf(noise(d), .3) * .5) * env(len(tt), .002, .25), .4)
def cheer(t, d=2.2, g=.25):
    x = noise(d); x = hpf(lpf(x, .12), .03) * (1 + .5 * np.sin(np.arange(len(x)) / SR * 2 * np.pi * 7.3))
    e = np.minimum(1, np.arange(len(x)) / SR / .3) * np.minimum(1, (d - np.arange(len(x)) / SR) / .6); add(sfx, t, x * e, g)
def sizzle(t, d=1.0): x = hpf(noise(d), .5) * (1 + rs.random(int(d * SR))) * env(int(d * SR), .05, .6); add(sfx, t, x, .08)
def kaching(t): tink(t, 2637, .35); tink(t + .05, 3520, .3); add(sfx, t + .1, bell(1975, .9), .3)
def knock(t): d = .07; add(sfx, t, sine(np.linspace(900, 500, int(d * SR)), d) * env(int(d * SR), .001, .02), .45)
def click(t): add(sfx, t, hpf(noise(.015), .5) * env(int(.015 * SR), .0005, .004), .5); add(sfx, t + .02, bell(4000, .2), .05)

for t in [0.0, 1.9, 5.8, 24.9, 47.9, 84.4, 61.6, 75.0]: whoosh(t)
for t in [2.6, 5.1, 9.0, 9.55, 13.9]: plim(t)
for t in [5.9, 10.24, 15.15, 16.9, 26.7, 39.7, 40.85, 52.4, 52.6, 52.8, 57.6, 69.15, 83.1, 89.5]: pop(t)
sneeze(4.45); thud(8.0, .5); boing(12.6); trombone(22.1)
for i in range(14): tink(23.4 + i * .1, 1800, .08)
whoosh(29.8, .3, .2); pop(29.8, 300); sizzle(35.3)
ding(36.95)
for i in range(26): add(sfx, 42.7 + i * (1 / 6), sine(1900, .05) * env(int(.05 * SR), .001, .02), .08)
kaching(46.45)
pop(47.9, 900); cheer(47.95, 2.2, .3)
x = lpf(noise(1.4), .03); add(sfx, 50.0, x * np.linspace(1, .2, len(x)), .25)
scratch(53.4)
tink(57.45, 2600, .35); crack(57.47, .3); clang(59.6, .55)
for t in [63.1, 63.7, 64.2]: boing(t, 200, 620, .3); tink(t, 2200, .12)
x = lpf(noise(.8), .05); add(sfx, 65.2, x, .25)
add(sfx, 66.65, noise(.06) * env(int(.06 * SR), .0005, .02), .9); thud(66.66, .5)
x = hpf(noise(1.0), .3) * np.exp(-np.arange(int(SR)) / SR / .4); add(sfx, 66.7, x, .18)
whoosh(71.3, .2, .15); whoosh(73.2, .2, .15)
thud(75.95, .55)
crack(80.85, .9); thud(80.86, .3); boing(81.25, 500, 140, .25)
for i in range(10): click(82.0 + i * .23)
cheer(82.0, 2.3, .2)
for i in range(30): tink(89.15 + i * .045 + rs.random() * .03, 2400 + rs.random() * 1600, .1)
for i in range(7): knock(95.6 + i * .2)

mix = music * .55 + sfx * .9
mix = np.tanh(mix * 1.2) / np.tanh(1.2)
mix /= max(1e-6, np.abs(mix).max()) / .89

def wr(name, x):
    x = np.clip(x, -1, 1); st = np.stack([x, x], 1)
    w = wave.open(name, 'w'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes()); w.close()
wr('music_sfx.wav', mix)
print('ok', len(mix) / SR)
