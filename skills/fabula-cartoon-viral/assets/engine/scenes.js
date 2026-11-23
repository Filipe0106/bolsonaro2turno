// ===== Roteiro visual: "Lia Ovo-Branco" =====
// Cada shot: [inicio, funcaoCena, camera(lt,dur) -> {x,y,s}, opcoes]
const C0 = { x: 540, y: 960, s: 1 };
const push = (a, b) => (lt, d) => { const k = E.inOut(clamp(lt / d)); return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), s: lerp(a.s, b.s, k) }; };
const still = c => () => c;
// "punch" (corte seco de enquadramento dentro do mesmo plano) em tempo absoluto
const punch = (list) => (lt, d, T) => { let c = list[0][1]; for (const [t, cc] of list) if (T >= t) c = cc; const k = E.inOut(clamp(lt / d)); return { x: c.x, y: c.y, s: c.s * (1 + .03 * k) }; };

const SH = [];
const shot = (t0, fn, cam, opt = {}) => SH.push({ t0, fn, cam, opt });

// 1. HOOK — vila com ovo de ouro caindo
shot(0, (T) => {
  const y = -100 + Math.min(T, 1.9) * 620;
  return village(T) + egg(540, y, 1.25, 'gold', T * 140, T) + `<g opacity=".9">${star4(600, y - 80, .5, T * 200)}${star4(470, y - 140, .35, T * 160)}</g>`;
}, push({ x: 540, y: 820, s: 1.05 }, { x: 540, y: 1000, s: 1.18 }));
shot(1.9, (T) => {
  const k = popS(T, 2.55, .25);
  return village(T) + hen({ x: 560, y: 1500, s: 1.6, col: '#c0723a', wing: '#a85d2c', tail: '#8c4a20', eye: T > 2.5 ? 'wide' : 'open' }, T)
    + (k > 0 ? egg(700, 1440, 1.05 * k, 'gold', -10, T) : '') + sparkles(700, 1430, T, 2.6, 8, 150);
}, push({ x: 560, y: 1200, s: 1.25 }, { x: 600, y: 1260, s: 1.35 }));
// 2. Seu Zé — galinha espirra
shot(3.4, (T) => {
  const sn = T > 4.45 && T < 4.75;
  const k = popS(T, 5.1, .25);
  return village(T) + person({ ...CAST.ze, x: 330, y: 1700, s: 1.05, arms: 'hold', eyes: T > 5.1 ? 'wide' : 'open', mouth: T > 5.1 ? 'o' : 'smile', look: [1, 0] }, T)
    + hen({ x: 700, y: 1610, s: 1.15, col: '#f5f0e6', eye: sn ? 'tight' : (T > 5.1 ? 'wide' : 'open'), shake: sn ? 6 : 0 }, T)
    + (sn ? stamp(560, 1150, 'ATCHIM!', T, 4.45, { fs: 110, fill: '#fff', rot: 8 }) : '')
    + (k > 0 ? egg(600, 1560, k * .95, 'gold', 15, T) : '') + sparkles(600, 1540, T, 5.1, 8, 150);
}, push({ x: 540, y: 1200, s: 1.12 }, { x: 560, y: 1250, s: 1.22 }));
shot(5.8, (T) => village(T) + person({ ...CAST.ze, x: 540, y: 2150, s: 1.6, arms: 'hold', eyes: 'happy', mouth: 'laugh', hand: egg(0, -240, 1, 'gold', 0, T) }, T)
  + sparkles(540, 1770, T, 5.85, 8, 200) + stamp(540, 520, 'PLIM!', T, 5.9, { fs: 170 }), push({ x: 540, y: 1150, s: 1.0 }, { x: 540, y: 1120, s: 1.08 }));
