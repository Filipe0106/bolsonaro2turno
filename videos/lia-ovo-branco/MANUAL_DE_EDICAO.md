# Manual de edição: formato "Fábula do Azarado" (cartoon 2D, vertical)

Engenharia reversa do vídeo de referência (TikTok, "Téo Pé-Quente") e a receita para repetir o formato em qualquer nicho. A recriação de teste é **"Lia Ovo-Branco"**.

---

## 1. Ficha técnica da referência

| Item | Valor medido |
|---|---|
| Formato | 1080×1920 (9:16), 30 fps, HEVC, 119,5 s |
| Cortes | **~70 cortes em 120 s**, um a cada **1,7 s** em média (o menor tem 0,4 s e o maior ~3 s) |
| Narração | 1ª pessoa (o protagonista conta), **~2,8 palavras/s**, frases de 2 a 6 palavras |
| Loudness | **-14,2 LUFS** integrado, LRA 3 LU (áudio bem comprimido, padrão TikTok) |
| Legenda | 1 a 2 palavras por vez, sempre no mesmo ponto (centro, ~53% da altura) |

## 2. Estrutura do roteiro (o "esqueleto" que se repete)

| Bloco | Tempo | Função | Na referência | Na recriação |
|---|---|---|---|---|
| 1. Regra do mundo | 0 a 3 s | Gancho: um mundo com uma regra absurda | "Nessa cidade todo azar paga" | "Nessa vila toda galinha bota ovo de ouro" |
| 2. Rajada de exemplos | 3 a 14 s | 3 ou 4 gags rápidas com bordão sonoro ("Plim:") e um número que escala (5, 20, 100, o dobro) | poça, ônibus, passarinho, loteria | espirro, tropeço (x2), galo |
| 3. Apresentação | ~14 s | "Meu nome é X", com pílula de nome na tela | "Téo" | "Lia" + "Penosa" |
| 4. A exceção | 14 a 30 s | O protagonista é o único em que a regra não funciona; repete a estrutura das gags com resultado nulo | pula na poça e ela seca | Penosa faz força e sai um ovo branco |
| 5. Apelido irônico | ~30 s | O apelido vira carimbo na tela | "Pé-Quente" | "Ovo-Branco" |
| 6. A mãe (bordão 1) | 34 a 40 s | Personagem próximo faz uma piada conformada, que volta no final | "Que sorte a nossa" | "Pelo menos dá omelete" |
| 7. O evento | 40 a 50 s | Uma autoridade anuncia algo; conta com números grandes; a cidade comemora; alguém compra fiado | meteoro / prefeito / lancha | bolo gigante / prefeito / forno |
| 8. A virada | ~53 s | "Só que…" com pausa dramática, **música corta** e a tela escurece | o prefeito tem medo do Téo | "ovo de ouro não quebra" |
| 9. Tentativas que falham | 55 a 70 s | Regra de 3: três tentativas com contadores 1, 2, 3 | meteoro quica 3 vezes | martelo, morro (3 quiques), trator |
| 10. Todos olham pro protagonista | ~75 s | O anti-herói vira a solução | | "a vila inteira olhou pra mim" |
| 11. Recompensa | 80 a 90 s | Chuva de dinheiro/ouro e um objeto que enche | guarda-chuva cheio | cesto cheio de ovos de ouro |
| 12. Bordão invertido | último 5 s | A mãe repete a piada do bloco 6 com o sentido invertido. É o fecho e o loop | "Que azar o nosso" | "Que pena, não dá nem omelete" |

**Regra de ouro:** o roteiro é uma fábula com **setup → exceção → virada → payoff com bordão espelhado**. Cada frase tem uma imagem própria. Se a frase não vira imagem, ela sai.

## 3. Visual

