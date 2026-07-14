// ==========================================
// DICAS PARA VOCÊ CONSTRUIR SEU SCRIPT
// ==========================================

// 1. Você vai precisar selecionar os elementos HTML:
//    - Os números do relógio (minutos e segundos)
//    - Os botões de Iniciar, Pausar e Zerar
//    - Os botões dos Modos (Foco, Pausa Curta, Pausa Longa)

const minutos = document.getElementById('minutes')
const segundos = document.getElementById('seconds')
const btn_iniciar = document.getElementById('btn-start')
const btn_pausar = document.getElementById('btn-pause')
const btn_zerar = document.getElementById('btn-reset')
const btn_foco = document.getElementById('mode-focus')
const btn_pausaCurta = document.getElementById('mode-short')
const btn_pausaLonga = document.getElementById('mode-long')


// 2. Variáveis importantes que você vai precisar criar:
//    let timer; // Para guardar a função setInterval()
//    let timeLeft = 25 * 60; // 25 minutos em segundos (1500 segundos)
//    let isRunning = false; // Para saber se o relógio está rodando ou pausado

// 3. Função de atualizar o relógio na tela:
//    Você precisará transformar os segundos totais (ex: 1500) no formato MM:SS.
//    Dica de matemática: 
//    minutos = Math.floor(timeLeft / 60)
//    segundos = timeLeft % 60
//    Dica extra: use .toString().padStart(2, '0') para garantir que sempre tenha 2 casas (ex: "05" em vez de "5")

// 4. Função Iniciar:
//    Vai usar o setInterval(função, 1000). A cada 1000ms (1 segundo), ela diminui 1 do timeLeft e atualiza a tela.
//    Se o timeLeft chegar a 0, você toca um som (opcional) e para o relógio com clearInterval(timer).

// 5. Troca de Modos (Botões do topo):
//    Quando o usuário clicar em "Pausa Curta", você pode mudar o fundo do site!
//    Exemplo: document.body.style.setProperty('--bg-color', '#4ca6a8');
//    E você altera o timeLeft para 5 * 60.

// Boa sorte na criação da lógica! A tela já está linda esperando o código rodar! 🚀
