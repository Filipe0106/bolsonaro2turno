#!/bin/bash
# tile.sh DIR COLS  -> DIR/sheet.jpg
cd "$1" && ffmpeg -v error -y -pattern_type glob -i 't_*.jpg' -vf "scale=300:534,tile=${2:-5}x4" sheet_%d.jpg
