#!/bin/bash
# Engenharia reversa automática de um vídeo curto vertical.
# Uso: bash analisar_referencia.sh video.mp4 pasta_saida
set -e
V="$1"; O="${2:-analise}"; mkdir -p "$O"
DIR="$(cd "$(dirname "$0")" && pwd)"
CAPTION_Y=${CAPTION_Y:-0.49}   # topo da faixa de legenda (fração da altura)
CAPTION_H=${CAPTION_H:-0.08}   # altura da faixa
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,sample_rate,channels:format=duration "$V" > "$O/info.txt"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
# 1. cortes
ffmpeg -hide_banner -i "$V" -vf "scale=270:480,select='gt(scene,0.2)',showinfo" -an -f null - 2>&1 | grep -oE "pts_time:[0-9.]+" | cut -d: -f2 > "$O/cortes.txt" || true
NC=$(wc -l < "$O/cortes.txt")
python3 -c "d=$DUR;n=$NC;print(f'duracao={d:.1f}s cortes={n} media_por_plano={d/max(n+1,1):.2f}s')" > "$O/cortes_resumo.txt"
# 2. folhas de contato 1 fps
ffmpeg -v error -y -i "$V" -vf "fps=1,scale=216:384,drawtext=text='%{pts\:hms}':x=4:y=4:fontsize=18:fontcolor=yellow:box=1:boxcolor=black,tile=6x4" -an "$O/folha_%02d.png"
# 3. faixa de legenda a 6 fps (para ler o roteiro)
ffmpeg -v error -y -i "$V" -vf "fps=6,crop=iw*0.7:ih*${CAPTION_H}:iw*0.15:ih*${CAPTION_Y},scale=380:-2,drawtext=text='%{pts\:flt}':x=2:y=2:fontsize=13:fontcolor=yellow:box=1:boxcolor=black,tile=4x24" -an "$O/legenda_%02d.png"
# 4. loudness
ffmpeg -hide_banner -i "$V" -af ebur128 -f null - 2>&1 | grep -A12 "Summary" > "$O/loudness.txt" || true
# 5. espectrogramas a cada 20 s
i=0; for s in $(seq 0 20 ${DUR%.*}); do i=$((i+1)); ffmpeg -v error -y -ss $s -t 20 -i "$V" -lavfi "showspectrumpic=s=1400x400:legend=1:fscale=log:stop=8000" "$O/espectro_$(printf %02d $i).png"; done
# 6. métricas de áudio
ffmpeg -v error -y -i "$V" -ac 1 -ar 22050 "$O/audio.wav"
python3 -I "$DIR/metricas_audio.py" "$O/audio.wav" > "$O/metricas_audio.txt"
echo "Pronto: $O"; cat "$O/cortes_resumo.txt"
