"""Métricas de áudio: BPM estimado, pitch da voz, picos de agudo (prováveis SFX), silêncios."""
import sys, wave
import numpy as np
w = wave.open(sys.argv[1]); sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
hop, n = 512, 2048
fr = np.lib.stride_tricks.sliding_window_view(x, n)[::hop] * np.hanning(n)
S = np.abs(np.fft.rfft(fr, axis=1)); f = np.fft.rfftfreq(n, 1 / sr); t = np.arange(len(S)) * hop / sr
band = lambda a, b: S[:, (f >= a) & (f < b)].sum(1)
low, hi = band(30, 150), band(4000, 10000); rms = np.sqrt((fr ** 2).mean(1)); fps = sr / hop
on = np.maximum(0, np.diff(np.log(low + 1e-3))); on -= on.mean()
ac = np.correlate(on, on, 'full')[len(on) - 1:]; lags = np.arange(len(ac)) / fps; m = (lags > .3) & (lags < 1.5)
print(f"bpm_estimado={60 / lags[m][np.argmax(ac[m])]:.0f}")
f0 = []
for i in range(0, len(x) - 1024, 512):
    seg = x[i:i + 1024] * np.hanning(1024)
    if np.sqrt((seg ** 2).mean()) < .05: continue
    a = np.correlate(seg, seg, 'full')[1023:]; lo, hi_ = int(sr / 450), int(sr / 70); k = lo + np.argmax(a[lo:hi_])
    if a[k] / a[0] > .5: f0.append(sr / k)
if f0: print("pitch_voz_hz p10/p50/p90 =", np.percentile(f0, [10, 50, 90]).round(0))
h = hi / (np.median(hi) + 1e-9)
pk = [float(round(t[i], 2)) for i in range(1, len(h) - 1) if h[i] > 6 and h[i] >= h[i - 1] and h[i] >= h[i + 1]]
print(f"picos_agudos(SFX provaveis)={len(pk)}:", pk[:120])
q = np.argsort(rms)[:60]; print("trechos_mais_silenciosos(s)=", [float(v) for v in sorted(set(np.round(t[q], 1)))][:30])
print("rms_percentis p5/p50/p95 =", np.percentile(rms, [5, 50, 95]).round(4))
