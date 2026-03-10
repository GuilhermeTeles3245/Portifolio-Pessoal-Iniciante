function embaralhar() {

    var materias = document.getElementById("playlist-input").value
        .split(",")
        .map(function(item){
            return item.trim();
        });

    var numeros = document.getElementById("number-input").value
        .split(",")
        .map(function(item){
            return Number(item.trim());
        });

    var temas = juntar(materias, numeros);
    if (!temas) return;

    var sobrando = resultado(temas);
    adicionar_resultado(sobrando);
}

function juntar(materias, numeros){

    if (materias.length !== numeros.length) {
        console.log("Os arrays têm tamanhos diferentes!");
        return;
    }

    var Tema = [];

    for (var i = 0; i < materias.length; i++) {
        Tema[i] = [materias[i], numeros[i]];
    }

    return Tema;
}

function resultado(temas){

    var sobrando = [];
    var temas_cursos = [];
    var numeros_cursos = [];

    if (!temas || temas.length <= 0) return;

    for (var i = 0; i < temas.length; i++) {
        temas_cursos.push(temas[i][0]);
        numeros_cursos.push(Number(temas[i][1]));
    }

    var total = numeros_cursos.reduce(function(soma, n){
        return soma + n;
    }, 0);

    for (var contador = 0; contador < total; contador++) {
        for (var i = 0; i < temas.length; i++) {

            if (numeros_cursos[i] > 0) {
                sobrando.push(temas_cursos[i]);
                numeros_cursos[i]--;
                break;
            }
        }
    }

    return sobrando;
}

function adicionar_resultado(sobrando){

    if (!sobrando || sobrando.length === 0) return;

    var resultados = document.getElementById("exemplo-lista");
    resultados.innerHTML = "";

    var ordem = 1;

    // ✅ contador de repetições por matéria
    var contador = {};

    while (sobrando.length > 0){

        var aleatorio = Math.floor(Math.random() * sobrando.length);
        var materia = sobrando[aleatorio];

        // cria ou incrementa contador
        if (contador[materia] == null) {
            contador[materia] = 1;
        } else {
            contador[materia]++;
        }

        var item = document.createElement("span");

        // ✅ adiciona número da aula
        item.textContent = ordem + "º " + materia + " - " + contador[materia];

        resultados.appendChild(item);

        sobrando.splice(aleatorio, 1);
        ordem++;
    }
}