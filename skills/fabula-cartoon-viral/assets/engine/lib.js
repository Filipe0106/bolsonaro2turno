// ===== Biblioteca de desenho (estilo cartoon 2D flat, contorno grosso) =====
const OL = '#2a2233';          // cor do contorno
const SW = 7;                  // espessura do contorno
const W = 1080, H = 1920;

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const prog = (t, a, b) => clamp((t - a) / (b - a));
const lerp = (a, b, k) => a + (b - a) * k;
const E = {
  out: t => 1 - Math.pow(1 - t, 3),
  inOut: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  back: t => { const c1 = 2.2, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  elastic: t => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - .75) * (2 * Math.PI / 3)) + 1,
};
function rng(seed) { let s = (Math.abs(Math.floor(seed * 2654435761)) % 2147483646) + 1; const f = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; f(); f(); f(); return f; }
const G = (tr, inner, extra = '') => `<g transform="${tr}" ${extra}>${inner}</g>`;
// "pop" de entrada com overshoot (stickers, textos, objetos)
const popS = (t, t0, d = .28) => t < t0 ? 0 : E.back(prog(t, t0, t0 + d));

// ---------- defs globais (gradientes / filtros) ----------
const DEFS = `
<defs>
 <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd3e8"/><stop offset=".55" stop-color="#c9eef0"/><stop offset="1" stop-color="#fff4d9"/></linearGradient>
 <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff07a"/><stop offset=".45" stop-color="#ffc927"/><stop offset="1" stop-color="#e8960c"/></linearGradient>
 <linearGradient id="whiteEgg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f6efe2"/><stop offset="1" stop-color="#dfd3bf"/></linearGradient>
 <radialGradient id="sunGlow"><stop offset="0" stop-color="#fffbe0" stop-opacity="1"/><stop offset=".35" stop-color="#fff3b0" stop-opacity=".8"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#140c20" stop-opacity=".85"/></radialGradient>
 <radialGradient id="spot" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="#fff6c8" stop-opacity=".95"/><stop offset=".6" stop-color="#fff6c8" stop-opacity=".25"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient>
 <radialGradient id="halo"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".4" stop-color="#fff7cf" stop-opacity=".6"/><stop offset="1" stop-color="#fff7cf" stop-opacity="0"/></radialGradient>
 <filter id="whip" x="-20%" y="-5%" width="140%" height="110%"><feGaussianBlur stdDeviation="38 0"/></filter>
 <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
 <pattern id="tiles" width="90" height="90" patternUnits="userSpaceOnUse"><rect width="90" height="90" fill="#d9f1ea"/><path d="M0 0H90V90" fill="none" stroke="#bfe3d8" stroke-width="5"/></pattern>
 <pattern id="check" width="160" height="160" patternUnits="userSpaceOnUse"><rect width="160" height="160" fill="#fff5ea"/><rect width="80" height="80" fill="#ffd7c2"/><rect x="80" y="80" width="80" height="80" fill="#ffd7c2"/></pattern>
 <pattern id="ging" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#fff"/><rect width="30" height="60" fill="#8fd6c4" opacity=".55"/><rect width="60" height="30" fill="#8fd6c4" opacity=".55"/></pattern>
 <pattern id="plaid" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#e76f51"/><rect width="12" height="40" fill="#c4553b"/><rect width="40" height="12" fill="#c4553b" opacity=".7"/></pattern>
 <pattern id="foam" width="120" height="120" patternUnits="userSpaceOnUse"><rect width="120" height="120" fill="#3c418f"/><rect x="8" y="8" width="48" height="48" rx="8" fill="#474da6"/><rect x="64" y="64" width="48" height="48" rx="8" fill="#474da6"/><rect x="64" y="8" width="48" height="48" rx="8" fill="#41469a"/><rect x="8" y="64" width="48" height="48" rx="8" fill="#41469a"/></pattern>
</defs>`;

// ---------- primitivas ----------
function star4(x, y, s, rot = 0, col = '#fff') {
  return G(`translate(${x},${y}) rotate(${rot}) scale(${s})`,
    `<path d="M0,-40 Q6,-6 40,0 Q6,6 0,40 Q-6,6 -40,0 Q-6,-6 0,-40Z" fill="${col}"/>`);
}
function sparkles(x, y, t, t0, n = 6, R = 120, col = '#fff7b0') {
  if (t < t0 || t > t0 + .9) return '';
  const k = prog(t, t0, t0 + .9), s = Math.sin(k * Math.PI);
  let o = '';
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2 + .3;
    const r = R * (.4 + .8 * E.out(k));
    o += star4(x + Math.cos(a) * r, y + Math.sin(a) * r, .55 * s + .1, k * 90, col);
  }
  // anel de impacto
  o += `<circle cx="${x}" cy="${y}" r="${40 + 160 * E.out(k)}" fill="none" stroke="#fff" stroke-width="${10 * (1 - k)}" opacity="${1 - k}"/>`;
  return o;
}
function egg(x, y, s = 1, kind = 'gold', rot = 0, shine = 0) {
  const fill = kind === 'gold' ? 'url(#gold)' : 'url(#whiteEgg)';
  let o = `<path d="M0,-62 C36,-62 52,-12 52,16 C52,46 29,64 0,64 C-29,64 -52,46 -52,16 C-52,-12 -36,-62 0,-62Z" fill="${fill}" stroke="${OL}" stroke-width="${SW / s * .9}"/>`;
  o += `<path d="M-26,-30 Q-34,-8 -32,10" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none" opacity=".8"/>`;
  if (kind === 'gold' && shine) o += star4(26, -36, .5 + .2 * Math.sin(shine * 9), shine * 60, '#fff');
  return G(`translate(${x},${y}) rotate(${rot}) scale(${s})`, o);
}
function shadow(x, y, rx, op = .18) { return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * .18}" fill="#3b2a4a" opacity="${op}"/>`; }

