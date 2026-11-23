# Câmera, zoom e montagem

## Escolha do enquadramento por tipo de frase
| A frase fala de… | Enquadramento | Movimento |
|---|---|---|
| O mundo / a regra | Plano geral (cidade inteira) | Push-in lento ou tilt seguindo o objeto que cai |
| Uma ação de personagem | Plano médio, corpo inteiro | Push-in +8% |
| Uma reação / ironia | Close no rosto (cabeça ocupa ~60% da largura) | Quase parado (+3%) |
| Um objeto / número | Close do objeto em fundo chapado | Punch-in no momento do número |
| Muita gente | Plano geral com 2 fileiras | Push-in + balanço da multidão |
| Ameaça chegando | Plano médio com objeto crescendo | Crash zoom no objeto + sombra crescendo + tom vermelho |
| Tensão antes do punchline | Plano "estátua" (todos parados) | Zoom lento até close (+40–60%) com vinheta |
| Revelação do herói | Contra-plongée leve ou frontal com halo | Push-in +10% com raios girando |

## Parâmetros de movimento (a 30 fps)
- **Push-in:** escala de 1,00 → 1,05–1,10 ao longo do plano, easing in-out cúbico.
- **Punch-in:** troca instantânea para escala 1,25–1,75 com outro centro (no rosto ou no objeto); continua com push-in leve.
- **Shake:** 6–9 frames, amplitude 10–20 px, senoidal com frequências diferentes em x e y.
- **Flash:** quadro branco de 100% → 0% em 3–4 frames.
- **Whip:** 3 frames com borrão horizontal forte no início do plano novo (blur de ~40 px em x).
- **Pop de objeto/gráfico:** escala 0 → 1 em 0,25–0,32 s com overshoot (~10%).
- **Queda de objeto:** aceleração (y ∝ t²), rotação contínua e brilho acompanhando.
- **Quique:** parábolas com altura decrescendo (100% → 60% → 35%) e um contador a cada contato.

## Ritmo de corte
- **Corte no início da palavra-chave** de cada frase (use o tempo por palavra).
- Duração-alvo: **1,5–2,0 s por plano**. Frases longas: divida com punch-in.
- **Gags paralelas** (bloco 2) usam o mesmo enquadramento, para criar padrão.
- **Respiros** (0,5–1 s sem corte): só depois do "Só que…" e no último plano.
- **Loop:** o último plano termina com um enquadramento e uma cor que casam com o primeiro, para o replay automático parecer contínuo.

## Transições permitidas (por ordem de uso)
1. Corte seco (~90%)
2. Punch-in (corte dentro do mesmo plano)
3. Whip/borrão (mudança de lugar, 3–4 vezes no vídeo)
4. Match de ação (o objeto sai de um plano e entra no outro)
5. Flash branco (1–2 vezes, no impacto principal)
Evite dissolve, wipe com formas, cubo 3D e transições de template: quebram a linguagem do formato.
