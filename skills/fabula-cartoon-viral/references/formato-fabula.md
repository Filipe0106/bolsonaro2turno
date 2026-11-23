# O formato "Fábula Cartoon do Azarado": análise completa

Esta análise vem da engenharia reversa de um vídeo viral de referência (TikTok, ~120 s, cartoon 2D, protagonista "Téo Pé-Quente"). Os números abaixo foram **medidos**, não estimados. Use-os como alvo.

## Índice
1. Ficha técnica
2. Estrutura narrativa (12 blocos)
3. Linguagem do roteiro
4. Visual: estilo, personagens, cor, luz
5. Câmera e zoom
6. Montagem e transições
7. Legendas
8. Som
9. Checklist de qualidade

---

## 1. Ficha técnica

| Métrica | Referência | Alvo para recriar |
|---|---|---|
| Proporção / resolução | 9:16, 1080×1920 | igual |
| FPS | 30 | 30 |
| Duração | 119,5 s | 60–120 s (o ideal para o formato é 75–100 s) |
| Nº de cortes | ~70 | 1 a cada **1,5–2,0 s** |
| Plano mais curto / mais longo | 0,4 s / ~3 s | nenhum plano parado por mais de 3 s sem punch-in |
| Velocidade da fala | ~2,8 palavras/s (~330 palavras) | 2,6–3,0 palavras/s |
| Legenda | 1–2 palavras, troca a cada 0,3–0,6 s | igual |
| Loudness | -14,2 LUFS, LRA 3 LU | -14 LUFS, bem comprimido |
| Voz | 1ª pessoa, jovem, expressiva, ritmo rápido | igual |

## 2. Estrutura narrativa: os 12 blocos

A estrutura é uma **fábula com setup → exceção → virada → payoff espelhado**. Os tempos são relativos a um vídeo de ~100 s; escale proporcionalmente.

| # | Bloco | % do vídeo | Função psicológica | Referência (Téo) | Exemplo de recriação (Lia) |
|---|---|---|---|---|---|
| 1 | **Regra do mundo** | 0–3% | Gancho: um mundo absurdo e desejável | "Nessa cidade, todo azar paga." | "Nessa vila, toda galinha bota ovo de ouro." |
| 2 | **Rajada de exemplos** | 3–14% | Prova a regra com 3–4 gags rápidas, bordão sonoro e números que escalam | Pisou na poça: plim, R$5. Perdeu o ônibus: R$20. Passarinho: R$100. Loteria: o dobro. | Seu Zé espirrou: plim. Padeiro tropeçou: plim, plim, dois. O galo levou susto: plim. |
| 3 | **Apresentação** | ~14% | "Meu nome é X" com pílula de nome | "Meu nome é Téo" | "Meu nome é Lia. E essa é a Penosa." |
| 4 | **A exceção** | 14–28% | O protagonista repete as gags, mas com resultado nulo | Pulo na poça: ela seca. O ônibus me espera. | Penosa faz força… e sai um ovo branco. |
| 5 | **Apelido irônico** | ~28% | O apelido vira carimbo e assinatura do personagem | "Me chamam de Pé-Quente" | "Lia Ovo-Branco" |
| 6 | **Bordão da pessoa próxima** | 30–36% | Mãe ou amigo faz uma piada conformada: é o **setup do final** | Carteira vazia: "Que sorte a nossa." | Geladeira de ovo branco: "Pelo menos dá omelete." |
| 7 | **O evento** | 36–50% | Autoridade anuncia algo grande; conta com números enormes; comemoração; alguém compra fiado | Previsão: meteoro no sábado; prefeito calcula 1 milhão por morador | Prefeito: o maior bolo do mundo, mil ovos de ouro = 1 milhão |
| 8 | **A virada** | ~53% | "Só que…" + pausa + **música corta** + tela escurece | Domingo sem cidade; o prefeito tem medo do Téo | "Só que ninguém lembrou de um detalhe: ovo de ouro não quebra." |
| 9 | **Tentativas que falham** | 55–70% | Regra de 3, com contadores 1, 2, 3 na tela | Meteoro quica 3 vezes no lago | Martelo, morro (3 quiques), trator |
| 10 | **Inversão** | 70–78% | A exceção vira a solução: todos olham para o protagonista | O meteoro erra o Téo e para na vaga do prefeito | "A vila inteira olhou pra mim." |
| 11 | **Recompensa** | 78–92% | Chuva de dinheiro/ouro e um objeto que enche | Guarda-chuva cheio de moedas | Cesto cheio de ovos de ouro |
| 12 | **Bordão invertido** | últimos 5–8% | O bordão do bloco 6 volta com o sentido trocado. É o fim e o loop | "Que azar o nosso." | "Que pena… não dá nem omelete." |

