#!/usr/bin/env bash
# Exporta el cartel (PDF + PNG) y el post (PNG) con Chrome sin ventana.
# Uso: bash pitch/entregables/marketing/exportar.sh
set -euo pipefail
cd "$(dirname "$0")"
CHROME="${CHROME:-google-chrome}"
F="file://$PWD/fuente"
flags=(--headless=new --disable-gpu --no-pdf-header-footer --hide-scrollbars --virtual-time-budget=3000)

"$CHROME" "${flags[@]}" --print-to-pdf="$PWD/al-curro-cartel-a4.pdf" "$F/cartel.html"
# A4 a 794x1123 px CSS, x2 = 1588x2246 px (unos 190 ppp)
"$CHROME" "${flags[@]}" --window-size=794,1123 --force-device-scale-factor=2 \
  --screenshot="$PWD/al-curro-cartel-a4.png" "$F/cartel.html"
"$CHROME" "${flags[@]}" --window-size=1080,1080 \
  --screenshot="$PWD/al-curro-post-1080.png" "$F/post.html"
echo "Exportado: al-curro-cartel-a4.pdf, al-curro-cartel-a4.png, al-curro-post-1080.png"