// rótulo em pílula (nome do personagem etc.)
function pill(x, y, text, t, t0, o = {}) {
  const k = popS(t, t0, .3); if (k <= 0) return '';
  const fs = o.fs || 92, w = o.w || text.length * fs * .62 + 90, h = fs * 1.35;
  const col = o.col || '#ff5a1f', bg = o.bg || '#fff8ec';
  const rot = o.rot || -4;
  return G(`translate(${x},${y}) rotate(${rot}) scale(${k})`,
    `<rect x="${-w / 2}" y="${-h / 2 + 10}" width="${w}" height="${h}" rx="${h / 2}" fill="${OL}" opacity=".35"/>
     <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${bg}" stroke="${OL}" stroke-width="9"/>
     <text x="0" y="${fs * .36}" text-anchor="middle" font-family="Lilita One" font-size="${fs}" fill="${col}">${text}</text>`);
}
// texto "carimbo" grande estilo HQ (amarelo com contorno)
function stamp(x, y, text, t, t0, o = {}) {
  const k = popS(t, t0, .32); if (k <= 0) return '';
  const fs = o.fs || 150, rot = o.rot ?? -6, fill = o.fill || '#ffd23f', sub = o.sub;
  const wob = Math.sin((t - t0) * 6) * 1.5;
  let s = `<text x="0" y="12" text-anchor="middle" font-family="Lilita One" font-size="${fs}" fill="${OL}" opacity=".45">${text}</text>
    <text x="0" y="0" text-anchor="middle" font-family="Lilita One" font-size="${fs}" fill="${fill}" stroke="${OL}" stroke-width="${fs * .12}" paint-order="stroke" stroke-linejoin="round">${text}</text>`;
  if (sub) s += `<text x="0" y="${fs * .62}" text-anchor="middle" font-family="Lilita One" font-size="${fs * .42}" fill="#fff" stroke="${OL}" stroke-width="${fs * .07}" paint-order="stroke" stroke-linejoin="round">${sub}</text>`;
  return G(`translate(${x},${y}) rotate(${rot + wob}) scale(${k})`, s);
}
function numBadge(x, y, n, t, t0) {
  const k = popS(t, t0, .25); if (k <= 0) return '';
  return G(`translate(${x},${y}) scale(${k})`, `<circle r="58" fill="#fff8ec" stroke="${OL}" stroke-width="9"/><text y="30" text-anchor="middle" font-family="Lilita One" font-size="86" fill="${OL}">${n}</text>`);
}
function motionLines(x, y, t, dir = 1, n = 4, len = 120) {
  let o = '';
  for (let i = 0; i < n; i++) {
    const yy = y + (i - n / 2) * 38, ph = (t * 4 + i * .3) % 1;
    o += `<line x1="${x + dir * (30 + ph * 60)}" y1="${yy}" x2="${x + dir * (30 + ph * 60 + len)}" y2="${yy}" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="${.9 - ph * .7}"/>`;
  }
  return o;
}
function sweat(x, y, t, s = 1) {
  const ph = (t * 1.5) % 1;
  return G(`translate(${x},${y + ph * 40}) scale(${s})`, `<path d="M0,-26 Q18,0 0,14 Q-18,0 0,-26Z" fill="#8fd3ff" stroke="${OL}" stroke-width="5" opacity="${1 - ph}"/>`);
}
function confetti(t, seed = 3, n = 60, area = [0, -100, W, H]) {
  const r = rng(seed); let o = '';
  const cols = ['#ff5a5f', '#ffd23f', '#3ec1d3', '#6c5ce7', '#2fae7f', '#ff9f1c'];
  for (let i = 0; i < n; i++) {
    const x0 = area[0] + r() * area[2], sp = 260 + r() * 300, ph = r() * 10;
    const y = (area[1] + ((t + ph) * sp) % (area[3] + 200)) - 100;
    const x = x0 + Math.sin((t + ph) * 3) * 40;
    o += `<rect x="${x}" y="${y}" width="22" height="12" rx="3" fill="${cols[i % 6]}" transform="rotate(${(t * 300 + i * 40) % 360} ${x} ${y})"/>`;
  }
  return o;
}
function eggRain(t, t0, seed = 5, n = 26, kind = 'gold', area = [80, 920]) {
  if (t < t0) return '';
  const r = rng(seed); let o = '';
  for (let i = 0; i < n; i++) {
    const x = area[0] + r() * (area[1] - area[0]), st = t0 + r() * 1.6, sp = 1500 + r() * 900;
    if (t < st) { r(); continue; }
    const y = -120 + (t - st) * sp; const rot = (t - st) * (200 + r() * 200);
    if (y < H + 100) o += egg(x, y, .7 + (i % 3) * .15, kind, rot, t);
  }
  return o;
}

