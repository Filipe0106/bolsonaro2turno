# Produção: 3 rotas

Escolha pela ferramenta que o usuário tem. As três seguem a mesma ordem: **voz → tempo por palavra → shot list → imagem → som → mix**.

---

## Rota 1: Código (motor incluído em `assets/engine/`)
Controle total e render automático, sem depender de IA de vídeo. Exige Node + Playwright/Chromium + ffmpeg + Python/numpy.

**Arquivos**
- `lib.js`: biblioteca de desenho SVG: `person()` (boneco paramétrico), `hen()`, `egg()`, cenários (`village`, `yard`, `kitchen`, `studio`, `hill`), multidão, `pill()`, `stamp()`, `numBadge()`, partículas (`sparkles`, `confetti`, `eggRain`), objetos (calculadora, forno, trator, cesto…). Elenco em `CAST`.
- `scenes.js`: shot list em código, legendas (`buildChunks`, `HL` = palavras destacadas em laranja) e composição do frame (câmera, shake, flash, vinheta, whip).
- `index.html`: carrega as fontes (Montserrat 900, Lilita One) e expõe `renderAt(t)`.
- `render.js`: `node render.js test 1.0,5.2,9.8 pasta` gera frames de teste; `node render.js video saida.mp4 0` renderiza o vídeo inteiro a 30 fps.
- `audio.py`: sintetiza a trilha em atos e os SFX nos tempos dos eventos → `music_sfx.wav`.
- `mux_voice.sh`: junta vídeo + `narracao.mp3` + `music_sfx.wav`, com ducking e -14 LUFS.
- `tile.sh`: monta uma folha de contato dos frames de teste.

**Para um nicho novo**
1. Gere a voz e o `words.json` (ver `som.md`).
2. Em `lib.js`: crie novos presets em `CAST` (cores e acessório), e novos cenários e objetos copiando o padrão das funções existentes.
3. Em `scenes.js`: reescreva os `shot(início, (T)=>…, câmera, opções)` seguindo a shot list; ajuste `HL` (palavras em laranja) e `END` (duração).
4. Teste frames-chave (`render.js test`) e revise com `tile.sh` antes do render completo (~3 min para 100 s).
5. Em `audio.py`: ajuste os tempos de cada SFX e os limites dos atos da trilha.
6. Mix: `./mux_voice.sh narracao.mp3`.

**Pontos fracos conhecidos do motor** (melhore se houver tempo): animação limitada a balanço, piscada e troca de expressão; sem lip-sync; trilha e SFX sintetizados soam simples. Para ficar mais perto da referência, substitua os SFX por samples de biblioteca livre e adicione poses intermediárias (pulos, viradas, gestos).

---

## Rota 2: IA de imagem/vídeo
Para Midjourney, Leonardo, Ideogram, Flux, DALL-E e animadores como Runway, Kling, Pika, Hailuo e Veo.

**1. Folha de personagem primeiro** (gere uma vez e use como referência em todas as cenas):
```
flat 2D vector cartoon character sheet, [descrição: e.g. 10-year-old Brazilian girl, brown skin, two big black hair buns with yellow clip, white t-shirt, purple overalls, red sneakers],
big head (45% of body height), huge white oval eyes with black pupils and white highlight, rosy cheeks, simple mouth,
thick uniform dark purple-black outline, no gradients, no texture, flat colors, soft pastel palette,
front view, 3/4 view, side view, expressions: deadpan half-closed eyes, surprised wide eyes, happy closed eyes, laughing,
plain cream background, children's animated series style
```
**2. Cenário-base** (sem personagens):
```
flat 2D vector cartoon background, small colorful Brazilian town square, pastel houses (salmon, yellow, light blue, lilac) with terracotta roofs, small white church tower, round yellow trees,
cyan-to-cream gradient sky with soft sun glow, cream ground with subtle wavy pattern, thick dark outlines, no characters, vertical 9:16, high detail, clean
```
**3. Cada plano:** `[cenário] + [personagem da folha] + [ação/expressão do plano] + "same flat cartoon style, thick dark outline, 9:16 vertical, medium shot / close-up"`. Use a função de referência de personagem da ferramenta (character reference, consistent character).
**4. Animar** cada imagem com movimentos curtos (2–3 s): "subtle camera push-in, character blinks and bounces slightly", "coin falls from the sky and pops with sparkles". Evite pedir ações longas: corte é melhor que animação longa.
**5. Montar no editor** (Rota 3) com legendas, SFX e trilha.

---

## Rota 3: Editor (CapCut / Premiere / DaVinci)
**Projeto:** 1080×1920, 30 fps.
**Legenda:** use legenda automática pela voz e depois:
- Fonte Montserrat Black (ou "The Bold Font"/"Poppins Black"), 85–95 pt em 1080 de largura, branca.
- Contorno preto-roxo (#1d1726) de 12–16 px + sombra 0/6 px, 45%.
- **1–2 palavras por bloco** (no CapCut: "Dividir por palavra" ou "palavras por linha = 2"), posição Y ≈ 53%.
- Destaque: a palavra-chave em laranja #ff5a1f (edite à mão).
- Animação de entrada "Pop"/"Scale in" com duração de 0,1–0,15 s.
**Câmera:** keyframe de escala de 100% → 106% em cada clipe; punch-in duplicando o clipe e escalando para 130–160%; efeito "Shake" de 0,2 s nos impactos; "Flash" branco de 3 frames no clímax; transição "Blur/Whip" só na mudança de lugar.
**Áudio:** trilha "quirky/pizzicato" a -20 dB com ducking automático ("Reduzir ruído de fundo"/"auto ducking"), SFX da tabela em `som.md` e normalização de saída em -14 LUFS.
**Checklist final:** `formato-fabula.md`, seção 9.
