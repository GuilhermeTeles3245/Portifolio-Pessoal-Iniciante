let caracteres = [];

let minusculas = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m',
    'n','o','p','q','r','s','t','u','v','w','x','y','z'
];

let letras_maiusculas = [
'A','B','C','D','E','F','G','H','I','J','K','L','M',
'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
];

let numeros = [
'0','1','2','3','4','5','6','7','8','9'
];

let simbolos = [
'!','@','#','$','%','&','*','(',')','-','_','=','+',
'[',']','{','}','|',';',':',"'",'"',',','.','<','>','/','?','`','~'
];

function gerarSenha() {

    let tamanho = incluir_tamanho();

    caracteres = [];

    caracteres = incluir_minusculas(caracteres);
    caracteres = incluir_numeros(caracteres);
    caracteres = incluir_maiusculo(caracteres);
    caracteres = incluir_simbolos(caracteres);

    if((caracteres.length === 0)||(tamanho > 100)){

        alert("Selecione pelo menos uma opção ou um tamanho menor que 100");
        return;

    }

    let senha = criarSenha(tamanho, caracteres);

    console.log(senha);

    document.getElementById("senha").value = senha;

}

function incluir_tamanho() {

    return parseInt(document.getElementById("tamanho").value);

}

function incluir_minusculas(caracteres) {

    let escolha = document.getElementById("minusculas").checked;

    if (escolha){

        for (let i = 0; i < minusculas.length; i++) {

            caracteres.push(minusculas[i]);

        }

    }

    return caracteres;

}

function incluir_numeros(caracteres) {

    let escolha = document.getElementById("numeros").checked;

    if (escolha){

        for (let i = 0; i < numeros.length; i++) {

            caracteres.push(numeros[i]);

        }

    }

    return caracteres;

}

function incluir_maiusculo(caracteres) {

    let escolha = document.getElementById("maiusculas").checked;

    if (escolha){

        for (let i = 0; i < letras_maiusculas.length; i++) {

            caracteres.push(letras_maiusculas[i]);

        }

    }

    return caracteres;

}

function incluir_simbolos(caracteres) {

    let escolha = document.getElementById("simbolos").checked;

    if (escolha){

        for (let i = 0; i < simbolos.length; i++) {

            caracteres.push(simbolos[i]);

        }

    }

    return caracteres;

}

function criarSenha(tamanho, caracteres) {

    let senha = "";

    for (let i = 0; i < tamanho; i++){

        let caractere = Math.floor(Math.random() * caracteres.length);

        senha += caracteres[caractere];

    }

    return senha;

}

function copiarSenha() {

    let senha = document.getElementById("senha");

    senha.select();

    document.execCommand("copy");

    alert("Senha copiada!");

}