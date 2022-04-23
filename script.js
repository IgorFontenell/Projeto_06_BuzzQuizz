const URL_QUIZZ = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
let contadorDisplay = 0;

contadorDisplay = 0;

let arrayRespostas = [0, 1, 2, 3];



telaCriaQuizz();


// Aqui nós estamos trocando o layout dos quizzes do usuário vazio pelo com conteúdo e vice-versa
function quizzesUsuarioLayout () {
    if (contadorDisplay >= 1) {
        let procuracao = document.querySelector(".quizzesVazio");
        procuracao.classList.add("escondido2");
        procuracao = document.querySelector(".quizzesOutroLayout");
        procuracao.classList.remove("escondido2");
    } else if (contadorDisplay === 0) {
        let procuracao = document.querySelector(".quizzesVazio");
        procuracao.classList.remove("escondido2");
        procuracao = document.querySelector(".quizzesOutroLayout");
        procuracao.classList.add("escondido2");
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
        procuracao.innerHTML = procuracao.innerHTML + 
                            `
                            <li>
                                <div class="quadradoClique" onclick="clicarQuizz(${quizzes[i].id})">
                                </div>
                                <div class="gradiente"></div>
                                    <img src=${quizzes[i].image} alt="Carregando imagem..." width="340px" height="180px"/>
                                    <span class="tituloQuizz">${quizzes[i].title}</span>
                            </li>`

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
// Funçao que ativa ao clicar no quizz e coloca aquele quizz clicado no html
function clicarQuizz (element) {


    let requisicao = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${element}`)
    trocaDeEscondidos("container2");

    requisicao.then(colocarNoDom);


}

function trocaDeEscondidos (classe) {
    console.log("Funcionou");
    let procuracao = document.querySelector(".escondido");
    while (procuracao !== null) {
        procuracao.classList.remove("escondido");
        procuracao = document.querySelector(".escondido");
        }
    procuracao = document.querySelector(".container");
    procuracao.classList.add("escondido");
    procuracao = document.querySelector(".sectionCriarQuizz");
    procuracao.classList.add("escondido");
    procuracao = document.querySelector(".container2");
    procuracao.classList.add("escondido");
    
    procuracao = document.querySelector(`.${classe}`);
    procuracao.classList.remove("escondido");
}

function colocarNoDom (response) {
    console.log(response.data);
    let parametro = response.data
    let perguntas = "";

    let procura = document.querySelector(".container2");
    procura.innerHTML = "" +
    `<div class="banner"> 
    <div class="gradientebanner">
        <span>${parametro.title}</span>
    </div>
    <img class="bannerquizz" src="${parametro.image}" alt="Imagem carregando">
</div>`;

    for (let i = 0; i < parametro.questions.length; i++) {
        let perguntaAtual = parametro.questions[i];
        arrayRespostas = shuffleArray(arrayRespostas);
        //Já colocamos o titulo geral do questionário agora escreveremos cada pergunta com as suas respostas aleatórias
        perguntas += 
        `<div class="pergunta1">
        <div class="titulopergunta" style="background-color: ${perguntaAtual.color};">
            <span>${perguntaAtual.title}</span>
        </div>`
        for (let i = 0; i < perguntaAtual.answers.length; i++) {
            console.log(perguntaAtual.answers[arrayRespostas[i]].image);
            perguntas += `
            <div class="resposta">
                <img src="${perguntaAtual.answers[arrayRespostas[i]].image}" alt="Imagem carregando" class="imgRespostas">
                <h6>${perguntaAtual.answers[arrayRespostas[i]].text}</h6>
            </div>`
        }
         
        perguntas += "</div>";
    
    }
    procura.innerHTML += `${perguntas}`;
    









}

function shuffleArray(inputArray){
   return inputArray.sort(()=> Math.random() - 0.5);
    
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
    if (inputQtdNiveis <= 2) {   
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

// Isso aqui é só pra caso dê algum bug a gente comparar com o html original
let verDepois = `<div class="pergunta1"> 
    <div class="titulopergunta">
        <span>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</span>
    </div>
    
    <div class="respostas">
        <div class="resposta">
            <img src="https://quatrorodas.abril.com.br/wp-content/uploads/2020/01/ford-mustang-gt350r-16.jpg?resize=650,434" alt="mustangao nervoso" class="imgRespostas">
            <h6>Mustangao brabo</h6>
        </div>
        <div class="resposta">
            <img src="https://quatrorodas.abril.com.br/wp-content/uploads/2020/01/ford-mustang-gt350r-16.jpg?resize=650,434" alt="mustangao nervoso" class="imgRespostas">
            <h6>Mustangao brabo</h6>
        </div>
       
    </div>
    <div class="respostas">
        <div class="resposta">
            <img src="https://quatrorodas.abril.com.br/wp-content/uploads/2020/01/ford-mustang-gt350r-16.jpg?resize=650,434" alt="mustangao nervoso" class="imgRespostas">
            <h6>Mustangao brabo</h6>
        </div>
        <div class="resposta">
            <img src="https://quatrorodas.abril.com.br/wp-content/uploads/2020/01/ford-mustang-gt350r-16.jpg?resize=650,434" alt="mustangao nervoso" class="imgRespostas">
            <h6>Mustangao brabo</h6>
        </div>
    </div>
</div>`;