// 3. Padeiro — galinha tropeça, dois ovos
shot(7.2, (T) => {
  const trip = prog(T, 7.95, 8.5);
  const rot = trip > 0 ? -70 * E.out(trip) : 0;
  return village(T) + person({ ...CAST.pad, x: 300, y: 1720, s: .95, arms: T > 8 ? 'face' : 'down', eyes: T > 8.1 ? 'wide' : 'open', mouth: T > 8.1 ? 'o' : 'smile', look: [1, .5] }, T)
    + `<path d="M520,1640 l120,-10" stroke="#c98b5b" stroke-width="40" stroke-linecap="round"/><path d="M520,1640 l120,-10" stroke="${OL}" stroke-width="6" fill="none"/>`
    + G(`rotate(${rot} 720 1640)`, hen({ x: 720 + trip * 60, y: 1640, s: 1.1, col: '#e9c46a', eye: trip > 0 ? 'wide' : 'open' }, T))
    + (trip > 0 && trip < 1 ? motionLines(640, 1500, T, -1) : '');
}, push({ x: 540, y: 1250, s: 1.1 }, { x: 600, y: 1300, s: 1.2 }));
shot(8.95, (T) => {
  const k1 = popS(T, 9.0, .22), k2 = popS(T, 9.55, .22);
  return village(T) + hen({ x: 540, y: 1650, s: 1.45, col: '#e9c46a', eye: 'wide' }, T)
    + (k1 > 0 ? egg(380, 1600, k1 * 1.1, 'gold', -15, T) : '') + (k2 > 0 ? egg(720, 1600, k2 * 1.1, 'gold', 15, T) : '')
    + sparkles(380, 1580, T, 9.0, 7, 140) + sparkles(720, 1580, T, 9.55, 7, 140) + pill(540, 560, 'x2', T, 10.24, { fs: 160, w: 300, col: '#ff5a1f' });
}, punch([[8.95, { x: 540, y: 1300, s: 1.15 }], [10.2, { x: 540, y: 1150, s: 1.0 }]]));
// 4. Galo leva susto
shot(11.3, (T) => {
  const jump = T > 12.6 && T < 13.5 ? Math.sin(prog(T, 12.6, 13.5) * Math.PI) * 220 : 0;
  const k = popS(T, 13.9, .25);
  return yard(T) + (k > 0 ? egg(540, 1660, k * 1.1, 'gold', 0, T) : '')
    + hen({ x: 560, y: 1700 - jump - (k > 0 ? 90 : 0), s: 1.45, rooster: 1, col: '#fff1e0', eye: T > 12.6 ? 'wide' : 'open', look: T > 13.9 ? 1 : 0 }, T)
    + (T > 12.6 && T < 13.6 ? stamp(800, 860, '!', T, 12.62, { fs: 260, fill: '#ff5a5f', rot: 10 }) : '') + sparkles(540, 1640, T, 13.9, 8, 170);
}, punch([[11.3, { x: 540, y: 1250, s: 1.05 }], [13.85, { x: 540, y: 1400, s: 1.3 }]]));
// 5. Apresentação: Lia
shot(14.5, (T) => village(T) + person({ ...CAST.lia, x: 540, y: 2050, s: 1.75, arms: 'hips', eyes: 'half', mouth: 'flat', look: [0, 0] }, T)
  + pill(300, 520, 'LIA', T, 15.15, { fs: 120, w: 300 }), push({ x: 540, y: 1100, s: 1.0 }, { x: 540, y: 1080, s: 1.07 }));
shot(16.05, (T) => village(T) + person({ ...CAST.lia, x: 420, y: 2050, s: 1.6, arms: 'hold', eyes: 'half', mouth: 'flat', look: [1, 0] }, T)
  + hen({ x: 640, y: 1700, s: 1.2, col: '#ffffff', tuft: 1, bow: 1, eye: 'half' }, T) + pill(760, 600, 'PENOSA', T, 16.9, { fs: 100, rot: 4 }),
  push({ x: 540, y: 1100, s: 1.0 }, { x: 560, y: 1120, s: 1.08 }));