**Por que funciona:** os blocos 1–2 criam curiosidade ("que mundo é esse?"), o 4 cria empatia pelo azarado, o 8 quebra a expectativa, o 10 dá a satisfação de ver o fraco vencer, e o 12 recompensa quem prestou atenção. Por isso as pessoas assistem de novo e comentam.

## 3. Linguagem do roteiro
- **Frases curtíssimas:** 2–7 palavras, com pontuação forte (dois-pontos, reticências, exclamação). Cada frase é um corte.
- **Dois-pontos antes do punchline:** "Pisou na poça? Plim: cinco reais." A legenda quebra no ":" e o corte também.
- **Reticências = pausa dramática** de 0,3–0,6 s antes da palavra-chave ("concentra… faz força… e sai:").
- **Números que escalam** e valores concretos (R$ 5, 20, 100, 1 milhão), nunca abstrações.
- **Bordão onomatopeico** repetido 4–8 vezes ("Plim", "Créc", "Toc toc"), que vira um efeito sonoro reconhecível.
- **Deadpan:** o narrador nunca reclama em excesso; constata ("E eu nunca ganhei um centavo.").
- **Citação direta** de personagens entre aspas, curtas.
- **Sem CTA falado** no meio; se precisar, só no último segundo e na tela, ou no texto da legenda do post.

## 4. Visual

