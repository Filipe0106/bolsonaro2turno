# Engenharia reversa de um vídeo de referência

Use quando o usuário mandar um vídeo novo para "aprender o formato". O objetivo é extrair a **receita** (estrutura, ritmo, estilo, som), não copiar o conteúdo.

## Passo 0: obter o arquivo
- Link do TikTok, Reels ou YouTube: tente `yt-dlp`. Se a plataforma bloquear, peça o `.mp4` (o usuário pode baixar com um app como o Snaptik e enviar).
- Copie o vídeo para uma pasta de trabalho própria antes de analisar.

## Passo 1: análise automática
```bash
bash scripts/analisar_referencia.sh video.mp4 pasta_saida
```
Gera:
- `info.txt`: resolução, fps, duração, codecs.
- `cortes.txt` + `cortes_resumo.txt`: tempo de cada corte (detecção de cena com limiar 0,2), total e média por plano.
- `folha_XX.png`: 1 frame/segundo, 24 por folha, com timestamp.
- `legenda_XX.png`: faixa da legenda (y ≈ 49–57% da altura) a 6 fps, para **ler o roteiro** quando não houver transcrição.
- `loudness.txt`: LUFS integrado e LRA.
- `espectro_XX.png`: espectrograma por trechos de 20 s (voz, trilha, SFX e silêncios dramáticos).
- `metricas_audio.txt`: BPM estimado, faixa de pitch da voz, picos de agudo (prováveis SFX) e momentos mais silenciosos.

Se a legenda ficar em outra altura, ajuste `CAPTION_Y` e `CAPTION_H` no script.

## Passo 2: leitura visual (você olha as imagens)
1. **Folhas de 1 fps:** identifique cenários, elenco, cores e gráficos na tela; anote os blocos narrativos e onde estão.
2. **Folhas de legenda:** transcreva o roteiro com tempos (cada célula mostra o tempo).
   - Alternativa: transcrição automática (Whisper, se o modelo puder ser baixado, ou ElevenLabs Scribe com o áudio enviado ao flow).
3. **Movimento:** extraia tiras curtas em 5–10 fps de 2–3 trechos (`ffmpeg -ss T -t 2 -i v.mp4 -vf "fps=10,scale=180:320,tile=10x2" tira.png`) para ver zoom, shake, transições e animação dos personagens.
4. **Close de qualidade:** 3–5 frames em 540×960 para medir traço, fonte da legenda, proporção do boneco e paleta.

## Passo 3: leitura do áudio
- Espectrograma: faixas horizontais finas e contínuas = trilha tonal; "colunas" de ruído = whoosh/impacto; faixa escura = silêncio dramático (marca a virada).
- Pitch mediano de 100–150 Hz sugere voz masculina; de 180–260 Hz, feminina ou jovem.
- LRA baixo (≤ 4 LU) indica compressão forte, padrão de rede social.

## Passo 4: escrever o manual
Preencha estas seções:
1. Ficha técnica (tabela de métricas)
2. Estrutura narrativa em blocos, com % do vídeo e função de cada um
3. Linguagem do roteiro (tamanho de frase, bordões, números)
4. Visual: estilo, personagens, paleta (hex aproximados), iluminação, cenários, gráficos
5. Câmera e zoom
6. Montagem e transições
7. Legendas
8. Som (voz, trilha em atos, SFX, mix)
9. Checklist para recriar
Use `formato-fabula.md` como modelo de profundidade. Se o vídeo novo for de outro formato (não fábula), crie um novo arquivo de formato com a mesma estrutura de seções.

## Passo 5: validar com uma recriação
Recrie um trecho de 15–20 s no formato, com tema diferente, e compare lado a lado as folhas de contato de original e recriação. Anote as diferenças, que viram ajustes no manual.
