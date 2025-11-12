function calcularValorFinal() {
    const inputValor = document.querySelector('#valor');
    const selectFormaPagamento = document.querySelector('#tipo_pagamento');
    const divResultado = document.querySelector('#resultado');

    if (!inputValor || !selectFormaPagamento || !divResultado) return;

    // aceita vírgula ou ponto
    const raw = (inputValor.value || '').toString().replace(',', '.').trim();
    const valor = parseFloat(raw);
    const tipo_pagamento = (selectFormaPagamento.value || '').trim();

    if (isNaN(valor) || valor <= 0) {
        divResultado.innerHTML = `<p style="color:#FF6347">Por favor, digite um valor válido.</p>`;
        return;
    }
    if (!tipo_pagamento) {
        divResultado.innerHTML = `<p style="color:#FF6347">Por favor, selecione a forma de pagamento.</p>`;
        return;
    }

    let valorFinal = valor;
    let corTexto = '#ffa600e8'; // padrão laranja
    let mensagemAjuste = '';

    // lógica com if/else compatível com os value do select do HTML
    if (tipo_pagamento === 'dinheiro') {
        valorFinal = valor * 0.90; // 10% desconto
        corTexto = '#008000'; // verde
        mensagemAjuste = `(Desconto de 10%: R$ ${(valor - valorFinal).toFixed(2).replace('.', ',')})`;
    } else if (tipo_pagamento === 'cartao_credito') {
        valorFinal = valor * 1.05; // 5% acréscimo
        corTexto = '#cc0000'; // vermelho
        mensagemAjuste = `(Acréscimo de 5%: R$ ${(valorFinal - valor).toFixed(2).replace('.', ',')})`;
    } else if (tipo_pagamento === 'parcelado2x') {
        valorFinal = valor; // sem acréscimo
        corTexto = '#ffa600fa'; // laranja
        mensagemAjuste = `(Parcelado em 2x - Sem acréscimo)`;
    } else if (tipo_pagamento === 'parcelado3x') {
        valorFinal = valor * 1.10; // 10% acréscimo
        corTexto = '#cc0000'; // vermelho
        mensagemAjuste = `(Acréscimo de 10%: R$ ${(valorFinal - valor).toFixed(2).replace('.', ',')})`;
    } else if (tipo_pagamento === 'masde3x') {
        valorFinal = valor * 1.10; // considera 10% para mais de 3x
        corTexto = '#cc0000'; // vermelho
        mensagemAjuste = `(Acréscimo de 10%: R$ ${(valorFinal - valor).toFixed(2).replace('.', ',')})`;
    } else {
        valorFinal = valor;
        corTexto = '#FFA500';
        mensagemAjuste = `Forma de pagamento desconhecida.`;
    }

    divResultado.innerHTML = `
        <p style="color: ${corTexto};">
            Valor Final: R$ ${valorFinal.toFixed(2).replace('.', ',')}<br>
            ${mensagemAjuste}
        </p>
    `;
}

// conecta botões/enter sem modificar o HTML
document.addEventListener('DOMContentLoaded', function () {
    const botao = document.querySelector('#gerar-dica-btn');
    const inputValor = document.querySelector('#valor');

    if (botao) botao.addEventListener('click', calcularValorFinal);
    if (inputValor) {
        inputValor.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') calcularValorFinal();
        });
    }
});