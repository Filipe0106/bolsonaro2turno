# Som: voz, trilha e efeitos

## Voz
- **Perfil:** jovem, expressiva, "contando um causo", leve sorriso na voz. Narrador = protagonista (1ª pessoa).
- **Ritmo:** 2,6–3,0 palavras/s. Pausas de 0,3–0,6 s nas reticências e antes do punchline.
- **ElevenLabs:** prefira o modelo `eleven_v4` (aceita marcações como `[deadpan]`, `[whispering]`, `[laughs softly]`, `[excited]`, `[sighs]`). O `eleven_flash_v2_5` custa ~metade dos créditos, mas não interpreta as marcações: tire-as do texto antes.
  - Marcações úteis: `[deadpan]` na exceção, `[whispering]` no "Só que…", `[excited]` no evento e na recompensa, `[sighs]` antes do bordão final.
  - Busque vozes com `languages=["pt"]` e `use_cases=["characters_animation"]` ou `["narrative_story"]`.
- **Depois de gerar:** transcreva com tempo por palavra (ElevenLabs Scribe, `creative_transcribe_audio` com `connect_from` no nó da fala; ou Whisper). Salve como `words.json` no formato `[[palavra, início, fim], …]`.
- Para acelerar uma voz lenta: `ffmpeg -i voz.mp3 -af atempo=1.12 voz_rapida.mp3` (e multiplique os tempos por 1/1,12).

## Trilha em atos
| Ato | Blocos | Instrumentação | Energia |
|---|---|---|---|
| 1. Apresentação | 1–7 | pizzicato/ukulele nos contratempos + baixo nos tempos 1 e 3 + glockenspiel na melodia + shaker; I–V–vi–IV maior, 110–130 BPM | média, constante |
| 2. Virada | 8 | **corte seco** (com scratch de disco ou parada) → silêncio + drone grave + tique-taque | quase zero |
| 3. Tentativas | 9–10 | só baixo pizzicato + glock em tom menor, mais leve | baixa, tensa |
| 4. Revelação | 10→11 | arpejo de glock subindo + swell de ruído/pratos | crescendo |
| 5. Payoff | 11–12 | groove do ato 1, mais cheio | alta; acorde final no último plano |
Procure em bibliotecas livres de direitos termos como "quirky", "pizzicato", "comedy cartoon", "ukulele happy", "tension comedy".

## Biblioteca de SFX (onde usar)
| SFX | Quando |
|---|---|
| Plim/ding (sino agudo) | todo bordão de ganho, moeda ou ovo aparecendo |
| Pop (sweep curto) | pílulas, carimbos, objetos surgindo |
| Whoosh | transições whip, objetos arremessados, giro de cabeça |
| Boing | pulos e quiques (um a cada contato) |
| Thud | quedas e tropeços |
| Clang/clink | metal, objeto que não quebra |
| Crack | quebrar (ovo, vidro), estalo |
| Estouro + chiado | pneu, balão |
| Trombone triste "wah-wah" | decepção da exceção |
| Multidão comemorando / risadas | festa, vizinhos zoando |
| Scratch de disco | início da virada |
| Tique-taque | tensão |
| Ka-ching / caixa registradora | número enorme na calculadora |
| Tilintar em cascata | chuva de dinheiro |
| Clique de câmera | celebridade, flashes |
| Toc-toc | batida, teste, insistência |
Meta: **SFX em ≥ 70% dos cortes**, sempre curtos (< 1 s) e alinhados ao frame do evento.

## Mix
- Voz: normalizar em ~-15 LUFS.
- Trilha: ~-10 dB, com **ducking** por sidechain (threshold ~0,04, ratio 6, attack 15 ms, release 250 ms).
- SFX: 3–6 dB abaixo da voz; impactos podem encostar nela.
- Master: **-14 LUFS integrado, true peak -1 dB**, LRA ≤ 6.
- Comando pronto: `assets/engine/mux_voice.sh` (vídeo + voz + trilha/SFX com ducking).
