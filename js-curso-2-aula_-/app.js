//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto.';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 a 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMensagemInicial(){
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10: ');    
}

//iniciar a funçao para ser chamada em outras partes do codigo
exibirMensagemInicial();

// function verificarChute(){
//     let chute = document.querySelector('input').value;
//     //alert(chute == numeroSecreto);
//     if(chute == numeroSecreto){
//         exibirTexto('h1', 'Acertou');
//         exibirTexto('p', 'Voçê descobriu o número secreto! ');
//     }else{
//         if(chute > numeroSecreto){
//             exibirTexto('p', 'O número secreto é menor.');
//         }else{
//             exibirTexto('p', 'O número secreto é maior.');
//         }
//     }
// }



//funcao para verificar se acertou o numero aleatorio
function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTexto('h1', 'Acertou');

        let palavraTentativa =  tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Voçê descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p',mensagemTentativas);

        //botao reiniciar o jogo
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTexto('p', 'O número secreto é menor!');
        }else{
            exibirTexto('p', 'O número secreto é maior!.');
        }

        tentativas++;
        //limpar o campo de tentativas
        limparCampo();
    }
}

//funcao para gerar um numero aleatorio
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        
        return numeroEscolhido;
    }
}

//funcao para limpar o campo tentativas
function limparCampo(){
        chute = document.querySelector('input');
        chute.value = '';
}

//funçao para trataro botao reiniciar jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    // exibirTexto('h1', 'Jogo do número secreto');
    // exibirTexto('p', 'Escolha um número entre 1 e 10: ');
    exibirMensagemInicial();

    //deixa o otao novo jogo desabilitado ate o jogo ser finalizado
    document.getElementById('reiniciar').setAttribute('disabled', true);
}