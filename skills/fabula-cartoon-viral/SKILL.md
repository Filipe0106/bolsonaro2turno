---
name: fabula-cartoon-viral
description: Receita completa para criar vídeos curtos verticais (TikTok, Reels, Shorts) no formato "fábula cartoon do azarado", animação 2D flat com narrador em 1ª pessoa, legenda palavra a palavra e virada irônica no final, adaptada ao nicho e ao conteúdo do usuário. Cobre roteiro em 12 blocos, shot list com tempos, direção de arte (personagens, paleta, cenários, iluminação), câmera e zoom, montagem e cortes, legendas, trilha e efeitos sonoros, e produção (por código, por IA de imagem/vídeo ou editando no CapCut/Premiere). Também ensina a fazer engenharia reversa de um novo vídeo de referência (cortes, frames, legendas, áudio). Use sempre que o usuário pedir para criar, roteirizar, planejar, editar ou analisar vídeo curto animado, cartoon, desenho, fábula, história com personagens, "vídeo viral", "no mesmo formato do vídeo de referência", "modelar esse vídeo pro meu nicho", "story animado", ou mandar um vídeo de referência para analisar e replicar, mesmo sem dizer "cartoon" ou "fábula".
---

# Fábula Cartoon Viral

Esta skill é uma **receita, não um bolo pronto**. Ela descreve um formato de vídeo curto validado (fábula cartoon 2D com anti-herói, narração em 1ª pessoa e final irônico) e mostra como **modelá-lo para o nicho do usuário**: finanças, fitness, saúde, imóveis, marketing, direito, educação, humor, religião, política, produto ou serviço.

O formato funciona porque junta três mecanismos de retenção:
1. **Curiosidade em loop:** um mundo com uma regra absurda, e o narrador é a única exceção.
2. **Ritmo sem respiro:** corte a cada ~1,7 s e legenda trocando a cada 0,3–0,6 s, com algo novo na tela o tempo todo.
3. **Payoff espelhado:** a frase do começo volta invertida no fim. Isso gera replay, comentário e compartilhamento.

## Como usar (fluxo)

Identifique o pedido e siga o caminho certo:

| O usuário quer… | Caminho |
|---|---|
| Criar um vídeo novo no formato para o nicho dele | **A. Criar** (passos 1–7 abaixo) |
| Só o roteiro / só a ideia | Passos 1–3 |
| Analisar um vídeo de referência novo | **B. Analisar**: leia `references/analise-de-referencia.md` e rode `scripts/analisar_referencia.sh` |
| Ajustar um vídeo já feito | Use o checklist final (`references/formato-fabula.md`, seção 9) como critério de revisão |

### A. Criar um vídeo para o nicho do usuário

**1. Entender o conteúdo (pergunte só o que faltar).**
- Nicho e público (quem assiste, idade, linguagem).
- A **mensagem real** por trás da fábula: a lição, o produto, a dica, a crítica. A fábula é o veículo, não o conteúdo.
- Plataforma e duração-alvo (padrão: 60–90 s; ver "duração" em `references/formato-fabula.md`).
- Restrições: tom (humor leve, ácido, inspirador), palavras proibidas, marca, cores.
- Recursos de produção disponíveis: voz (ElevenLabs ou gravação própria), ferramenta de animação (código, IA de imagem/vídeo, CapCut).

**2. Encontrar a "regra absurda do mundo".** É a parte mais importante, e onde a adaptação ao nicho acontece. Fórmula:
> "Nesse lugar, **todo mundo** [ganha/tem/consegue X do jeito mais fácil]… **menos eu**."

O X deve ser o **desejo do público do nicho**, e a ironia final deve entregar a **mensagem real**. Veja `references/adaptacao-nichos.md` para o método completo e 12 exemplos prontos por nicho.

**3. Escrever o roteiro nos 12 blocos.** Use o template de `references/roteiro-template.md`. Regras de escrita:
- Frases de **2 a 7 palavras**. Cada frase vira **uma imagem**; se não vira imagem, corte.
- Narrador em **1ª pessoa**, tom deadpan (conformado, sem drama).
- Bordão sonoro curto nas gags (ex.: "Plim:"), com números que escalam (5 → 20 → 100 → o dobro).
- Regra de 3 nas tentativas que falham.
- A última fala é a primeira piada invertida (setup no bloco 6, payoff no bloco 12).
- Meta: **200–280 palavras** para 80–100 s de fala a ~2,8 palavras/s.

