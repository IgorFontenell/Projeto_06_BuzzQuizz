const URL_QUIZZ = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
let contadorDisplay = 0;

contadorDisplay = 0;



telaCriaQuizz();


// Aqui nós estamos trocando o layout dos quizzes do usuário vazio pelo com conteúdo e vice-versa
function quizzesUsuarioLayout () {
    if (contadorDisplay >= 1) {
        let procuracao = document.querySelector(".quizzesVazio");
        procuracao.classList.add("escondido");
        procuracao = document.querySelector(".quizzesOutroLayout");
        procuracao.classList.remove("escondido");
    } else if (contadorDisplay === 0) {
        let procuracao = document.querySelector(".quizzesVazio");
        procuracao.classList.remove("escondido");
        procuracao = document.querySelector(".quizzesOutroLayout");
        procuracao.classList.add("escondido");
    }
}
quizzesUsuarioLayout();


// Vamos pegar os quizzes que estão no servidor e coloca-los no html
function pegarQuizzes () {

let requisicao = axios.get(URL_QUIZZ);
requisicao.then(colocarQuizzes);
requisicao.catch(erroPegarMsg);


}
pegarQuizzes();


function colocarQuizzes (response) {

    let quizzes = response.data;
    
    for (let i = 0; i < quizzes.length; i++ ) {
        let procuracao = document.querySelector(".quizzesPublicos").querySelector("ul")
        procuracao.innerHTML = procuracao.innerHTML + `
                    <a href="index.html" target="_blanck">
                            <li>
                                <div class="gradiente"></div>
                                    <img src=${quizzes[i].image} alt="" width="340px" height="180px"/>
                                    <span class="tituloQuizz">${quizzes[i].title}</span>
                            </li>
                    </a>`

    }

}

function erroPegarMsg() {
    alert("Alguma coisa deu errado na hora de pegar as mensagens");

}


function criarQuizzSection(){

    const telaPrincipal = document.querySelector('.quizzes');

    const criaQuizz = document.querySelector('.sectionCriarQuizz');

    const quizzes = document.querySelector('.quizzes')

    criaQuizz.classList.remove('escondido');
    telaPrincipal.classList.add('escondido');
    quizzes.classList.add('escondido');

}

function voltaTelaInicial(){
   
    location.reload();
}

function telaCriaQuizz(){

    //ESSA FUNCAO ESTA RENDERIZANDO A PAGINA DE CRIACAO DE QUIZZ TELA 3 //
    const sectionCriaQuizz = document.querySelector('.sectionCriarQuizz');

    sectionCriaQuizz.innerHTML =`<div class="secao3-container">
                
                <h4>Comece pelo começo</h4>
                <div class="input-blocks">
                    <input class='inputQuizz' id="input1" type="text" maxlength="65" placeholder="Título do seu Quizz aqui">
                    <input class='inputQuizz' id="input2" type="url" placeholder="URL do banner do seu quizz">
                    <input class='inputQuizz' id="input3" type="number" placeholder="Quantidade de perguntas do quizz">
                    <input class='inputQuizz' id="input4" type="number" placeholder="Quantidade de niveis do quizz">

                    <button class="btn-criarquizz" onclick="telaCriaQuizz2()">Prosseguir para criar perguntas</button>
                    <h7 onclick="voltaTelaInicial()">VOLTAR A TELA INICIAL QUIZZ</h7>
                </div>
   
    </div>`

}

function telaCriaQuizz2(){

    //ESSA FUNCAO ESTA RENDIRIZANDO A PROXIMA PAGINA DE CRIACAO COM OS VALORES DINAMICOS RECEBIDOS DO INPUT DA TELA ANTERIOR.
    const inputTitulo = document.getElementById('input1').value;
    const inputURL = document.getElementById('input2').value;
    const inputQtdPerguntas = document.getElementById('input3').value;
    const inputQtdNiveis = document.getElementById('input4').value;

    let controle = 0;

    if (inputTitulo.length < 20){
        alert ("Por favor digite o titulo respeitando o minimo de caracteres - [20 CARACTERES NO MINIMO]");
    } else controle += 1;
    if (inputURL === ''){   
        alert ("Por favor adcionar um URL VALIDA");
    } else controle += 1;
    if ((!Number.isInteger(inputQtdPerguntas)) && (inputQtdPerguntas < 3)){   
        alert ("Entre com um valor válido para quantidade de Perguntas [NUMERO INTEIRO MAIOR QUE 3]");
    } else controle += 1;
    if (inputQtdNiveis < 2) {   
        alert ("Entre com a Quantidade de niveis válido [NUMERO INTEIRO MAIOR QUE 2]");
    } else controle += 1;
    
    if (controle == 4){
        telaCriarPerguntas(inputQtdPerguntas);
    } 

}


function telaCriarPerguntas(qtdPerguntas){
   
    const sectionCriaQuizz = document.querySelector('.sectionCriarQuizz');
    sectionCriaQuizz.classList.add('escondido');

    const perguntas = document.querySelector('.sectionCriarQuizz2');
    perguntas.classList.remove('escondido');

    const botaoHabilitar = document.querySelector('.btn-criarquizz');
    botaoHabilitar.classList.remove('escondido');

    perguntas.innerHTML += `<h4>Crie as suas perguntas</h4>`

    for(let i=0; i < qtdPerguntas; i++){

            perguntas.innerHTML += `
            <div class="secao3-container">
                    
                <div class="perguntasCreate">
                    
                    <div class="perguntaMinimizada">
                        <h4>Pergunta ${i+1}</h4>
                        <ion-icon name="create-outline"></ion-icon>
                    </div>

                    <section class="inputsPerguntas escondido">
                        <input class="inputCriacaoPerguntas" type="text" placeholder="Texto da pergunta">
                        <input class="inputCriacaoPerguntas" type="text" placeholder="Cor de fundo da pergunta">
                        
                        <h4>Resposta Correta</h4>
                        <input class="inputCriacaoPerguntas" type="text" placeholder="Resposta Correta">
                        <input class="inputCriacaoPerguntas" type="url" placeholder="URL da imagem">

                        <h4>Respostas Incorretas</h4>
                        <input class="inputCriacaoPerguntas" type="text" placeholder="Resposta Incorreta 1">
                        <input class="inputCriacaoPerguntas" type="text" placeholder="URL da imagem 1">
                        
                        <input class="inputCriacaoPerguntas" type="text" placeholder="Resposta Incorreta 2">
                        <input class="inputCriacaoPerguntas" type="text" placeholder="URL da imagem 2">
                        
                        <input class="inputCriacaoPerguntas" type="text" placeholder="Resposta Incorreta 3">
                        <input class="inputCriacaoPerguntas" type="text" placeholder="URL da imagem 3">
                    </section>
                       
                </div>
            </div>`
    }

        perguntas.innerHTML += `<button class="btn-criarquizz" onclick="telaCriaQuizz2()">Prosseguir para criar Níveis</button>
        <h7 onclick="voltaTelaInicial()">VOLTAR A TELA INICIAL QUIZZ</h7>`
        
}