### 4.1 Estilo geral
- **Flat vector cartoon** com **contorno escuro grosso e uniforme** (#2a2233, ~6–8 px a 1080p). Sem textura, sem pintura, sem 3D.
- Volumes indicados por **um brilho branco** (traço curto) e por blush rosado, não por sombreamento.
- Sombras **apenas no chão**: elipse lilás/roxa translúcida (opacidade ~18%). Nada de sombra projetada dura.
- Superfícies com **padrões simples**: ondas no chão, xadrez de toalha, azulejo, pontinhos na roupa.

### 4.2 Personagens ("bonecos")
- **Cabeça enorme:** ~45% da altura total. Corpo curto, pernas curtas, pés grandes com sapato de sola branca.
- **Olhos:** grandes ovais brancos, pupila preta redonda com 1 brilho branco. É o principal canal de atuação.
- **Expressões-chave** (mudar a cada frase):
  - *Semicerrado / deadpan*: pálpebra cobrindo metade, pupila baixa. É a **assinatura do protagonista**.
  - *Arregalado*: olho maior e pupila pequena, para susto e surpresa.
  - *Feliz*: olho em "^", boca aberta com língua.
  - *Olhar de lado*: pupilas deslocadas, para ironia e cumplicidade.
  - *Esforço*: olhos "> <", rosto vermelho, gotas de suor.
- **Boca simples:** linha, sorriso, "O", aberta com língua, dentes cerrados (medo).
- **Braços de "mangueira"** (curva contínua) com mão redonda; poses: braços caídos, mãos na cintura, para cima, segurando objeto, apontando.
- **Silhueta e cor únicas por personagem:** cada um tem 1 cor de roupa e 1 acessório icônico (chapéu de palha, touca de chef, turbante, cartola, faixa de prefeito). O espectador precisa reconhecer em 0,5 s.
- **Elenco típico:** protagonista (criança ou jovem), mãe ou avó (a voz do bordão), autoridade (prefeito, chefe), 2–3 coadjuvantes de gag (padeiro, vizinho, motorista), multidão genérica.

### 4.3 Paleta
- **Céu:** gradiente ciano claro → creme (#7fd3e8 → #c9eef0 → #fff4d9), com sol de brilho suave.
- **Chão:** creme/areia (#f6e2b8) com ondas mais escuras (#ecd09a).
- **Casas:** pastel (salmão #ffb4a2, amarelo #ffd88a, azul #a8d8ff, lilás #c7b8ff, menta #b5ead7), telhados terracota (#e86a4f) ou azul (#5b7bd5).
- **Destaques:** laranja (#ff5a1f) para legenda e protagonista, dourado (gradiente #fff07a → #e8960c) para dinheiro e prêmio.
- **Contraste dramático:** na virada, vinheta roxo-escura (#140c20 a 50–85%) e dessaturação leve.

### 4.4 Iluminação
- **Luz alta e difusa**, sem direção marcada: dia ensolarado permanente, tudo legível.
- **Brilho do sol** como glow radial no céu (canto superior), nunca estourando os personagens.
- **Luz narrativa** (só em momentos-chave):
  - *Escurecer/vinheta*: virada e ameaça.
  - *Holofote* (elipse clara sobre fundo escurecido): "todos olharam pra mim".
  - *Halo e raios girando* atrás do herói ou objeto: revelação e redenção.
  - *Flash branco* de 2–4 frames: impacto principal.
  - *Tom avermelhado e sombra crescendo*: perigo vindo (meteoro).

### 4.5 Cenários
Poucos cenários, muito reaproveitados (barateia e cria familiaridade):
1. **Rua/praça principal** (cenário-base, 50%+ dos planos): casas coloridas, igreja ou torre, árvores redondas, fiação, placas com nomes de comércio.
2. **Interior da casa:** cozinha ou sala, com mesa, toalha xadrez, janela, relógio.
3. **Lugar da autoridade:** gabinete, rádio ou TV.
4. **Close de objeto:** bilhete, calculadora, carteira, previsão do tempo. Fundo chapado.
5. **Plano aberto:** morro, lago ou estrada, para escala e deslocamento.
6. **Multidão:** fileiras de personagens genéricos com variação de cor.

### 4.6 Gráficos na tela
- **Pílula de nome:** fundo branco-creme, contorno escuro, texto laranja (fonte display arredondada tipo Lilita One), levemente inclinada (-4°), entra com pop.
- **Carimbo/HQ:** texto amarelo com contorno escuro grosso e sombra ("R$5", "QUASE!", "SAI DAÍ!"), inclinado ±6°, pop com overshoot e leve balanço.
- **Contadores em círculo** (1, 2, 3) para a regra de 3.
- **Placas e objetos com texto** dentro da cena (bilhete da loteria, display da calculadora, "VAGA DO PREFEITO").
- **Partículas:** brilhos de 4 pontas, anel de impacto, confete, chuva de moedas, gotas de suor, linhas de movimento, balão de pensamento.

## 5. Câmera e zoom
- **Ângulo padrão:** frontal, altura dos olhos do personagem, plano médio (da cintura para cima ou corpo inteiro).
- **Close-up** no rosto para reação (deadpan, susto) e **close de objeto** (bilhete, ovo, calculadora) quando a frase cita o objeto.
- **Plano geral** só para regra do mundo, multidão, deslocamento e clímax.
- **Push-in lento constante:** +5 a 10% de escala ao longo de cada plano, com easing. Nunca há plano estático.
- **Punch-in:** no meio de uma frase longa, troca seca para o mesmo plano mais fechado (+25 a 60%). Equivale a um corte, sem trocar de cena.
- **Crash zoom/aproximação** do objeto que vem na direção da câmera (meteoro crescendo).
- **Shake** de 0,2–0,3 s, amplitude 10–20 px, em impactos.
- **Tracking simples:** câmera acompanha um objeto caindo (moeda) ou um personagem andando.
- **Câmera parada + elenco imóvel** ("plano estátua") antes do punchline, para dar tensão.

## 6. Montagem e transições
- **Corte seco** é 90% das transições.
- **O corte cai no início da palavra-chave**, não entre frases aleatórias.
- **Cada frase = 1 plano** (ou 1 punch-in). Uma frase com duas imagens ganha dois cortes.
- **Whip/borrão horizontal** (3–4 frames) só quando muda de lugar.
- **Match de ação:** a mão que joga num plano e o objeto que cai no seguinte.
- **Repetição de enquadramento** para as gags paralelas (mesmo ângulo, outra pessoa): cria padrão e piada.
- **Respiro de 0,5–1 s** só em 2 momentos: depois da virada (silêncio) e no último plano (loop).

## 7. Legendas
- **Fonte:** Montserrat Black/ExtraBold (ou similar geométrica pesada), ~85–95 px em 1080 de largura.
- **Cor:** branco com **contorno escuro grosso** (~16 px, cantos arredondados) e sombra deslocada para baixo.
- **Destaque:** a palavra-chave da piada (número, prêmio, punchline, nome) em **laranja (#ff5a1f)**, opcionalmente com fio branco interno.
- **Quantidade:** 1–2 palavras (máx. ~14 caracteres) por vez; **quebra obrigatória em toda pontuação**.
- **Animação de entrada:** escala 86% → 100% com overshoot em ~0,12 s. Sem saída animada: troca seca.
- **Posição:** centro horizontal, **~53% da altura**. Fica sobre o peito do personagem, nunca sobre o rosto, e fora das zonas de interface do TikTok/Reels (topo 12%, base 20%, lateral direita).
- **Sincronia:** a legenda entra no início exato da palavra (use os tempos por palavra).

## 8. Som
- **Voz:** jovem, expressiva, tom de quem conta um causo; pausas curtas antes do punchline.
- **Trilha** instrumental "fofa" (pizzicato, ukulele, glockenspiel, marimba), 110–130 BPM, baixa (~12 dB abaixo da voz), **em atos**:
  1. Alegre (blocos 1–7)
  2. **Corte seco** no "Só que…" (bloco 8), com silêncio, drone grave e tique-taque
  3. Tensão cômica em tom menor (bloco 9)
  4. Crescendo brilhante (bloco 10)
  5. Alegre de novo, mais cheia (blocos 11–12), com acorde final
- **SFX em quase todo corte:** "plim" (sino) no bordão, pop nos carimbos, whoosh nas transições, boing nos quiques, clang no metal, estouro, multidão, trombone triste na decepção, tilintar na chuva de moedas, cliques de flash, toc-toc.
- **Mix:** voz em -15 LUFS, ducking da trilha quando a voz fala, master em **-14 LUFS**, true peak -1 dB.

## 9. Checklist de qualidade
- [ ] A regra do mundo cabe em 1 frase de até 8 palavras e é um **desejo do público** do nicho?
- [ ] 3–4 gags de exemplo, com bordão sonoro e números que escalam?
- [ ] O protagonista é a exceção, mostrada com a **mesma estrutura** das gags?
- [ ] Apelido irônico em carimbo?
- [ ] Bordão da pessoa próxima no bloco 6, invertido no bloco 12?
- [ ] Virada com "Só que…", música cortando e tela escurecendo?
- [ ] Regra de 3 com contadores na tela?
- [ ] A inversão entrega a **mensagem real** do nicho sem soar como aula?
- [ ] Plano médio ≤ 2 s; nenhum plano > 3 s sem punch-in?
- [ ] Legendas de 1–2 palavras, palavra-chave em laranja, sincronizadas por palavra?
- [ ] SFX em pelo menos 70% dos cortes?
- [ ] Último plano casa com o primeiro (loop)?
- [ ] Master em -14 LUFS?