**4. Fazer a "bíblia visual".** Defina elenco (3–6 personagens), paleta, cenários e objetos-chave, seguindo `references/direcao-de-arte.md`: proporções dos bonecos, cores fixas por personagem, iluminação flat, sombras e expressões.

**5. Montar a shot list.** Um plano a cada frase (~1,5–2 s), com câmera, zoom, gráfico na tela e som de cada plano. Use o formato de `references/shotlist-template.md`. Consulte `references/camera-e-montagem.md` para escolher enquadramento, push-in, punch-in, shake, flash e whip.

**6. Desenhar o som.** Trilha em atos (alegre → corte seco na virada → tensão → crescendo → alegre) e um efeito sonoro em quase todo corte. Mapa completo em `references/som.md`.

**7. Produzir.** Escolha a rota em `references/producao.md`:
- **Rota Código** (controle total, render automático): use o motor em `assets/engine/`. Ele já tem personagens SVG, legenda palavra a palavra, câmera, efeitos, render 30 fps e síntese de trilha/SFX.
- **Rota IA** (Midjourney, Ideogram, Leonardo, Runway, Kling etc.): o arquivo traz prompts-modelo para manter os personagens consistentes.
- **Rota Editor** (CapCut, Premiere): presets de legenda, transição, zoom e lista de SFX.

Sempre que houver narração, gere primeiro a voz e tire o **tempo de cada palavra** (ElevenLabs Scribe ou Whisper). É esse arquivo que dita os cortes e as legendas; montar a imagem antes da voz é a principal causa de vídeo "fora do ritmo".

### Entregáveis padrão
Quando o usuário pedir um vídeo neste formato, entregue nesta ordem (pule o que ele não pediu):
1. **Conceito em 3 linhas:** regra do mundo, exceção, virada, bordão espelhado.
2. **Roteiro** nos 12 blocos, com contagem de palavras e duração estimada.
3. **Bíblia visual:** elenco com cores e traços, cenários, paleta.
4. **Shot list** com tempos (tabela).
5. **Plano de som:** trilha por ato e lista de SFX por tempo.
6. **Arquivos de produção** da rota escolhida: vídeo renderizado, prompts ou guia de edição.

## Ética e originalidade
- **Modele o formato, não copie a obra:** crie personagens, nomes, cenários, falas e músicas próprios. Formato e técnica não são protegidos, mas personagens e arte específicos de terceiros são.
- Não clone a voz nem o rosto de pessoas reais sem autorização. Com pessoas públicas (inclusive políticos), use personagens fictícios ou caricatura claramente satírica, e não atribua a elas falas inventadas como se fossem reais.
- Trilhas e SFX: use material próprio, sintetizado ou de bibliotecas livres de direitos.

## Mapa de referências
- `references/formato-fabula.md`: a análise completa do formato (estrutura, métricas, visual, câmera, legendas, som, checklist). **Leia primeiro.**
- `references/roteiro-template.md`: template dos 12 blocos + 2 roteiros de exemplo.
- `references/adaptacao-nichos.md`: como transformar qualquer nicho numa fábula + 12 exemplos.
- `references/direcao-de-arte.md`: personagens, paleta, iluminação, cenários, gráficos.
- `references/camera-e-montagem.md`: ângulos, zoom, ritmo de corte, transições.
- `references/som.md`: voz, trilha em atos, biblioteca de SFX, mix.
- `references/shotlist-template.md`: formato da shot list + exemplo.
- `references/producao.md`: rotas Código, IA e Editor, com prompts e presets.
- `references/analise-de-referencia.md`: como dissecar um novo vídeo de referência.
- `scripts/analisar_referencia.sh` + `scripts/metricas_audio.py`: análise automática de vídeo e áudio.
- `assets/engine/`: motor de animação por código (exemplo funcional "Lia Ovo-Branco").
