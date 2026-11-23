# Shot list

Uma linha por plano (ou por punch-in). Os tempos vêm do `words.json`: o plano começa no início da palavra-chave da frase.

| # | Início (s) | Fala / legenda | Cenário | Enquadramento + câmera | Personagens (expressão/pose) | Gráfico na tela | SFX | Trilha |
|---|---|---|---|---|---|---|---|---|

## Exemplo (início de "Lia Ovo-Branco")
| # | Início | Fala | Cenário | Câmera | Personagens | Gráfico | SFX | Trilha |
|---|---|---|---|---|---|---|---|---|
| 1 | 0,00 | Nessa vila, toda galinha | rua | geral; tilt acompanhando o ovo caindo, push 1,05→1,18 | — | ovo de ouro girando + brilhos | whoosh | ato 1 entra |
| 2 | 1,90 | bota ovo de ouro. | rua | médio na galinha, push | galinha marrom, olho arregalado no "ouro" | ovo surge com pop + anel | plim (2,6) | |
| 3 | 3,40 | A do seu Zé espirrou: plim! | rua | médio 2 personagens | Seu Zé segurando a galinha → arregalado; galinha "> <" no espirro + tremida | "ATCHIM!" carimbo branco | espirro, plim (5,1) | |
| 4 | 5,80 | Ovo de ouro. | rua | close do Zé (whip na entrada) | Zé rindo com o ovo nas mãos | "PLIM!" amarelo | whoosh, pop | |
| 5 | 7,20 | A do padeiro tropeçou: | rua | médio | padeiro com as mãos no rosto; galinha tropeça no rolo de massa | linhas de movimento | thud | |
| 6 | 8,95 | plim, plim! Dois. | rua | médio → punch-out no "Dois" | galinha arregalada | 2 ovos com pop + pílula "x2" | plim ×2, pop | |
| … | | | | | | | | |
| 22 | 53,45 | Só que ninguém lembrou de um detalhe: | praça escura | zoom lento até o ovo, 1,0→1,6 | multidão estátua | vinheta escura | scratch + tique-taque | **corta** |

A shot list completa, em código, está em `assets/engine/scenes.js` (cada `shot(...)` é uma linha).