// 6. Penosa faz força
shot(17.95, (T) => {
  const f = prog(T, 20.0, 20.9);
  return yard(T) + hen({ x: 600, y: 1750, s: 2.4, col: '#ffffff', tuft: 1, bow: 1, eye: 'tight', blush: .2 + f * .6, shake: T > 20 ? 4 + f * 8 : (T > 18.9 ? 1.5 : 0) }, T)
    + sweat(360, 1150, T) + (T > 20 ? sweat(820, 1100, T + .5) + motionLines(230, 1300, T, -1, 3) + motionLines(960, 1300, T, 1, 3) : '');
}, push({ x: 560, y: 1300, s: 1.0 }, { x: 560, y: 1300, s: 1.22 }), { shake: T => T > 20 && T < 21 ? 10 : 0 });
// 7. ... e sai: um ovo branco
shot(21.1, (T) => {
  const k = popS(T, 21.35, .25);
  return yard(T) + hen({ x: 640, y: 1600, s: 1.6, col: '#ffffff', tuft: 1, bow: 1, eye: T > 22.1 ? 'half' : 'tight' }, T)
    + (k > 0 ? egg(380, 1560, k * 1.1, 'white', -6) : '') + (T > 22.1 ? `<text x="300" y="1350" font-family="Lilita One" font-size="90" fill="${OL}" opacity=".7">...</text>` : '');
}, punch([[21.1, { x: 540, y: 1250, s: 1.05 }], [22.05, { x: 420, y: 1480, s: 1.75 }]]), { desat: T => T > 22.05 ? .55 : 0 });
// 8. Todo santo dia (calendário)
shot(23.35, (T) => {
  const day = 1 + Math.floor(prog(T, 23.4, 24.8) * 29);
  let s = `<rect x="-400" y="-400" width="1880" height="2800" fill="#ffe9c7"/>`;
  s += G(`translate(540,900) rotate(-3)`, `<rect x="-330" y="-380" width="660" height="760" rx="40" fill="#fff" stroke="${OL}" stroke-width="10"/><rect x="-330" y="-380" width="660" height="170" rx="40" fill="#ff5a5f" stroke="${OL}" stroke-width="10"/><text x="0" y="-262" text-anchor="middle" font-family="Lilita One" font-size="90" fill="#fff">DIA</text><text x="0" y="120" text-anchor="middle" font-family="Lilita One" font-size="330" fill="${OL}">${day}</text>`);
  for (let i = 0; i < Math.min(day, 24); i++) s += egg(140 + (i % 8) * 115, 1560 - Math.floor(i / 8) * 95, .8, 'white', (i * 17) % 20 - 10);
  return s;
}, push({ x: 540, y: 1000, s: 1.0 }, { x: 540, y: 1000, s: 1.06 }));
// 9. "Lia Ovo-Branco" — vizinhos rindo
shot(24.9, (T) => village(T) + crowd(T, 4, 1820, .95, 20, { mouth: 'laugh', eyes: 'happy', arms: 'out', bobHz: 3, bobAmp: 12 })
  + person({ ...CAST.lia, x: 540, y: 1540, s: 1.15, arms: 'down', eyes: 'half', mouth: 'frown', look: [-1, 0] }, T)
  + stamp(540, 600, 'OVO-BRANCO', T, 26.7, { fs: 112, fill: '#fff8ec', rot: -5 }),
  push({ x: 540, y: 1150, s: 1.0 }, { x: 540, y: 1200, s: 1.12 }));
// 10. Cozinha — mãe abre a geladeira
shot(28.0, (T) => {
  const op = E.out(prog(T, 29.8, 30.3));
  return kitchen(T) + fridge(560, 640, op, T) + person({ ...CAST.mae, x: 330, y: 1720, armR: T > 29.6 ? 'out' : 'down', armL: 'hips', eyes: 'open', mouth: 'smile', look: [1, 0] }, T);
}, push({ x: 540, y: 1100, s: 1.0 }, { x: 600, y: 1080, s: 1.1 }));
shot(30.8, (T) => kitchen(T) + fridge(330, 560, 1, T), push({ x: 540, y: 1000, s: 1.35 }, { x: 540, y: 980, s: 1.5 }), { desat: () => .35 });
// 11. Mãe ri: "pelo menos dá omelete"
shot(32.5, (T) => {
  const laugh = T > 33.7;
  return kitchen(T) + person({ ...CAST.lia, x: 300, y: 1900, s: 1.1, eyes: 'half', mouth: 'flat', look: [1, -.4] }, T)
    + person({ ...CAST.mae, x: 720, y: 1900, s: 1.2, eyes: laugh ? 'happy' : 'open', mouth: laugh ? 'laugh' : 'smile', armL: 'hold', armR: T > 35.2 ? 'out' : 'hips', bobHz: laugh ? 3 : 1.4, bobAmp: laugh ? 12 : 7, look: [-1, 0] }, T)
    + `<rect x="-400" y="1650" width="1880" height="500" fill="url(#ging)" stroke="${OL}" stroke-width="${SW}"/>`
    + (T > 35.25 ? G(`translate(0,${(1 - popS(T, 35.25, .3)) * 200})`, pan(560, 1680, 1, omelete())) : '');
}, punch([[32.5, { x: 540, y: 1250, s: 1.0 }], [34.2, { x: 640, y: 1250, s: 1.25 }], [35.25, { x: 560, y: 1450, s: 1.15 }]]));
// 12. Prefeito no rádio
shot(36.9, (T) => studio(T) + person({ ...CAST.pref, x: 430, y: 1950, s: 1.25, armL: T > 38.1 ? 'up' : 'hips', armR: 'hold', eyes: 'open', mouth: T > 37.3 ? 'open' : 'smile', look: [1, 0] }, T) + mic(800, 1330, 1.0),
  push({ x: 540, y: 1100, s: 1.0 }, { x: 540, y: 1120, s: 1.1 }));
