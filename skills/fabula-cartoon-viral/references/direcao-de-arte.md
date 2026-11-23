# Direção de arte: bíblia visual

## 1. Ficha de personagem (preencha para cada um)
```
NOME / FUNÇÃO: (protagonista | bordão | autoridade | gag | multidão)
SILHUETA: (acessório icônico na cabeça: coques, turbante, cartola, chapéu de palha, touca de chef, boné)
COR DA ROUPA (fixa): #hex   | COR SECUNDÁRIA: #hex
PELE: #hex   | CABELO: #hex
EXPRESSÃO-ASSINATURA: (ex.: deadpan semicerrado)
POSES MAIS USADAS: (mãos na cintura, braços para cima, segurando objeto…)
OBJETO DE CENA: (o que ele carrega/usa)
```

## 2. Proporções do boneco (em unidades; a altura total é ~620 com os pés em 0)
| Parte | Medida |
|---|---|
| Cabeça | elipse 256×244, centro em y = -425 (~45% da altura) |
| Olhos | ovais 66×80, centros em x = ±48, com pupila r = 17 e brilho r = 5 |
| Bochechas | elipses rosa (#ff7b8a, 45% de opacidade) em x = ±80, logo abaixo dos olhos |
| Tronco | retângulo arredondado 196×190 (y de -305 a -115), raio 46 |
| Pernas | 50×128, separadas; vestido: trapézio até y = -88 |
| Sapatos | gota larga, sola com faixa branca |
| Braços | curva contínua, espessura 31 + contorno 46, mão redonda r = 25 |
| Contorno | 7 px em #2a2233, cantos arredondados |
Personagens "maiores" (prefeito, padeiro): tronco ×1,15–1,3 de largura, mesma cabeça.

## 3. Expressões (combinações olho + boca + sobrancelha)
| Emoção | Olhos | Boca | Sobrancelha |
|---|---|---|---|
| Deadpan/ironia | semicerrados, pupila baixa | linha reta | reta |
| Decepção | semicerrados | arco para baixo | inclinada triste |
| Surpresa | arregalados, pupila pequena | "O" | levantada |
| Alegria | "^" fechados | aberta com língua | levantada |
| Esforço | "> <" | ondulada / dentes | franzida + rosto vermelho + suor |
| Medo | arregalados | dentes cerrados | levantada |
| Cobiça | moedas/ovos no lugar das pupilas | aberta | levantada |
| Cumplicidade | olhar de lado | sorriso torto | uma levantada |

**Regra de atuação:** troque a expressão a cada frase e mexa as pupilas em direção ao que está sendo citado. Personagem parado também atua: balanço leve (squash/stretch de 1–2% a ~1,4 Hz) e piscada a cada ~3 s.

## 4. Paleta-base (hex)
- Contorno: `#2a2233`
- Céu: `#7fd3e8` → `#c9eef0` → `#fff4d9`
- Chão: `#f6e2b8` (ondas `#ecd09a`)
- Morros: `#a8dba0`, `#88c98a`, `#7cc287`
- Casas: `#ffb4a2`, `#ffd88a`, `#a8d8ff`, `#c7b8ff`, `#ffe9c7`, `#b5ead7`; telhados `#e86a4f`, `#5b7bd5`
- Destaque/legenda: `#ff5a1f`; prêmio dourado `#fff07a → #ffc927 → #e8960c`
- Roupas sugeridas: roxo `#6c5ce7`, verde `#2fae7f`, rosa `#ef476f`, azul `#3d9be9`, laranja `#ff9f1c`, vermelho `#e63946`
- Drama: vinheta `#140c20` (até 85%); holofote `#fff6c8`
Para o nicho do usuário, troque **só** as cores de destaque e das roupas pelas da marca, e mantenha céu, chão e contorno. É isso que preserva a "cara" do formato.

## 5. Cenários (kit mínimo)
1. Rua/praça com casas pastel, igreja/torre, árvores redondas amarelas e verdes, chão com ondas.
2. Interior: cozinha com azulejo menta, piso xadrez, janela com cortina, relógio e mesa com toalha xadrez.
3. Lugar da autoridade: gabinete (bandeira, mesa de madeira, brasão), rádio ("NO AR") ou TV (moça do tempo).
4. Fundo chapado para close de objeto (creme, pêssego).
5. Plano aberto: morro, lago ou estrada.
6. Multidão em 2 fileiras (a de trás menor e mais alta na tela).
Adapte os cenários ao nicho (escritório, academia, loja), mas mantenha a lógica: **1 cenário-base dominante + 3–5 de apoio**.

## 6. Gráficos
- **Pílula:** retângulo de raio total, fundo `#fff8ec`, contorno de 9 px, texto laranja em fonte display arredondada (Lilita One), inclinação -4°, sombra deslocada 10 px.
- **Carimbo HQ:** fonte display, amarelo `#ffd23f` (ou vermelho `#ff5a5f` para problema, creme `#fff8ec` para ironia), contorno de 12% do tamanho da fonte, sombra, inclinação ±6°, pop com overshoot e leve balanço contínuo.
- **Contadores:** círculo creme com número escuro.
- **Partículas:** estrela de 4 pontas branca; anel de impacto branco que expande e some em ~0,9 s; confete retangular colorido; suor azul claro; linhas de movimento brancas.