- **Estilo:** cartoon vetorial flat, **contorno escuro grosso** (#2a2233, ~7 px a 1080p), sem gradientes complexos. Sombra só no chão (elipse lilás translúcida).
- **Personagens ("bonecos"):** cabeça enorme (~45% da altura), olhos brancos grandes com pupila preta e brilho, bochecha rosada, boca simples. Corpo curto, braços em "mangueira" com mão redonda. A expressão muda **a cada frase** (olhar de lado, olho semicerrado de deboche, olho arregalado, risada).
- **Olhar semicerrado** = assinatura do protagonista deadpan (Téo / Lia).
- **Paleta:** céu ciano para creme, chão creme com ondas, casas em tons pastel (salmão, amarelo, azul, lilás), destaques em laranja (#ff5a1f) e dourado. Cada personagem tem uma cor de roupa fixa para ser reconhecido em meio segundo.
- **Cenários recorrentes:** rua/praça (base), interior da casa, gabinete do prefeito, close de objeto (bilhete, calculadora, carteira), multidão, plano aberto do morro.
- **Gráficos na tela:** pílula branca com nome em laranja ("TÉO", "LIA"), carimbo amarelo com contorno ("R$5", "QUASE!", "NÃO QUEBRA"), números em círculos (1, 2, 3), brilhos de 4 pontas, anel de impacto, confete, chuva de moedas/ovos.

## 4. Legendas (o que mais prende a retenção)

- Fonte **Montserrat Black/ExtraBold**, ~90 px, **branca com contorno escuro grosso** e sombra.
- **1 ou 2 palavras por vez**, trocando no ritmo da fala, e **quebra em toda pontuação**.
- Palavra-chave da piada (o número, o prêmio, o punchline) em **laranja**.
- Entra com um "pop" de escala (86% → 100% com overshoot, ~0,12 s).
- Posição fixa no centro (~53%): fica sobre o peito do personagem e nunca sobre o rosto.

## 5. Montagem e câmera

- **Corte seco** é a regra, a cada 1,5 a 2 s. Quando a frase é longa, faça um **punch-in** (o mesmo plano, mais fechado) em vez de segurar.
- **Push-in lento** constante (escala +5 a 10% durante o plano). Nada fica parado.
- **Corte no beat da fala:** o corte cai no início da palavra-chave, nunca no meio.
- **Whip/borrão horizontal** em 3 ou 4 transições de mudança de lugar.
- **Shake** curto (0,2 a 0,3 s) em impactos: pancada, estouro, queda.
- **Câmera exagerada no clímax:** o objeto vem crescendo na direção da câmera, a sombra cresce, a tela escurece com vinheta.
- **Flash branco** de 2 a 4 frames no impacto principal.
- **Plano "estátua":** antes do punchline, todos parados olhando, e depois close no protagonista.

## 6. Som

- **Narração:** voz jovem e expressiva, ritmo rápido, pausas curtas antes do punchline ("…plim!").
- **Trilha:** instrumental leve e "fofo" (pizzicato, ukulele, glockenspiel), baixo volume, sem letra.
- **A música muda com o roteiro:** alegre → **corta no "Só que…"** (silêncio, drone grave, tique-taque) → tensão em tom menor → crescendo brilhante → volta alegre no payoff.
- **Efeitos sonoros (SFX)** em quase todo corte: "plim" (sino), pop nos carimbos, whoosh nas transições, boing nos quiques, clang, estouro, multidão comemorando, trombone triste na decepção, tilintar de moedas na chuva.
- Mix final em **-14 LUFS**, com a trilha ~12 dB abaixo da voz.

## 7. Como recriar (pipeline usado aqui)

1. **Roteiro** no esqueleto da seção 2, frases curtas, cada uma com uma imagem.
2. **Narração** (ElevenLabs). Depois, **transcrição com tempo por palavra** (ElevenLabs Scribe). Esse arquivo (`words.json`) comanda legenda e cortes.
3. **Shot list** com tempos tirados das palavras (`scenes.js`): cada plano tem cena, câmera, punch-ins, shake, flash e escurecimento.
4. **Render:** SVG animado por código, em que cada frame é uma função do tempo (`lib.js` + `scenes.js`). O Chromium captura os 30 fps e o ffmpeg codifica.
5. **Áudio:** trilha e SFX sintetizados (`audio.py`), com eventos nos mesmos tempos dos planos.
6. **Mix:** voz + trilha com ducking (`mux_voice.sh`), normalizado em -14 LUFS.

## 8. Checklist para um novo nicho

- [ ] A regra absurda do mundo cabe em 1 frase de até 8 palavras?
- [ ] Há 3 gags de exemplo com bordão sonoro e um número que escala?
- [ ] O protagonista é a exceção, mostrada com a mesma estrutura das gags?
- [ ] Tem apelido irônico em carimbo?
- [ ] Tem uma piada do personagem próximo que volta invertida no fim?
- [ ] Tem a virada com "Só que…" e a música cortando?
- [ ] Tem regra de 3 com contadores?
- [ ] O final dá loop com a primeira imagem?
- [ ] O corte médio fica abaixo de 2 s e nenhum plano passa de 3 s sem punch-in?
- [ ] As legendas têm 1 ou 2 palavras, com a palavra-chave em laranja?