shot(39.65, (T) => {
  return village(T, { bunting: 1 }) + pill(540, 420, 'SÁBADO', T, 39.7, { fs: 110 }) + G(`translate(540,1500) scale(${popS(T, 40.8, .35)})`, cake(0, 0, 1.4, T))
    + stamp(540, 820, 'O MAIOR BOLO', T, 40.85, { fs: 120, sub: 'DO MUNDO!' }) + sparkles(540, 1200, T, 41.0, 10, 300);
}, push({ x: 540, y: 1000, s: 1.0 }, { x: 540, y: 1000, s: 1.08 }));
// 13. A conta
shot(42.6, (T) => {
  const disp = T > 46.45 ? '1.000.000' : T > 44.1 ? '1.000' : '0';
  const press = Math.floor(T * 6) % 16;
  return `<rect x="-400" y="-400" width="1880" height="2800" fill="#ffd6a5"/>` + calc(540, 1000, 1.25, disp, T, press)
    + G(`translate(${700 + Math.sin(T * 12) * 20},${1150 + Math.abs(Math.sin(T * 12)) * 30}) rotate(-30)`, `<path d="M0,0 L0,-140" stroke="${OL}" stroke-width="64" stroke-linecap="round"/><path d="M0,0 L0,-140" stroke="#f2c4a0" stroke-width="48" stroke-linecap="round"/><rect x="-60" y="0" width="120" height="400" rx="50" fill="#f2c4a0" stroke="${OL}" stroke-width="${SW}"/>`)
    + (T > 44.1 ? egg(220, 520, .9 * popS(T, 44.1), 'gold', -10, T) : '') + sparkles(540, 640, T, 46.45, 10, 330);
}, punch([[42.6, { x: 540, y: 1000, s: 1.0 }], [44.1, { x: 540, y: 820, s: 1.3 }], [45.7, { x: 540, y: 1000, s: 1.05 }], [46.45, { x: 540, y: 760, s: 1.25 }]]));
// 14. Vila comemora
shot(47.9, (T) => village(T, { bunting: 1 }) + crowd(T, 5, 1500, .75, 40, { arms: 'up', eyes: 'happy', mouth: 'laugh', bobHz: 3.2, bobAmp: 18 })
  + crowd(T, 4, 1900, .95, 60, { arms: 'up', eyes: 'happy', mouth: 'laugh', bobHz: 3, bobAmp: 20 }) + confetti(T, 4, 70),
  push({ x: 540, y: 1150, s: 1.0 }, { x: 540, y: 1150, s: 1.1 }));
// 15. Padeiro compra forno no fiado
shot(50.0, (T) => {
  const ox = 520 + (1 - E.out(prog(T, 50.0, 51.4))) * 700;
  return village(T) + oven(ox + 160, 1720, 1.05, T) + person({ ...CAST.pad, x: ox - 260, y: 1740, s: .9, arms: 'out', eyes: 'happy', mouth: 'laugh' }, T)
    + receipt(780, 820, popS(T, 52.4) * 1.2, 10) + receipt(560, 760, popS(T, 52.6) * 1.0, -12) + receipt(330, 860, popS(T, 52.8) * 1.0, 6);
}, push({ x: 540, y: 1200, s: 1.0 }, { x: 540, y: 1200, s: 1.08 }));
// 16. DRAMA — "Só que ninguém lembrou de um detalhe"
shot(53.45, (T) => village(T, { bunting: 1 }) + `<rect x="-400" y="1450" width="1880" height="80" fill="#8d5a3b" stroke="${OL}" stroke-width="${SW}"/>` + egg(540, 1380, 1.3, 'gold', 0, T)
  + crowd(T, 4, 2300, 1.0, 80, { still: 1, eyes: 'open', mouth: 'flat', bobAmp: 0 }),
  push({ x: 540, y: 1300, s: 1.0 }, { x: 540, y: 1350, s: 1.6 }), { dark: () => .55 });