// ---------- personagens ----------
function eye(cx, cy, shape, look, skin, sz = 1) {
  const lx = look[0] * 11, ly = look[1] * 11;
  const rx = 33 * sz, ry = 40 * sz;
  switch (shape) {
    case 'closed': return `<path d="M${cx - 28},${cy + 4} Q${cx},${cy + 22} ${cx + 28},${cy + 4}" stroke="${OL}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
    case 'happy': return `<path d="M${cx - 28},${cy + 10} Q${cx},${cy - 24} ${cx + 28},${cy + 10}" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    case 'tight': return `<path d="M${cx - 30},${cy - 12} L${cx + 26},${cy + 2} L${cx - 30},${cy + 14}" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'wide': return `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 1.2}" ry="${ry * 1.2}" fill="#fff" stroke="${OL}" stroke-width="${SW}"/><circle cx="${cx + lx}" cy="${cy + ly}" r="${10 * sz}" fill="${OL}"/>`;
    case 'gold': return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" stroke="${OL}" stroke-width="${SW}"/>` + egg(cx + lx * .5, cy + ly * .5, .42 * sz, 'gold', 0);
    case 'half': {
      return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" stroke="${OL}" stroke-width="${SW}"/>
        <circle cx="${cx + lx}" cy="${cy + 8 + ly * .5}" r="${16 * sz}" fill="${OL}"/>
        <path d="M${cx - rx - 3},${cy + 2} A${rx + 3},${ry + 3} 0 0 1 ${cx + rx + 3},${cy + 2} Z" fill="${skin}"/>
        <path d="M${cx - rx},${cy + 2} L${cx + rx},${cy + 2}" stroke="${OL}" stroke-width="8" stroke-linecap="round"/>`;
    }
    default: return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" stroke="${OL}" stroke-width="${SW}"/><circle cx="${cx + lx}" cy="${cy + ly}" r="${17 * sz}" fill="${OL}"/><circle cx="${cx + lx + 6}" cy="${cy + ly - 7}" r="5" fill="#fff"/>`;
  }
}
function mouth(kind) {
  switch (kind) {
    case 'flat': return `<path d="M-26,-346 L24,-344" stroke="${OL}" stroke-width="9" stroke-linecap="round"/>`;
    case 'frown': return `<path d="M-30,-336 Q0,-362 30,-336" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    case 'o': return `<ellipse cx="0" cy="-342" rx="17" ry="22" fill="#6b1f2e" stroke="${OL}" stroke-width="7"/>`;
    case 'open': return `<path d="M-42,-362 Q0,-292 42,-362 Z" fill="#6b1f2e" stroke="${OL}" stroke-width="8" stroke-linejoin="round"/><path d="M-20,-322 Q0,-336 20,-322 Q0,-312 -20,-322Z" fill="#ff7b8a"/>`;
    case 'laugh': return `<path d="M-58,-370 Q0,-270 58,-370 Z" fill="#6b1f2e" stroke="${OL}" stroke-width="8" stroke-linejoin="round"/><path d="M-50,-366 L50,-366 L44,-352 L-44,-352Z" fill="#fff"/><path d="M-26,-306 Q0,-326 26,-306 Q0,-296 -26,-306Z" fill="#ff7b8a"/>`;
    case 'grin': return `<rect x="-46" y="-372" width="92" height="40" rx="18" fill="#fff" stroke="${OL}" stroke-width="8"/><path d="M-46,-352 H46 M-16,-372 V-332 M16,-372 V-332" stroke="${OL}" stroke-width="5"/>`;
    case 'wavy': return `<path d="M-36,-346 l12,-10 l12,10 l12,-10 l12,10 l12,-10" stroke="${OL}" stroke-width="8" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
    case 'smirk': return `<path d="M-30,-350 Q5,-336 34,-360" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    default: return `<path d="M-36,-362 Q0,-322 36,-362" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/>`; // smile
  }
}
function brows(kind, hc) {
  const c = hc || OL;
  const L = { flat: [-80, -488, -20, -484], up: [-80, -500, -22, -510], down: [-78, -500, -22, -484], sad: [-80, -486, -24, -502], angry: [-80, -506, -24, -486] }[kind || 'flat'];
  if (!L) return '';
  return `<path d="M${L[0]},${L[1]} L${L[2]},${L[3]}" stroke="${c}" stroke-width="13" stroke-linecap="round"/><path d="M${-L[0]},${L[1]} L${-L[2]},${L[3]}" stroke="${c}" stroke-width="13" stroke-linecap="round"/>`;
}
function armPath(sx, sy, ex, ey, hx, hy, skin, sleeve) {
  const d = `M${sx},${sy} Q${ex},${ey} ${hx},${hy}`;
  return `<path d="${d}" stroke="${OL}" stroke-width="46" fill="none" stroke-linecap="round"/>
   <path d="${d}" stroke="${skin}" stroke-width="31" fill="none" stroke-linecap="round"/>
   <circle cx="${sx}" cy="${sy}" r="30" fill="${sleeve}" stroke="${OL}" stroke-width="${SW}"/>
   <circle cx="${hx}" cy="${hy}" r="25" fill="${skin}" stroke="${OL}" stroke-width="${SW}"/>`;
}
const ARMS = {
  down: s => [[s * 92, -272], [s * 128, -210], [s * 118, -150]],
  hips: s => [[s * 92, -272], [s * 165, -205], [s * 98, -165]],
  up: s => [[s * 92, -272], [s * 160, -360], [s * 150, -470]],
  hold: s => [[s * 92, -272], [s * 120, -200], [s * 42, -215]],
  out: s => [[s * 92, -272], [s * 170, -260], [s * 215, -300]],
  face: s => [[s * 92, -272], [s * 150, -300], [s * 70, -380]],
  chin: s => [[s * 92, -272], [s * 110, -260], [s * 40, -320]],
};
function person(o, t = 0) {
  const skin = o.skin, sh = o.shirt, wide = o.wide || 1;
  const bob = o.still ? 0 : Math.abs(Math.sin((t + (o.ph || 0)) * Math.PI * (o.bobHz || 1.4))) * (o.bobAmp ?? 7);
  const blink = !o.noBlink && ((t + (o.ph || 0) * 1.7) % 3.3) < .1;
  const eyeShape = blink && !['closed', 'happy', 'tight'].includes(o.eyes) ? 'closed' : (o.eyes || 'open');
  const look = o.look || [0, 0];
  const aL = (ARMS[o.armL || o.arms || 'down'])(-1), aR = (ARMS[o.armR || o.arms || 'down'])(1);
  let back = '', bodyS = '', head = '';
  // pernas + sapatos
  const legs = o.dress ? `<rect x="-52" y="-95" width="38" height="82" rx="14" fill="${skin}" stroke="${OL}" stroke-width="${SW}"/><rect x="14" y="-95" width="38" height="82" rx="14" fill="${skin}" stroke="${OL}" stroke-width="${SW}"/>`
    : `<rect x="-60" y="-140" width="50" height="128" rx="16" fill="${o.pants}" stroke="${OL}" stroke-width="${SW}"/><rect x="10" y="-140" width="50" height="128" rx="16" fill="${o.pants}" stroke="${OL}" stroke-width="${SW}"/>`;
  const shoes = `<path d="M-82,-4 Q-82,-34 -50,-34 L-18,-34 Q-6,-34 -6,-14 L-6,-2 Z" fill="${o.shoes}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M82,-4 Q82,-34 50,-34 L18,-34 Q6,-34 6,-14 L6,-2 Z" fill="${o.shoes}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M-82,-6 H-6 M82,-6 H6" stroke="#fff" stroke-width="8"/>`;
  // tronco
  const bw = 98 * wide;
  if (o.dress) bodyS = `<path d="M${-bw + 10},-300 Q0,-318 ${bw - 10},-300 L${bw + 30},-88 Q0,-70 ${-bw - 30},-88 Z" fill="${sh}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  else bodyS = `<rect x="${-bw}" y="-305" width="${bw * 2}" height="${190}" rx="${46}" fill="${sh}" stroke="${OL}" stroke-width="${SW}"/>`;
  if (o.pattern === 'dots') for (let i = 0; i < 7; i++) bodyS += `<circle cx="${-60 + (i % 4) * 40 + (i > 3 ? 20 : 0)}" cy="${-250 + Math.floor(i / 4) * 70}" r="8" fill="#fff" opacity=".85"/>`;
  if (o.pattern === 'plaid') bodyS = bodyS.replace(`fill="${sh}"`, `fill="url(#plaid)"`);
  if (o.overall) bodyS += `<path d="M-62,-250 H62 V-118 H-62Z" fill="${o.overall}" stroke="${OL}" stroke-width="${SW}"/><path d="M-62,-250 L-80,-300 M62,-250 L80,-300" stroke="${o.overall}" stroke-width="18"/><circle cx="-50" cy="-236" r="8" fill="#ffd23f" stroke="${OL}" stroke-width="4"/><circle cx="50" cy="-236" r="8" fill="#ffd23f" stroke="${OL}" stroke-width="4"/>`;
  if (o.apron) bodyS += `<path d="M-70,-250 H70 L78,-100 H-78 Z" fill="${o.apron}" stroke="${OL}" stroke-width="${SW}"/><rect x="-30" y="-190" width="60" height="44" rx="10" fill="none" stroke="${OL}" stroke-width="5"/>`;
  if (o.sash) bodyS += `<path d="M${-bw + 18},-290 L${bw - 6},-138 L${bw - 40},-118 L${-bw},-262 Z" fill="${o.sash}" stroke="${OL}" stroke-width="5"/><circle cx="10" cy="-205" r="26" fill="url(#gold)" stroke="${OL}" stroke-width="6"/>`;
  if (o.bow) bodyS += `<path d="M0,-298 L-40,-320 L-40,-276 Z M0,-298 L40,-320 L40,-276 Z" fill="${o.bow}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/><circle cx="0" cy="-298" r="12" fill="${o.bow}" stroke="${OL}" stroke-width="6"/>`;
  if (o.scarf) bodyS += `<path d="M-60,-300 Q0,-270 60,-300 L50,-280 Q0,-250 -50,-280Z" fill="${o.scarf}" stroke="${OL}" stroke-width="6"/>`;
  if (o.logo) bodyS += egg(0, -215, .42, 'white');
  // cabeça
  const hc = o.hairColor || OL;
  const hy = -425;
  switch (o.hair) {
    case 'buns':
      back += `<circle cx="-118" cy="-530" r="64" fill="${hc}" stroke="${OL}" stroke-width="${SW}"/><circle cx="118" cy="-530" r="64" fill="${hc}" stroke="${OL}" stroke-width="${SW}"/>`;
      break;
    case 'curly':
      for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + i * .1); back += `<circle cx="${Math.cos(a) * 125}" cy="${hy + Math.sin(a) * 125}" r="52" fill="${hc}" stroke="${OL}" stroke-width="${SW}"/>`; }
      break;
  }
  head += `<circle cx="-126" cy="${hy + 10}" r="24" fill="${skin}" stroke="${OL}" stroke-width="${SW}"/><circle cx="126" cy="${hy + 10}" r="24" fill="${skin}" stroke="${OL}" stroke-width="${SW}"/>`;
  head += `<ellipse cx="0" cy="${hy}" rx="128" ry="122" fill="${skin}" stroke="${OL}" stroke-width="${SW}"/>`;
  if (o.earrings) head += `<circle cx="-128" cy="${hy + 44}" r="14" fill="none" stroke="#ffd23f" stroke-width="7"/><circle cx="128" cy="${hy + 44}" r="14" fill="none" stroke="#ffd23f" stroke-width="7"/>`;
  // cabelo / chapéu frontal
  let front = '';
  switch (o.hair) {
    case 'buns':
      front += `<path d="M-128,-430 Q-138,-562 0,-560 Q138,-562 128,-430 Q104,-498 30,-500 Q8,-470 -14,-500 Q-100,-500 -128,-430Z" fill="${hc}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
      front += `<rect x="70" y="-560" width="46" height="26" rx="10" fill="${o.clip || '#ffd23f'}" stroke="${OL}" stroke-width="6" transform="rotate(25 93 -547)"/>`;
      break;
    case 'curly':
      front += `<path d="M-128,-440 Q-120,-560 0,-556 Q120,-560 128,-440 Q80,-500 40,-492 Q0,-520 -40,-492 Q-80,-500 -128,-440Z" fill="${hc}" stroke="${OL}" stroke-width="${SW}"/>`;
      break;
    case 'short':
      front += `<path d="M-128,-436 Q-126,-556 0,-552 Q126,-556 128,-436 Q90,-488 0,-492 Q-90,-488 -128,-436Z" fill="${hc}" stroke="${OL}" stroke-width="${SW}"/>`;
      break;
    case 'wrap':
      front += `<path d="M-132,-440 Q-150,-610 0,-622 Q150,-610 132,-440 Q70,-492 0,-490 Q-70,-492 -132,-440Z" fill="${o.wrap}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
      front += `<path d="M-100,-470 Q0,-500 100,-470" stroke="#fff" stroke-width="8" fill="none" opacity=".6" stroke-dasharray="6 18" stroke-linecap="round"/>`;
      front += `<ellipse cx="60" cy="-610" rx="48" ry="30" fill="${o.wrap}" stroke="${OL}" stroke-width="${SW}" transform="rotate(-20 60 -610)"/><ellipse cx="-10" cy="-622" rx="40" ry="28" fill="${o.wrap}" stroke="${OL}" stroke-width="${SW}" transform="rotate(15 -10 -622)"/>`;
      break;
    case 'tophat':
      front += `<ellipse cx="-118" cy="-440" rx="30" ry="46" fill="${hc}" stroke="${OL}" stroke-width="${SW}"/><ellipse cx="118" cy="-440" rx="30" ry="46" fill="${hc}" stroke="${OL}" stroke-width="${SW}"/>`;
      front += `<ellipse cx="0" cy="-528" rx="150" ry="30" fill="#26233a" stroke="${OL}" stroke-width="${SW}"/><path d="M-92,-530 L-84,-700 Q0,-716 84,-700 L92,-530 Q0,-512 -92,-530Z" fill="#26233a" stroke="${OL}" stroke-width="${SW}"/><path d="M-90,-566 Q0,-548 90,-566 L88,-596 Q0,-580 -88,-596Z" fill="#e63946"/>`;
      break;
    case 'chef':
      front += `<path d="M-110,-470 Q-120,-500 -100,-520 L100,-520 Q120,-500 110,-470 Q0,-450 -110,-470Z" fill="#fff" stroke="${OL}" stroke-width="${SW}"/>`;
      front += `<circle cx="-70" cy="-590" r="62" fill="#fff" stroke="${OL}" stroke-width="${SW}"/><circle cx="70" cy="-590" r="62" fill="#fff" stroke="${OL}" stroke-width="${SW}"/><circle cx="0" cy="-630" r="72" fill="#fff" stroke="${OL}" stroke-width="${SW}"/><rect x="-96" y="-590" width="192" height="80" fill="#fff"/><path d="M-96,-590 V-516 M96,-590 V-516" stroke="${OL}" stroke-width="${SW}"/>`;
      break;
    case 'straw':
      front += `<ellipse cx="0" cy="-505" rx="205" ry="42" fill="#f4cf6b" stroke="${OL}" stroke-width="${SW}"/><path d="M-100,-510 Q-96,-610 0,-616 Q96,-610 100,-510 Q0,-494 -100,-510Z" fill="#f4cf6b" stroke="${OL}" stroke-width="${SW}"/><path d="M-98,-528 Q0,-512 98,-528" stroke="#c0392b" stroke-width="16" fill="none"/>`;
      break;
    case 'cap':
      front += `<path d="M-128,-450 Q-120,-570 0,-566 Q120,-570 128,-450 Z" fill="${o.capc || '#3ec1d3'}" stroke="${OL}" stroke-width="${SW}"/><path d="M40,-462 Q160,-470 200,-440 Q140,-430 40,-440Z" fill="${o.capc || '#3ec1d3'}" stroke="${OL}" stroke-width="${SW}"/>`;
      break;
    case 'bald':
      front += `<ellipse cx="-118" cy="-440" rx="30" ry="46" fill="${hc}" stroke="${OL}" stroke-width="${SW}"/><ellipse cx="118" cy="-440" rx="30" ry="46" fill="${hc}" stroke="${OL}" stroke-width="${SW}"/>`;
      break;
  }
  // rosto
  let face = `<ellipse cx="-80" cy="-375" rx="26" ry="16" fill="#ff7b8a" opacity=".45"/><ellipse cx="80" cy="-375" rx="26" ry="16" fill="#ff7b8a" opacity=".45"/>`;
  if (o.blushRed) face += `<ellipse cx="0" cy="-390" rx="110" ry="40" fill="#ff3b3b" opacity="${o.blushRed}"/>`;
  face += eye(-48, -425, eyeShape, look, skin) + eye(48, -425, eyeShape, look, skin);
  face += brows(o.brows || 'flat', o.browColor);
  face += `<path d="M-8,-392 Q0,-380 10,-392" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  if (o.beard) face += `<path d="M-110,-400 Q-120,-300 0,-280 Q120,-300 110,-400 Q60,-360 0,-362 Q-60,-360 -110,-400Z" fill="#f5f5f0" stroke="${OL}" stroke-width="${SW}"/>`;
  if (o.glasses) face += `<circle cx="-48" cy="-425" r="48" fill="none" stroke="${OL}" stroke-width="9"/><circle cx="48" cy="-425" r="48" fill="none" stroke="${OL}" stroke-width="9"/><path d="M-4,-430 H4" stroke="${OL}" stroke-width="9"/>`;
  if (o.shades) face += `<path d="M-100,-450 H100 L92,-420 Q70,-390 30,-404 L8,-430 H-8 L-30,-404 Q-70,-390 -92,-420Z" fill="#1d1a2b" stroke="${OL}" stroke-width="6"/><path d="M-80,-440 L-60,-440" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`;
  face += mouth(o.mouth || 'smile');
  const headTilt = o.tilt || 0;
  const headG = G(`rotate(${headTilt} 0 -330)`, back + head + front + face + (o.headExtra || ''));
  const armsL = armPath(...aL[0], ...aL[1], ...aL[2], skin, sh), armsR = armPath(...aR[0], ...aR[1], ...aR[2], skin, sh);
  const handItem = o.hand ? o.hand : '';
  const sq = 1 - bob * .004;
  const body = shadow(0, -2, 120) + G(`translate(0,${-bob}) scale(${1 / sq},${sq})`, legs + shoes + armsL + bodyS + armsR + headG + handItem);
  const s = (o.s || 1);
  return G(`translate(${o.x || 0},${o.y || 0}) scale(${s * (o.flip ? -1 : 1)},${s})`, body);
}
// presets de elenco (todos originais)
const CAST = {
  lia: { skin: '#b5713f', shirt: '#ffffff', overall: '#6c5ce7', pants: '#4b3fc0', shoes: '#ff5d5d', hair: 'buns', hairColor: '#2a1a17', clip: '#ffd23f', logo: false },
  mae: { skin: '#8a5330', shirt: '#2fae7f', dress: true, pattern: 'dots', shoes: '#f2b134', hair: 'wrap', wrap: '#ef476f', earrings: true, s: 1.08 },
  pref: { skin: '#f2c4a0', shirt: '#7a4b2a', pants: '#5a3720', shoes: '#2a2233', hair: 'tophat', hairColor: '#a7a7b5', sash: '#e63946', bow: '#e63946', wide: 1.28, brows: 'flat', browColor: '#8d8d99' },
  pad: { skin: '#eaa77b', shirt: '#ffffff', pants: '#3d5a80', shoes: '#2a2233', hair: 'chef', glasses: true, scarf: '#3d9be9', wide: 1.15, apron: '#f4f1ea' },
  ze: { skin: '#c98b5b', shirt: '#e76f51', pattern: 'plaid', pants: '#6d597a', shoes: '#7b4a2a', hair: 'straw', beard: true, brows: 'flat', browColor: '#eee' },
};
function villager(i, t, extra = {}) {
  const r = rng(i * 7 + 3);
  const skins = ['#f2c4a0', '#c98b5b', '#8a5330', '#e0ac69', '#6b3e26', '#f7d7b5'];
  const shirts = ['#ff9f1c', '#3ec1d3', '#ff5a5f', '#6c5ce7', '#2fae7f', '#ffd23f', '#e84393', '#00a8a8'];
  const hairs = ['short', 'curly', 'cap', 'wrap', 'buns', 'short', 'bald'];
  const hc = ['#2a1a17', '#5a3a22', '#1b1b1b', '#8d8d99', '#b5651d'];
  const o = { skin: skins[Math.floor(r() * 6)], shirt: shirts[Math.floor(r() * 8)], pants: '#3d405b', shoes: '#2a2233', hair: hairs[Math.floor(r() * 7)], hairColor: hc[Math.floor(r() * 5)], wrap: shirts[Math.floor(r() * 8)], capc: shirts[Math.floor(r() * 8)], ph: r() * 3, ...extra };
  return person(o, t);
}

// ---------- galinhas ----------
function hen(o, t = 0) {
  const col = o.col || '#ffffff', s = o.s || 1;
  const bob = o.still ? 0 : Math.abs(Math.sin((t + (o.ph || 0)) * Math.PI * 1.8)) * 6;
  const shakeX = o.shake ? Math.sin(t * 70) * o.shake : 0;
  let b = '';
  // cauda
  b += `<path d="M60,-150 Q120,-260 160,-210 Q150,-170 120,-150 Q170,-170 165,-120 Q130,-100 80,-100Z" fill="${o.tail || col}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  if (o.rooster) b += `<path d="M70,-150 Q150,-330 230,-250 Q190,-240 170,-190 Q240,-200 230,-130 Q180,-120 90,-110Z" fill="#2e86de" stroke="${OL}" stroke-width="${SW}"/><path d="M80,-140 Q170,-270 210,-200" stroke="#27ae60" stroke-width="26" fill="none" stroke-linecap="round"/>`;
  // pernas
  b += `<path d="M-20,-40 V0 M-34,0 H-6 M24,-40 V0 M10,0 H38" stroke="#f39c12" stroke-width="10" stroke-linecap="round"/>`;
  // corpo + cabeça
  b += `<path d="M-120,-200 Q-130,-280 -60,-280 Q0,-280 -6,-200 Q60,-190 100,-150 Q120,-40 10,-36 Q-110,-30 -120,-120 Z" fill="${col}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  if (o.blush) b += `<ellipse cx="-60" cy="-215" rx="50" ry="30" fill="#ff4d4d" opacity="${o.blush}"/>`;
  // asa
  b += `<path d="M-10,-140 Q40,-150 70,-110 Q30,-70 -20,-90 Z" fill="${o.wing || col}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>`;
  // crista
  const cs = o.rooster ? 1.5 : 1;
  b += G(`translate(-70,-278) scale(${cs})`, `<circle cx="-22" cy="-6" r="18" fill="#ff3b3b" stroke="${OL}" stroke-width="5"/><circle cx="2" cy="-16" r="21" fill="#ff3b3b" stroke="${OL}" stroke-width="5"/><circle cx="24" cy="-4" r="16" fill="#ff3b3b" stroke="${OL}" stroke-width="5"/>`);
  if (o.tuft) b += `<path d="M-60,-282 Q-70,-330 -40,-320 M-56,-282 Q-30,-330 -20,-300" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  // bico e barbela
  b += `<path d="M-124,-222 L-168,-206 L-122,-192 Z" fill="#ffb02e" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>`;
  b += `<path d="M-122,-190 Q-136,-150 -112,-160 Q-104,-176 -112,-190Z" fill="#ff3b3b" stroke="${OL}" stroke-width="5"/>`;
  // olho
  const e = o.eye || 'open';
  const ex = -78, ey = -232;
  if (e === 'tight') b += `<path d="M${ex - 18},${ey - 10} L${ex + 14},${ey} L${ex - 18},${ey + 10}" stroke="${OL}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  else if (e === 'wide') b += `<circle cx="${ex}" cy="${ey}" r="30" fill="#fff" stroke="${OL}" stroke-width="6"/><circle cx="${ex - 4}" cy="${ey}" r="7" fill="${OL}"/>`;
  else if (e === 'half') b += `<circle cx="${ex}" cy="${ey}" r="22" fill="#fff" stroke="${OL}" stroke-width="6"/><circle cx="${ex - 6}" cy="${ey + 6}" r="10" fill="${OL}"/><path d="M${ex - 25},${ey} A25,25 0 0 1 ${ex + 25},${ey}Z" fill="${col}"/><path d="M${ex - 22},${ey} H${ex + 22}" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>`;
  else b += `<circle cx="${ex}" cy="${ey}" r="22" fill="#fff" stroke="${OL}" stroke-width="6"/><circle cx="${ex - 6 + (o.look || 0) * 8}" cy="${ey}" r="11" fill="${OL}"/>`;
  if (o.shades) b += `<path d="M-130,-246 H-40 L-46,-222 Q-70,-205 -92,-222 L-100,-236 H-130Z" fill="#1d1a2b"/><path d="M-110,-240 l12,0" stroke="#fff" stroke-width="5"/>`;
  if (o.bow) b += `<path d="M-30,-286 L-60,-306 L-60,-266Z M-30,-286 L0,-306 L0,-266Z" fill="#ff5d9e" stroke="${OL}" stroke-width="5"/>`;
  return G(`translate(${(o.x || 0) + shakeX},${o.y || 0}) scale(${s * (o.flip ? -1 : 1)},${s})`, shadow(0, 0, 120) + G(`translate(0,${-bob})`, b));
}

