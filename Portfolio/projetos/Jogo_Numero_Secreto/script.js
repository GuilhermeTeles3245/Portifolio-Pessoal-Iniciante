const elPalpite = document.getElementById('palpite');
const elBtnChutar = document.getElementById('btn-chutar');
const elMensagem = document.getElementById('mensagem');
const elTentativas = document.getElementById('tentativas');
const elStatusJogo = document.getElementById('status-jogo');
const elBtnReiniciar = document.getElementById('btn-reiniciar');

const constantes = [elPalpite, elBtnChutar, elMensagem, elTentativas, elStatusJogo, elBtnReiniciar]

constantes.forEach(constante => {
    console.log(constante)
})

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;

let palpite = parseInt(elPalpite.value);

console.log(palpite);
console.log(numeroSecreto);

function iniciarJogo() {
    let chute = parseInt(elPalpite.value);
    if (!chute || chute < 1 || chute > 100){
        elMensagem.textContent = "Por Favor, digite um número de 1 a 100"
        return;
    } else if (chute > numeroSecreto) {
        elMensagem.textContent = `O número secreto é menor que ${chute}`
        tentativas++;
    } else if (chute < numeroSecreto) {
        elMensagem.textContent = `O número secreto é maior que ${chute}`
        tentativas++;
    } else {
        elMensagem.textContent = `Parabéns, você adivinhou o número ${numeroSecreto} em ${tentativas} tentativas`
        elStatusJogo.textContent = "Finalizado"
        elBtnChutar.disabled = true;
        elBtnReiniciar.disabled = false;
        return;
    }
    elTentativas.textContent = tentativas;
}

function reiniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    elTentativas.textContent = tentativas;
    elBtnChutar.disabled = false;
    elBtnReiniciar.disabled = true;
    elMensagem.textContent = "Faça o seu primeiro palpite!";
    elStatusJogo.textContent = "Jogando";
    elPalpite.value = "";
}

elBtnChutar.addEventListener("click", iniciarJogo);
elBtnReiniciar.addEventListener("click", reiniciarJogo);

elPalpite.addEventListener("keypress",(evt) => {
    if(evt.key === "Enter"){
        iniciarJogo();
    }
})