// 17. Ovo não quebra
shot(56.3, (T) => {
  const hit = T > 57.45;
  const ey = hit ? 1000 - Math.sin(prog(T, 57.45, 57.9) * Math.PI) * 80 : 700 + E.inOut(prog(T, 56.3, 57.45)) * 300;
  return `<rect x="-400" y="-400" width="1880" height="2800" fill="#ffe9c7"/>` + `<ellipse cx="540" cy="1250" rx="360" ry="90" fill="#ff9f1c" stroke="${OL}" stroke-width="${SW}"/><path d="M180,1250 Q540,1640 900,1250" fill="#ffb347" stroke="${OL}" stroke-width="${SW}"/>`
    + (hit ? `<path d="M420,1200 l30,40 l-20,30 l30,40 M640,1190 l-20,50 l30,30" stroke="${OL}" stroke-width="8" fill="none"/>` : '')
    + egg(540, ey, 1.5, 'gold', 0, T) + sparkles(540, 1080, T, 57.47, 8, 200) + stamp(540, 420, 'NÃO QUEBRA', T, 57.6, { fs: 130, fill: '#ff5a5f' });
}, push({ x: 540, y: 1000, s: 1.0 }, { x: 540, y: 1000, s: 1.1 }), { shake: T => T > 57.45 && T < 57.75 ? 14 : 0 });
// 18. Martelo
shot(58.9, (T) => {
  const sw = prog(T, 59.25, 59.6), rebound = T > 59.6 ? E.out(prog(T, 59.6, 60.3)) : 0;
  const rot = T < 59.6 ? -80 + 80 * E.inOut(sw) - 0 : -0 - rebound * 220;
  return village(T) + `<rect x="160" y="1500" width="760" height="70" rx="20" fill="#8d5a3b" stroke="${OL}" stroke-width="${SW}"/>` + egg(540, 1430, 1.0, 'gold', 0, T)
    + hammer(560 + rebound * 300, 1300 - rebound * 600, rot, 1.2) + sparkles(540, 1380, T, 59.6, 10, 180, '#fff')
    + (T > 59.6 ? stamp(560, 600, 'CLANG!', T, 59.6, { fs: 150, fill: '#cfd8e6' }) : '');
}, punch([[58.9, { x: 540, y: 1250, s: 1.1 }], [60.7, { x: 540, y: 1300, s: 1.7 }]]), { shake: T => T > 59.6 && T < 59.9 ? 18 : 0 });
// 19. Jogaram do morro: quica 3 vezes
shot(61.5, (T) => {
  const b = [63.1, 63.7, 64.2];
  let x, y;
  if (T < b[0]) { const k = prog(T, 61.6, b[0]); x = 120 + k * 260; y = 640 + (k * k) * 700 - Math.sin(k * Math.PI) * 300; }
  else { let i = T < b[1] ? 0 : T < b[2] ? 1 : 2; const st = b[i], en = i < 2 ? b[i + 1] : 65.1; const k = prog(T, st, en); const h = [380, 240, 140][i]; x = 380 + (i + k) * 190; y = 1340 + i * 70 - Math.sin(k * Math.PI) * h; }
  return hill(T) + egg(x, y, .9, 'gold', T * 500, T) + numBadge(330, 820, 1, T, b[0]) + numBadge(540, 860, 2, T, b[1]) + numBadge(750, 900, 3, T, b[2])
    + person({ ...CAST.pad, x: 160, y: 800, s: .55, arms: T < 61.7 ? 'up' : 'out', eyes: 'wide', mouth: 'o' }, T);
}, push({ x: 480, y: 1050, s: 1.15 }, { x: 560, y: 1200, s: 1.3 }));
// 20. Trator: fura o pneu
shot(65.1, (T) => {
  const tx = -500 + E.inOut(prog(T, 65.2, 66.65)) * 860;
  const flat = T > 66.65 ? 1 : 0;
  return village(T) + egg(560, 1720, 1.0, 'gold', 0, T) + tractor(T > 66.65 ? 360 + (T - 66.65) * 40 : tx, 1800, 1.05, T, flat)
    + (T > 66.65 ? stamp(540, 700, 'PÁÁ!', T, 66.65, { fs: 190, fill: '#ff5a5f', rot: 8 }) + G(`translate(220,1650)`, `<path d="M0,0 Q-60,-80 -120,-40 M0,0 Q-20,-110 -60,-140 M0,0 Q-90,-20 -150,10" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" opacity="${1 - prog(T, 66.65, 67.7)}"/>`) : '');
}, push({ x: 540, y: 1250, s: 1.0 }, { x: 540, y: 1300, s: 1.1 }), { shake: T => T > 66.65 && T < 66.95 ? 18 : 0 });
// 21. Mil ovos, nenhum bolo
shot(67.75, (T) => {
  let s = village(T) + `<rect x="-400" y="1550" width="1880" height="900" fill="#c79a6b" stroke="${OL}" stroke-width="${SW}"/>`;
  const r = rng(77);
  for (let i = 0; i < 60; i++) { const row = Math.floor(i / 12); s += egg(-20 + (i % 12) * 100 + (row % 2) * 50, 1560 - row * 70 + r() * 10, .8, 'gold', r() * 40 - 20, T + i); }
  s += `<rect x="640" y="1180" width="300" height="30" rx="10" fill="#fff" stroke="${OL}" stroke-width="${SW}"/><path d="M790,1210 V1500 M700,1500 H880" stroke="${OL}" stroke-width="18"/>`;
  s += stamp(540, 520, '0 BOLOS', T, 69.15, { fs: 150, fill: '#fff8ec' });
  return s;
}, punch([[67.75, { x: 540, y: 1150, s: 1.0 }], [69.1, { x: 780, y: 1180, s: 1.5 }]]));
// 22. Prefeito olha pro padeiro / padeiro olha pro forno
shot(70.6, (T) => village(T) + person({ ...CAST.pref, x: 540, y: 2050, s: 1.6, arms: 'hips', eyes: 'half', mouth: 'flat', look: T > 71.3 ? [1, 0] : [0, 0], noBlink: 1 }, T),
  push({ x: 540, y: 1100, s: 1.0 }, { x: 560, y: 1100, s: 1.06 }));
