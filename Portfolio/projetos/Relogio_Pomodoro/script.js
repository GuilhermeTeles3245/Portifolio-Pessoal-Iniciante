const elModeFocus = document.getElementById("mode-focus")
const elModeShort = document.getElementById("mode-short")
const elModeLong = document.getElementById("mode-long")
const elMinutes = document.getElementById("minutes")
const elSeconds = document.getElementById("seconds")
const elBtnStart = document.getElementById("btn-start")
const elBtnPause = document.getElementById("btn-pause")
const elBtnReset = document.getElementById("btn-reset")
const elStatus = document.getElementById("status")
let tempoRestante = 25 * 60;
let timerInterval = null; 
let timer = {foco: 25 * 60, pausaCurta: 5 * 60, pausaLonga: 15 * 60,}
let ativado = false;
const audioFoco = new Audio("./cano-de-metal-caindo.mp3");
const audioPausa = new Audio("./toby fox - UNDERTALE Soundtrack - 80 Finale.flac");



elModeFocus.addEventListener("click",() => {
    ativarModes(elModeFocus)
    pausarTimer()
    tempoRestante = timer["foco"]
    adicionarTempo(tempoRestante)
})

elModeShort.addEventListener("click",() => {
    ativarModes(elModeShort)
    pausarTimer()
    tempoRestante = timer["pausaCurta"]
    adicionarTempo(tempoRestante)
})

elModeLong.addEventListener("click",() => {
    ativarModes(elModeLong)
    pausarTimer()
    tempoRestante = timer["pausaLonga"]
    adicionarTempo(tempoRestante)
})

elBtnStart.addEventListener("click", () => {
    ativarBtn(elBtnStart)
    iniciarTimer()
})


elBtnPause.addEventListener("click", () => {
    ativarBtn(elBtnPause)
    pausarTimer()
})


elBtnReset.addEventListener("click", () => {
    ativarBtn(elBtnReset)
    zerarTime()
})

function ativarModes(div){
    document.querySelectorAll(".active").forEach((elemento)=>{
        elemento.classList.remove("active")
    })
    div.classList.add("active")
}

function adicionarTempo(time){
    const minutos = String(Math.floor(time / 60)).padStart(2, '0');
    const segundos = String(time % 60).padStart(2, '0');

    elMinutes.textContent = minutos;
    elSeconds.textContent = segundos;
    document.title = `🍅 ${minutos}:${segundos} - Pomodoro`;
}

function iniciarTimer(){
    if (timerInterval !== null) return;
    timerInterval = setInterval(() => {
        if(tempoRestante > 0) {
            tempoRestante = tempoRestante - 1
            adicionarTempo(tempoRestante)
        }
        else {
            pausarTimer()
            const modoAtivo = document.querySelector(".mode-btn.active")
            if (modoAtivo && modoAtivo.id === "mode-focus") {
                audioFoco.currentTime = 0;
                audioFoco.play();
            } else {
                audioPausa.currentTime = 0;
                audioPausa.play();
            }
        }
    },1000)
}

function zerarTime(){
    pausarTimer()
    audioFoco.currentTime = 0;
    audioPausa.currentTime = 0;
    const modoAtivo = document.querySelector(".mode-btn.active")
    if (modoAtivo && modoAtivo.id === "mode-short") {
        tempoRestante = timer["pausaCurta"]
    } else if (modoAtivo && modoAtivo.id === "mode-long") {
        tempoRestante = timer["pausaLonga"]
    } else {
        tempoRestante = timer["foco"]
    }
    adicionarTempo(tempoRestante)
}

function pausarTimer(){
    clearInterval(timerInterval)
    timerInterval = null
    audioFoco.pause();
    audioPausa.pause();
}

function ativarBtn(div){
    document.querySelectorAll(".control-btn").forEach((elemento) => {
        elemento.style.background = "transparent";
        elemento.style.color = "white";
        elemento.style.border = "2px solid white";
    })
    div.style.background = "white"
    div.style.color = "var(--bg-color)"
    div.style.boxShadow = "0 5px 15px rgba(255, 255, 255, 0.3)"
}

