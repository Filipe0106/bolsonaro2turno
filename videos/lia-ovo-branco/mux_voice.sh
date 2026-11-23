#!/bin/bash
# Junta a narração da ElevenLabs (narracao.mp3) com o vídeo, trilha e SFX, com ducking.
# Uso: ./mux_voice.sh narracao.mp3   -> gera lia_ovo_branco_com_voz.mp4
set -e
V="${1:-narracao.mp3}"
ffmpeg -hide_banner -v error -y -i lia_ovo_branco_video.mp4 -i "$V" -i music_sfx.wav -filter_complex \
"[1:a]aresample=44100,pan=stereo|c0=c0|c1=c0,loudnorm=I=-15:TP=-1.5:LRA=7,asplit=2[v][vk];\
[2:a]volume=-10dB[m];[m][vk]sidechaincompress=threshold=0.04:ratio=6:attack=15:release=250[md];\
[v][md]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1:LRA=6,aresample=44100[a]" \
-map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest lia_ovo_branco_com_voz.mp4
echo "ok -> lia_ovo_branco_com_voz.mp4"