shot(72.45, (T) => village(T) + oven(820, 1900, .9, T, 1) + person({ ...CAST.pad, x: 380, y: 2050, s: 1.5, arms: 'down', eyes: 'half', mouth: 'flat', look: T > 73.2 ? [1, .3] : [0, 0], noBlink: 1 }, T),
  push({ x: 540, y: 1100, s: 1.0 }, { x: 560, y: 1100, s: 1.06 }));
// 23. A vila inteira olhou pra mim
shot(74.45, (T) => {
  const turned = T > 75.0;
  return village(T) + crowd(T, 5, 1500, .75, 90, { still: 1, bobAmp: 0, eyes: 'half', mouth: 'flat', look: turned ? [0, 1] : [-1, 0] })
    + crowd(T, 4, 1950, 1.0, 120, { bobAmp: 0, eyes: 'half', mouth: 'flat', look: turned ? [0, 1] : [1, 0] });
}, push({ x: 540, y: 1250, s: 1.0 }, { x: 540, y: 1250, s: 1.12 }));
shot(75.95, (T) => village(T) + `<rect x="-400" y="-400" width="1880" height="2800" fill="#140c20" opacity=".35"/><ellipse cx="540" cy="1500" rx="420" ry="900" fill="url(#spot)"/>`
  + person({ ...CAST.lia, x: 540, y: 1560, s: .95, arms: 'down', eyes: 'wide', mouth: 'o', still: 1, noBlink: 1 }, T)
  + hen({ x: 720, y: 1560, s: .7, col: '#fff', tuft: 1, bow: 1, eye: 'wide', still: 1 }, T),
  push({ x: 540, y: 1300, s: 1.0 }, { x: 540, y: 1250, s: 1.4 }));
