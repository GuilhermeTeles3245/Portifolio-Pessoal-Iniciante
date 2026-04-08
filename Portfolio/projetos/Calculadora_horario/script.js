document.getElementById('trocar').addEventListener('click', function() {
    // Captura os valores e garante que sejam números
    const ano = parseFloat(document.getElementById('ano').value) || 0;
    const mes = parseFloat(document.getElementById('mes').value) || 0;
    const dia = parseFloat(document.getElementById('dia').value) || 0;
    const hora = parseFloat(document.getElementById('hora').value) || 0;
    const minuto = parseFloat(document.getElementById('minuto').value) || 0;
    const segundo = parseFloat(document.getElementById('segundo').value) || 0;

    // Constantes de conversão (médias)
    const segPorMin = 60;
    const segPorHora = 3600;
    const segPorDia = 86400;
    const segPorMes = 2629743; // Média de 30.44 dias
    const segPorAno = 31536000; // 365 dias

    // Converte tudo para a unidade base: Segundos
    const totalSegundos = 
        (ano * segPorAno) + 
        (mes * segPorMes) + 
        (dia * segPorDia) + 
        (hora * segPorHora) + 
        (minuto * segPorMin) + 
        segundo;

    const unidadeAlvo = document.getElementById('escolha').value;
    let resultado = 0;

    // Converte de segundos para a unidade selecionada
    switch (unidadeAlvo) {
        case 'Ano': resultado = totalSegundos / segPorAno; break;
        case 'Mês': resultado = totalSegundos / segPorMes; break;
        case 'Dia': resultado = totalSegundos / segPorDia; break;
        case 'Hora': resultado = totalSegundos / segPorHora; break;
        case 'Minuto': resultado = totalSegundos / segPorMin; break;
        case 'Segundo': resultado = totalSegundos; break;
    }

    // Exibe o resultado com formatação
    document.getElementById('saida').value = resultado.toFixed(2);
});