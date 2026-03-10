let jogadas = ["✊", "📄", "✂️"]

function jogada_maquina() {
    computador = document.getElementById("player-choice").innerHTML
    computador = jogadas[Math.floor(Math.random() * jogadas.length)]
    console.log(`Jogada da máquina: ${computador}`)
    return computador
}

function jogada_pedra() {
    jogador = document.getElementById("rock").innerHTML
    console.log(`Jogada do jogador: ${jogador}`)
    resultado()
    tabela()
}

function jogada_papel() {
    jogador = document.getElementById("paper").innerHTML
    console.log(`Jogada do jogador: ${jogador}`)
    resultado()
    tabela()
}

function jogada_tesoura() {
    jogador = document.getElementById("scissors").innerHTML
    console.log(`Jogada do jogador: ${jogador}`)
    resultado()
    tabela()
}

function resultado() {
    document.getElementById("player-choice").innerHTML = jogador
    document.getElementById("computer-choice").innerHTML = jogada_maquina()
}

// Parte da matemática
function tabela() {
    tabela_jogador = document.getElementById("player-score").innerHTML
    tabela_computador = document.getElementById("computer-score").innerHTML

    jogador_resultado = document.getElementById("player-choice").innerHTML
    computador_resultado = document.getElementById("computer-choice").innerHTML

    if (jogador_resultado === computador_resultado) {
        console.log("Empate")
        document.getElementById("winner").innerHTML = ""
        document.getElementById("winner").innerHTML += "Vencedor: EMPATE!"
        return
    }

    if (jogador_resultado === "✊") {
        if (computador_resultado === "✂️") {
            tabela_jogador++
            document.getElementById("player-score").innerHTML = tabela_jogador
            console.log("")
            console.log("jogador venceu")
            console.log("")
            document.getElementById("winner").innerHTML = ""
            document.getElementById("winner").innerHTML += "Vencedor: JOGADOR!"
        } else {
            tabela_computador++
            document.getElementById("computer-score").innerHTML = tabela_computador
            console.log("")
            console.log("computador venceu")
            console.log("")
            document.getElementById("winner").innerHTML = ""
            document.getElementById("winner").innerHTML += "Vencedor: COMPUTADOR!"
        }
    } else if (jogador_resultado === "📄") {
        if (computador_resultado === "✊") {
            tabela_jogador++
            document.getElementById("player-score").innerHTML = tabela_jogador
            console.log("")
            console.log("jogador venceu")
            console.log("")
            document.getElementById("winner").innerHTML = ""
            document.getElementById("winner").innerHTML += "Vencedor: JOGADOR!"
        } else {
            tabela_computador++
            document.getElementById("computer-score").innerHTML = tabela_computador
            console.log("")
            console.log("computador venceu")
            console.log("")
            document.getElementById("winner").innerHTML = ""
            document.getElementById("winner").innerHTML += "Vencedor: COMPUTADOR!"
        }
    } else if (jogador_resultado === "✂️") {
        if (computador_resultado === "📄") {
            tabela_jogador++
            document.getElementById("player-score").innerHTML = tabela_jogador
            console.log("")
            console.log("jogador venceu")
            console.log("")
            document.getElementById("winner").innerHTML = ""
            document.getElementById("winner").innerHTML += "Vencedor: JOGADOR!"

        } else {
            tabela_computador++
            document.getElementById("computer-score").innerHTML = tabela_computador
            console.log("")
            console.log("computador venceu")
            console.log("")
            document.getElementById("winner").innerHTML = ""
            document.getElementById("winner").innerHTML += "Vencedor: COMPUTADOR!"
        }
    }

    console.log(`Tabela do jogador:    ${tabela_jogador}`)
    console.log(`Tabela do computador: ${tabela_computador}`)
}

function reiniciar() {
    document.getElementById("player-score").innerHTML = 0
    document.getElementById("computer-score").innerHTML = 0
    document.getElementById("player-choice").innerHTML = ""
    document.getElementById("computer-choice").innerHTML = ""
}