// 24. O único ovo que quebrava
shot(77.25, (T) => {
  const glow = .6 + .4 * Math.sin(T * 5);
  return village(T) + `<circle cx="540" cy="760" r="${380 + glow * 40}" fill="url(#halo)"/>`
    + G(`translate(540,760) rotate(${T * 20})`, Array.from({ length: 12 }, (_, i) => `<path d="M0,0 L${Math.cos(i * Math.PI / 6) * 900},${Math.sin(i * Math.PI / 6) * 900} L${Math.cos(i * Math.PI / 6 + .12) * 900},${Math.sin(i * Math.PI / 6 + .12) * 900}Z" fill="#fff6c8" opacity=".35"/>`).join(''))
    + person({ ...CAST.lia, x: 540, y: 2150, s: 1.7, arms: 'up', armL: 'hips', eyes: 'open', mouth: 'smirk', look: [.8, -1], hand: egg(150, -480, 1.25, 'white', 0) }, T)
    + star4(760, 560, .8 + glow * .3, T * 90) + star4(380, 680, .5, -T * 70);
}, push({ x: 540, y: 1050, s: 1.0 }, { x: 540, y: 1000, s: 1.1 }));
// 25. CRÉC
shot(80.8, (T) => {
  const k = prog(T, 80.85, 81.1);
  return `<rect x="-400" y="-400" width="1880" height="2800" fill="#ffe9c7"/>` + `<ellipse cx="540" cy="1350" rx="360" ry="90" fill="#3ec1d3" stroke="${OL}" stroke-width="${SW}"/><path d="M180,1350 Q540,1740 900,1350" fill="#56d0e0" stroke="${OL}" stroke-width="${SW}"/>`
    + (k < 1 ? egg(540, 1000, 1.6, 'white', 0) : G('translate(540,1000)', `<path d="M-90,-20 L-60,-50 L-30,-20 L0,-50 L30,-20 L60,-50 L90,-20 C90,-100 50,-140 0,-140 C-50,-140 -90,-100 -90,-20Z" fill="url(#whiteEgg)" stroke="${OL}" stroke-width="9" transform="translate(-150,-${80 * prog(T, 81.1, 81.6)}) rotate(-25)"/><path d="M-90,0 L-60,-30 L-30,0 L0,-30 L30,0 L60,-30 L90,0 C90,80 50,110 0,110 C-50,110 -90,80 -90,0Z" fill="url(#whiteEgg)" stroke="${OL}" stroke-width="9" transform="translate(150,-${40 * prog(T, 81.1, 81.6)}) rotate(25)"/><ellipse cx="0" cy="${80 + 260 * E.out(prog(T, 81.1, 81.5))}" rx="70" ry="60" fill="#ffb703" stroke="${OL}" stroke-width="8"/>`))
    + stamp(540, 520, 'CRÉC!', T, 80.86, { fs: 220, fill: '#fff8ec' });
}, still({ x: 540, y: 1000, s: 1.05 }), { shake: T => T > 80.85 && T < 81.15 ? 16 : 0, flash: 80.85 });
// 26. Penosa celebridade
shot(81.95, (T) => {
  const fl = (Math.floor(T * 7) % 3 === 0);
  return village(T) + `<rect x="200" y="1700" width="680" height="60" rx="20" fill="#e63946" stroke="${OL}" stroke-width="${SW}"/>`
    + hen({ x: 540, y: 1700, s: 2.0, col: '#fff', tuft: 1, bow: 1, shades: 1, eye: 'open' }, T)
    + (fl ? `<circle cx="${200 + (Math.floor(T * 7) * 137) % 700}" cy="${900 + (Math.floor(T * 7) * 91) % 500}" r="120" fill="#fff" opacity=".85"/>` : '')
    + pill(540, 500, '★ CELEBRIDADE ★', T, 83.1, { fs: 86, col: '#e63946' }) + crowd(T, 4, 2150, .9, 140, { arms: 'up', eyes: 'happy', mouth: 'laugh', bobHz: 3, bobAmp: 14 });
}, push({ x: 540, y: 1150, s: 1.0 }, { x: 540, y: 1150, s: 1.1 }));
// 27. Fila na porta
shot(84.4, (T) => {
  let s = village(T) + house(700, 1400, 360, 380, '#ffe9c7', '#e86a4f', 5);
  for (let i = 7; i >= 0; i--) s += villager(200 + i, T, { x: 640 - i * 95, y: 1450 + i * 60, s: .55 + i * .06, eyes: 'open', mouth: 'smile', look: [1, 0], hand: i % 2 ? egg(60, -240, .7, 'white') : '' });
  return s;
}, push({ x: 540, y: 1150, s: 1.0 }, { x: 640, y: 1150, s: 1.15 }));
// 28. Prefeito paga ovo branco com ovo de ouro
shot(86.3, (T) => village(T) + person({ ...CAST.pref, x: 760, y: 1900, s: 1.15, armR: 'out', eyes: 'happy', mouth: 'smile', flip: 1, hand: egg(215, -300, .9, 'gold', 0, T) }, T)
  + person({ ...CAST.lia, x: 290, y: 1900, s: 1.1, armR: 'out', eyes: 'open', mouth: 'smirk', look: [1, 0], hand: egg(215, -300, .85, 'white', 0) }, T)
  + sparkles(540, 1600, T, 89.5, 8, 160), punch([[86.3, { x: 540, y: 1250, s: 1.0 }], [88.3, { x: 540, y: 1550, s: 1.5 }]]));
shot(89.1, (T) => village(T) + eggRain(T, 89.1, 9, 30) + basket(540, 1650, 1.6, prog(T, 89.3, 90.5), T),
  push({ x: 540, y: 1200, s: 1.0 }, { x: 540, y: 1300, s: 1.1 }));
// 29. Mãe com o cesto cheio
shot(90.6, (T) => village(T) + person({ ...CAST.mae, x: 600, y: 2000, s: 1.45, arms: 'hold', eyes: 'open', mouth: 'flat', look: T > 92.7 ? [-1, 0] : [0, .6], hand: basket(0, -170, .7, 1, T) }, T)
  + person({ ...CAST.lia, x: 170, y: 2050, s: 1.0, eyes: 'open', mouth: 'smile', look: [1, -.4] }, T),
  push({ x: 540, y: 1150, s: 1.0 }, { x: 560, y: 1150, s: 1.08 }));
// 30. "Que pena... não dá nem omelete." (final + loop)
shot(94.1, (T) => {
  const tap = Math.floor(prog(T, 95.6, 96.9) * 6);
  const bounce = T > 95.6 && T < 97 ? Math.abs(Math.sin(T * 14)) * 30 : 0;
  return kitchen(T) + `<rect x="-400" y="1650" width="1880" height="500" fill="url(#ging)" stroke="${OL}" stroke-width="${SW}"/>`
    + person({ ...CAST.mae, x: 380, y: 1950, s: 1.3, armR: 'hold', armL: 'hips', eyes: 'half', mouth: T > 94.6 ? 'frown' : 'flat', brows: 'sad', look: [1, .5] }, T)
    + pan(720, 1640, 1.05, egg(-10, -60 - bounce, 1.0, 'gold', 0, T))
    + (T > 97.1 ? person({ ...CAST.lia, x: 900, y: 2150, s: .9, eyes: 'happy', mouth: 'laugh', bobHz: 3, bobAmp: 12 }, T) : '')
    + (T > 95.6 && T < 97 ? stamp(760, 1240, 'TOC TOC', T, 95.6, { fs: 90, fill: '#fff', rot: 8 }) : '');
}, punch([[94.1, { x: 540, y: 1200, s: 1.0 }], [95.55, { x: 640, y: 1450, s: 1.35 }], [97.1, { x: 600, y: 1300, s: 1.05 }]]));