// ---------- cenários ----------
function cloud(x, y, s) { return G(`translate(${x},${y}) scale(${s})`, `<path d="M-120,30 Q-130,-30 -70,-30 Q-60,-80 0,-70 Q50,-100 80,-40 Q140,-40 130,30 Z" fill="#fff" opacity=".95"/>`); }
function house(x, y, w, h, wall, roof, seed) {
  const r = rng(seed);
  let o = `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}" stroke="${OL}" stroke-width="${SW}"/>`;
  o += `<path d="M${x - 20},${y - h} L${x + w / 2},${y - h - w * .45} L${x + w + 20},${y - h} Z" fill="${roof}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  const nw = Math.max(1, Math.floor(w / 110));
  for (let i = 0; i < nw; i++) {
    const wx = x + (i + .5) * w / nw - 28;
    o += `<rect x="${wx}" y="${y - h + 40}" width="56" height="70" rx="8" fill="#bfe7ff" stroke="${OL}" stroke-width="6"/><path d="M${wx + 28},${y - h + 40} V${y - h + 110}" stroke="${OL}" stroke-width="5"/>`;
  }
  if (r() > .3) o += `<rect x="${x + w / 2 - 30}" y="${y - 110}" width="60" height="110" rx="10" fill="#8d5a3b" stroke="${OL}" stroke-width="6"/>`;
  return o;
}
function tree(x, y, s, col = '#ffd23f') {
  return G(`translate(${x},${y}) scale(${s})`, `<rect x="-14" y="-120" width="28" height="120" fill="#8d5a3b" stroke="${OL}" stroke-width="6"/><circle cx="0" cy="-170" r="90" fill="${col}" stroke="${OL}" stroke-width="7"/><circle cx="-50" cy="-130" r="60" fill="${col}" stroke="${OL}" stroke-width="7"/><circle cx="55" cy="-135" r="58" fill="${col}" stroke="${OL}" stroke-width="7"/><path d="M-60,-150 Q-40,-170 -20,-150" stroke="#fff" stroke-width="7" opacity=".5" fill="none"/>`);
}
function ground(y, t, col = '#f6e2b8', wave = '#ecd09a') {
  let o = `<rect x="-400" y="${y}" width="${W + 800}" height="${H - y + 600}" fill="${col}"/>`;
  for (let i = 0; i < 9; i++) {
    const yy = y + 80 + i * 120;
    o += `<path d="M-400,${yy} q60,-24 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0" stroke="${wave}" stroke-width="18" fill="none" stroke-linecap="round" opacity=".8"/>`;
  }
  const r = rng(11);
  for (let i = 0; i < 14; i++) { const gx = r() * W, gy = y + 30 + r() * (H - y); o += `<path d="M${gx},${gy} l-10,-26 M${gx},${gy} l0,-32 M${gx},${gy} l10,-26" stroke="#7cc287" stroke-width="7" stroke-linecap="round"/>`; }
  return o;
}
function village(t, o = {}) {
  const gy = o.gy || 1180;
  let s = `<rect x="-400" y="-400" width="${W + 800}" height="${H + 800}" fill="url(#sky)"/>`;
  s += `<circle cx="860" cy="260" r="260" fill="url(#sunGlow)"/><circle cx="860" cy="260" r="80" fill="#fff8d0"/>`;
  s += cloud(160 + t * 12, 200, 1) + cloud(700 + t * 8, 420, .7) + cloud(-100 + t * 10, 560, .8);
  s += `<path d="M-400,${gy - 220} Q100,${gy - 480} 520,${gy - 300} Q860,${gy - 520} 1480,${gy - 260} V${gy} H-400Z" fill="#a8dba0"/>`;
  s += `<path d="M-400,${gy - 140} Q300,${gy - 330} 700,${gy - 190} Q1000,${gy - 300} 1480,${gy - 160} V${gy} H-400Z" fill="#88c98a"/>`;
  // casas coloridas
  const walls = ['#ffb4a2', '#ffd88a', '#a8d8ff', '#c7b8ff', '#ffe9c7', '#b5ead7'], roofs = ['#e86a4f', '#5b7bd5', '#e86a4f', '#7a5bd5'];
  let hx = -220;
  for (let i = 0; i < 9; i++) { const w = 200 + (i * 37) % 90, h = 210 + (i * 53) % 120; s += house(hx, gy, w, h, walls[i % 6], roofs[i % 4], i); hx += w + 26; }
  // igrejinha
  s += `<rect x="610" y="${gy - 520}" width="120" height="270" fill="#fff" stroke="${OL}" stroke-width="${SW}"/><path d="M600,${gy - 520} L670,${gy - 640} L740,${gy - 520}Z" fill="#5b7bd5" stroke="${OL}" stroke-width="${SW}"/><path d="M670,${gy - 690} V${gy - 640} M650,${gy - 670} H690" stroke="${OL}" stroke-width="9"/><circle cx="670" cy="${gy - 450}" r="26" fill="#ffd23f" stroke="${OL}" stroke-width="6"/>`;
  s += tree(60, gy + 10, 1) + tree(1010, gy + 20, 1.1, '#a3d65c');
  if (o.bunting) {
    s += `<path d="M-50,${gy - 560} Q540,${gy - 420} 1130,${gy - 560}" stroke="${OL}" stroke-width="5" fill="none"/>`;
    const cols = ['#ff5a5f', '#ffd23f', '#3ec1d3', '#6c5ce7', '#2fae7f'];
    for (let i = 0; i < 14; i++) { const x = -20 + i * 84, yy = gy - 560 + 140 * Math.sin(Math.PI * (x + 50) / 1180) * .98; s += `<path d="M${x},${yy} L${x + 60},${yy + 4} L${x + 28},${yy + 70}Z" fill="${cols[i % 5]}" stroke="${OL}" stroke-width="4"/>`; }
  }
  s += ground(gy, t);
  return s;
}
function yard(t) {
  const gy = 1150;
  let s = `<rect x="-400" y="-400" width="${W + 800}" height="${H + 800}" fill="url(#sky)"/>`;
  s += `<circle cx="200" cy="300" r="240" fill="url(#sunGlow)"/>` + cloud(700 + t * 10, 260, .9) + cloud(200 + t * 6, 520, .6);
  s += `<path d="M-400,${gy - 200} Q300,${gy - 420} 1480,${gy - 220} V${gy} H-400Z" fill="#9fd39a"/>`;
  // galinheiro
  s += `<rect x="620" y="${gy - 400}" width="380" height="330" fill="#e07a5f" stroke="${OL}" stroke-width="${SW}"/><path d="M590,${gy - 400} L810,${gy - 580} L1030,${gy - 400}Z" fill="#8d5a3b" stroke="${OL}" stroke-width="${SW}"/><rect x="760" y="${gy - 240}" width="100" height="170" rx="50" fill="#5a3720" stroke="${OL}" stroke-width="6"/>`;
  // cerca
  for (let i = 0; i < 12; i++) s += `<rect x="${-60 + i * 100}" y="${gy - 200}" width="50" height="200" rx="10" fill="#f2d3a6" stroke="${OL}" stroke-width="6"/>`;
  s += `<rect x="-100" y="${gy - 160}" width="${W + 200}" height="30" fill="#e8c08c" stroke="${OL}" stroke-width="6"/>`;
  s += ground(gy, t, '#f7dc8f', '#eec970');
  return s;
}
function kitchen(t, o = {}) {
  let s = `<rect x="-400" y="-400" width="${W + 800}" height="${H + 800}" fill="url(#tiles)"/>`;
  s += `<rect x="-400" y="1300" width="${W + 800}" height="1200" fill="url(#check)"/>`;
  s += `<rect x="90" y="300" width="360" height="300" rx="20" fill="#bfe7ff" stroke="${OL}" stroke-width="${SW}"/><path d="M270,300 V600 M90,450 H450" stroke="${OL}" stroke-width="7"/><path d="M70,290 Q160,420 110,620 L70,620Z M470,290 Q380,420 430,620 L470,620Z" fill="#ff8fab" stroke="${OL}" stroke-width="6"/>`;
  s += `<circle cx="800" cy="300" r="70" fill="#fff" stroke="${OL}" stroke-width="7"/><path d="M800,300 V255 M800,300 L835,315" stroke="${OL}" stroke-width="7" stroke-linecap="round"/>`;
  s += `<rect x="560" y="520" width="420" height="24" fill="#c98b5b" stroke="${OL}" stroke-width="6"/><rect x="600" y="440" width="60" height="80" rx="10" fill="#ff9f1c" stroke="${OL}" stroke-width="6"/><rect x="690" y="460" width="50" height="60" rx="10" fill="#3ec1d3" stroke="${OL}" stroke-width="6"/>`;
  return s;
}
function fridge(x, y, open, t, eggKind = 'white') {
  // porta abre (open 0..1)
  let s = `<rect x="${x}" y="${y}" width="420" height="860" rx="40" fill="#f3f3ee" stroke="${OL}" stroke-width="${SW}"/>`;
  if (open > 0) {
    s += `<rect x="${x + 22}" y="${y + 22}" width="376" height="816" rx="26" fill="#e4f6ff" stroke="${OL}" stroke-width="5"/>`;
    for (let r = 0; r < 4; r++) {
      const sy = y + 200 + r * 190;
      s += `<rect x="${x + 22}" y="${sy}" width="376" height="14" fill="#c9e6f2" stroke="${OL}" stroke-width="4"/>`;
      for (let c = 0; c < 5; c++) s += egg(x + 70 + c * 70, sy - 46, .58, eggKind, (c * 13 % 9) - 4);
    }
    // porta (encurta conforme abre)
    const dw = 420 * (1 - open) + 60 * open;
    s += `<rect x="${x + 420 - (open > .5 ? -10 : 0) - (open > .5 ? 0 : dw)}" y="${y}" width="${dw}" height="860" rx="30" fill="#ffffff" stroke="${OL}" stroke-width="${SW}" transform="${open > .5 ? `translate(${0},0)` : ''}"/>`;
  } else {
    s += `<path d="M${x},${y + 300} H${x + 420}" stroke="${OL}" stroke-width="6"/><rect x="${x + 340}" y="${y + 120}" width="24" height="120" rx="12" fill="#bbb" stroke="${OL}" stroke-width="5"/><rect x="${x + 340}" y="${y + 360}" width="24" height="160" rx="12" fill="#bbb" stroke="${OL}" stroke-width="5"/>`;
    s += `<circle cx="${x + 110}" cy="${y + 140}" r="30" fill="#ff5a5f" stroke="${OL}" stroke-width="5"/><rect x="${x + 160}" y="${y + 410}" width="70" height="90" fill="#ffd23f" stroke="${OL}" stroke-width="5" transform="rotate(-8 ${x + 190} ${y + 450})"/>`;
  }
  return s;
}
function studio(t) {
  let s = `<rect x="-400" y="-400" width="${W + 800}" height="${H + 800}" fill="url(#foam)"/>`;
  const on = Math.sin(t * 6) > -.6;
  s += `<rect x="330" y="230" width="420" height="140" rx="30" fill="${on ? '#ff3b3b' : '#a83232'}" stroke="${OL}" stroke-width="${SW}"/><text x="540" y="332" text-anchor="middle" font-family="Lilita One" font-size="96" fill="#fff">NO AR</text>`;
  if (on) s += `<rect x="310" y="210" width="460" height="180" rx="40" fill="#ff3b3b" opacity=".25" filter="url(#soft)"/>`;
  s += `<rect x="-400" y="1350" width="${W + 800}" height="900" fill="#8d5a3b" stroke="${OL}" stroke-width="${SW}"/><rect x="-400" y="1350" width="${W + 800}" height="40" fill="#a86d48"/>`;
  return s;
}
function mic(x, y, s = 1) {
  return G(`translate(${x},${y}) scale(${s})`, `<path d="M0,0 V180" stroke="${OL}" stroke-width="18"/><rect x="-70" y="170" width="140" height="30" rx="12" fill="#444" stroke="${OL}" stroke-width="6"/><rect x="-55" y="-150" width="110" height="170" rx="55" fill="#5a5a6e" stroke="${OL}" stroke-width="${SW}"/><path d="M-40,-100 H40 M-40,-60 H40 M-40,-20 H40" stroke="#8a8aa0" stroke-width="8"/>`);
}
function hill(t) {
  let s = `<rect x="-400" y="-400" width="${W + 800}" height="${H + 800}" fill="url(#sky)"/>` + cloud(300 + t * 10, 300, 1) + cloud(850 + t * 6, 520, .7);
  s += `<path d="M-400,700 Q100,520 400,760 Q800,1100 1480,1320 V2400 H-400Z" fill="#7cc287" stroke="${OL}" stroke-width="${SW}"/>`;
  s += `<path d="M-400,1500 Q500,1300 1480,1650 V2400 H-400Z" fill="#a8dba0"/>`;
  s += house(780, 1500, 220, 220, '#ffd88a', '#e86a4f', 2) + tree(80, 760, .9, '#a3d65c');
  return s;
}
function crowd(t, n, y, s, seed = 1, o = {}) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = (i + .5) / n * (W + 160) - 80 + ((i % 2) * 30);
    out += villager(seed + i, t, { x, y: y + (i % 2) * 40, s, arms: o.arms || 'down', look: o.look, eyes: o.eyes, mouth: o.mouth, bobHz: o.bobHz || 1.4, bobAmp: o.bobAmp ?? 7, flip: o.flip, brows: o.brows });
  }
  return out;
}
function calc(x, y, s, display, t, press = -1) {
  let o = `<rect x="-300" y="-430" width="600" height="860" rx="60" fill="#5b4bd5" stroke="${OL}" stroke-width="${SW * 1.5}"/>`;
  o += `<rect x="-240" y="-370" width="480" height="190" rx="30" fill="#dff7d8" stroke="${OL}" stroke-width="9"/>`;
  o += `<text x="0" y="-235" text-anchor="middle" font-family="Lilita One" font-size="${display.length > 7 ? 98 : 140}" fill="${OL}">${display}</text>`;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    const bx = -225 + c * 120, by = -130 + r * 130, cc = c === 3 ? '#ffb703' : (r === 3 && c === 0 ? '#ff5a5f' : '#fff8ec');
    const pr = press === r * 4 + c ? 8 : 0;
    o += `<rect x="${bx}" y="${by + pr}" width="90" height="100" rx="20" fill="${cc}" stroke="${OL}" stroke-width="8"/>`;
  }
  return G(`translate(${x},${y}) scale(${s})`, o);
}
function cake(x, y, s, t) {
  return G(`translate(${x},${y}) scale(${s})`, `<rect x="-220" y="-120" width="440" height="120" rx="20" fill="#ff8fab" stroke="${OL}" stroke-width="${SW}"/><rect x="-170" y="-230" width="340" height="110" rx="20" fill="#ffd6e0" stroke="${OL}" stroke-width="${SW}"/><rect x="-110" y="-330" width="220" height="100" rx="20" fill="#ff8fab" stroke="${OL}" stroke-width="${SW}"/><path d="M-220,-90 q36,30 73,0 t73,0 t73,0 t73,0 t73,0 t73,0" stroke="#fff" stroke-width="14" fill="none"/><path d="M0,-330 V-390" stroke="${OL}" stroke-width="12"/><path d="M0,-420 Q16,-396 0,-386 Q-16,-396 0,-420Z" fill="#ffb703" stroke="${OL}" stroke-width="5"/>`);
}
function oven(x, y, s, t, open = 0) {
  return G(`translate(${x},${y}) scale(${s})`, `<rect x="-260" y="-520" width="520" height="520" rx="40" fill="#9aa5b1" stroke="${OL}" stroke-width="${SW}"/><rect x="-200" y="-380" width="400" height="280" rx="30" fill="#2a2233" stroke="${OL}" stroke-width="${SW}"/><rect x="-170" y="-350" width="340" height="220" rx="20" fill="${open ? '#3a2f45' : '#ff9f1c'}" opacity=".7"/><circle cx="-150" cy="-460" r="26" fill="#fff" stroke="${OL}" stroke-width="6"/><circle cx="-70" cy="-460" r="26" fill="#fff" stroke="${OL}" stroke-width="6"/><rect x="40" y="-480" width="170" height="40" rx="10" fill="#dff7d8" stroke="${OL}" stroke-width="6"/><circle cx="-180" cy="30" r="40" fill="#444" stroke="${OL}" stroke-width="6"/><circle cx="180" cy="30" r="40" fill="#444" stroke="${OL}" stroke-width="6"/>`);
}
function receipt(x, y, s, rot, txt = 'FIADO') {
  return G(`translate(${x},${y}) rotate(${rot}) scale(${s})`, `<path d="M-90,-120 H90 V110 l-15,15 l-15,-15 l-15,15 l-15,-15 l-15,15 l-15,-15 l-15,15 l-15,-15 l-15,15 l-15,-15 l-15,15 l-15,-15 Z" fill="#fff" stroke="${OL}" stroke-width="7"/><text x="0" y="-60" text-anchor="middle" font-family="Lilita One" font-size="44" fill="#e63946">${txt}</text><path d="M-60,-20 H60 M-60,20 H40 M-60,60 H50" stroke="#bbb" stroke-width="10" stroke-linecap="round"/>`);
}
function hammer(x, y, rot, s = 1) {
  return G(`translate(${x},${y}) rotate(${rot}) scale(${s})`, `<rect x="-18" y="0" width="36" height="320" rx="14" fill="#c98b5b" stroke="${OL}" stroke-width="${SW}"/><rect x="-90" y="-60" width="180" height="80" rx="14" fill="#8a94a6" stroke="${OL}" stroke-width="${SW}"/>`);
}
function tractor(x, y, s, t, flat = 0) {
  const w = t * 400;
  const wheel = (cx, cy, r, sq) => G(`translate(${cx},${cy}) scale(1,${1 - sq})`, `<circle r="${r}" fill="#333" stroke="${OL}" stroke-width="${SW}"/><circle r="${r * .45}" fill="#ffd23f" stroke="${OL}" stroke-width="6"/><path d="M0,${-r * .45} V${r * .45}" stroke="${OL}" stroke-width="6" transform="rotate(${w})"/>`);
  return G(`translate(${x},${y}) scale(${s})`, `<rect x="-260" y="-330" width="300" height="200" rx="20" fill="#2fae7f" stroke="${OL}" stroke-width="${SW}"/><rect x="-200" y="-520" width="200" height="200" rx="16" fill="#bfe7ff" stroke="${OL}" stroke-width="${SW}"/><rect x="20" y="-260" width="260" height="130" rx="20" fill="#2fae7f" stroke="${OL}" stroke-width="${SW}"/><rect x="200" y="-380" width="30" height="130" fill="#555" stroke="${OL}" stroke-width="6"/>` + wheel(-150, -140, 140, flat * .35) + wheel(200, -80, 80, 0));
}
function basket(x, y, s, fill, t) {
  let eggs = '';
  const n = Math.floor(fill * 14);
  for (let i = 0; i < n; i++) eggs += egg(-130 + (i % 5) * 65, -60 - Math.floor(i / 5) * 55, .62, 'gold', (i * 23) % 30 - 15, t + i);
  return G(`translate(${x},${y}) scale(${s})`, eggs + `<path d="M-190,-70 H190 L150,110 H-150Z" fill="#d9a066" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M-170,-10 H170 M-160,50 H160" stroke="#b07a45" stroke-width="10"/><path d="M-150,-70 Q0,-300 150,-70" stroke="${OL}" stroke-width="30" fill="none"/><path d="M-150,-70 Q0,-300 150,-70" stroke="#d9a066" stroke-width="16" fill="none"/>`);
}
function pan(x, y, s, content) {
  return G(`translate(${x},${y}) scale(${s})`, `<rect x="150" y="-24" width="230" height="48" rx="24" fill="#2a2233"/><ellipse cx="0" cy="0" rx="190" ry="70" fill="#3a3a4a" stroke="${OL}" stroke-width="${SW}"/><ellipse cx="0" cy="-8" rx="160" ry="50" fill="#555566"/>` + (content || ''));
}
function omelete() { return `<path d="M-120,-10 Q-110,-60 -40,-50 Q0,-80 50,-50 Q120,-60 120,-5 Q100,30 0,25 Q-100,30 -120,-10Z" fill="#ffd23f" stroke="${OL}" stroke-width="6"/><circle cx="-30" cy="-20" r="10" fill="#7cc287"/><circle cx="40" cy="-10" r="8" fill="#ff5a5f"/>`; }
