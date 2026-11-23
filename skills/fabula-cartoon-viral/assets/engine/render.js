const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs'); const path = require('path');
(async () => {
  const [,, mode, a, b] = process.argv; // mode: test "t1,t2,.." | video out.mp4 [start end]
  const words = JSON.parse(fs.readFileSync(path.join(__dirname, 'words.json'))).map(w => w);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on('pageerror', e => console.error('PAGEERR', e.message));
  await page.goto('file://' + path.join(__dirname, 'index.html'));
  await page.evaluate(w => window.init(w), words);
  if (mode === 'test') {
    const L=a.split(","); const D=path.resolve(process.cwd(),b||"test"); fs.mkdirSync(D,{recursive:true}); for (const [i,t] of L.entries()) { await page.evaluate(T => renderAt(T), +t); await page.screenshot({ path: path.join(D, `t_${String(i).padStart(2,"0")}.jpg`), type: 'jpeg', quality: 80 }); }
  } else {
    const FPS = 30, t0 = +(b || 0), t1 = +(process.argv[5] || page.evaluate ? (process.argv[5] || 0) : 0) || await page.evaluate(() => END);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', a], { stdio: ['pipe', 'inherit', 'inherit'] });
    const n = Math.round((t1 - t0) * FPS); const st = Date.now();
    for (let f = 0; f < n; f++) {
      await page.evaluate(T => renderAt(T), t0 + f / FPS);
      const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (f % 150 === 0) console.log(`frame ${f}/${n} ${((Date.now() - st) / 1000).toFixed(0)}s`);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();