const END = 98.3;

// ===== legendas (palavra a palavra, 1–2 palavras por vez) =====
const HL = new Set(['ouro', 'plim', 'dois', 'branco', 'ovo-branco', 'omelete', 'lia', 'penosa', 'milhão', 'mundo', 'fiado', 'quebra', 'nada', 'pneu', 'nenhum', 'bolo', 'mim', 'créc', 'celebridade', 'comemorando', 'detalhe', 'vezes', 'pena', 'cheio']);
function buildChunks(words) {
  const ch = []; let cur = null;
  const norm = w => w.toLowerCase().replace(/[^a-zà-úç\-]/g, '');
  for (const [w, s, e] of words) {
    const brk = !cur || cur.words.length >= 2 || (cur.text + ' ' + w).length > 14 || /[.,:!?…"]$/.test(cur.words[cur.words.length - 1]);
    if (brk) { cur = { start: s, end: e, words: [w], text: w }; ch.push(cur); }
    else { cur.words.push(w); cur.text += ' ' + w; cur.end = e; }
  }
  ch.forEach((c, i) => { c.next = i < ch.length - 1 ? ch[i + 1].start : c.end + .8; c.hl = c.words.some(w => HL.has(norm(w))); });
  return ch;
}
function captionSVG(T, chunks) {
  const c = chunks.find(c => T >= c.start - .02 && T < c.next);
  if (!c || T > c.end + .7) return '';
  const k = .86 + .14 * E.back(prog(T, c.start - .02, c.start + .12));
  const fill = c.hl ? '#ff5a1f' : '#ffffff';
  const txt = c.text.replace(/&/g, '&amp;');
  const fs = 90;
  return G(`translate(540,1030) scale(${k})`,
    `<text x="0" y="10" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="${fs}" fill="#1d1726" opacity=".45" stroke="#1d1726" stroke-width="18" stroke-linejoin="round">${txt}</text>
     <text x="0" y="0" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="${fs}" fill="${fill}" stroke="#1d1726" stroke-width="17" paint-order="stroke" stroke-linejoin="round" letter-spacing="-1">${txt}</text>` +
    (c.hl ? `<text x="0" y="0" text-anchor="middle" font-family="Montserrat" font-weight="900" font-size="${fs}" fill="none" stroke="#fff" stroke-width="3" letter-spacing="-1" opacity=".9">${txt}</text>` : ''));
}

// ===== composição de um frame =====
let CHUNKS = [];
function frameSVG(T) {
  let i = 0; for (let j = 0; j < SH.length; j++) if (T >= SH[j].t0) i = j;
  const s = SH[i], next = SH[i + 1] ? SH[i + 1].t0 : END, lt = T - s.t0, d = next - s.t0;
  const c = s.cam(lt, d, T);
  let sx = 0, sy = 0;
  const sh = s.opt.shake ? s.opt.shake(T) : 0;
  if (sh) { sx = Math.sin(T * 91) * sh; sy = Math.cos(T * 73) * sh; }
  const world = s.fn(T, lt);
  let filt = '';
  const desat = s.opt.desat ? s.opt.desat(T) : 0;
  let over = '';
  if (desat) over += `<rect width="${W}" height="${H}" fill="#9a93a8" opacity="${desat * .35}" style="mix-blend-mode:saturation"/>`;
  if (s.opt.dark) over += `<rect width="${W}" height="${H}" fill="url(#vig)" opacity="1"/><rect width="${W}" height="${H}" fill="#1b1030" opacity="${s.opt.dark(T) * .45}"/>`;
  if (s.opt.flash && T >= s.opt.flash && T < s.opt.flash + .12) over += `<rect width="${W}" height="${H}" fill="#fff" opacity="${1 - prog(T, s.opt.flash, s.opt.flash + .12)}"/>`;
  // corte "whip" curto na entrada de alguns planos (borrão horizontal 3 frames)
  const whip = [5.8, 24.9, 47.9, 84.4].includes(s.t0) && lt < .1;
  const tr = `translate(${540 + sx},${960 + sy}) scale(${c.s}) translate(${-c.x},${-c.y})`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${DEFS}<g ${whip ? 'filter="url(#whip)"' : ''} transform="${tr}">${world}</g>${over}${captionSVG(T, CHUNKS)}</svg>`;
}
