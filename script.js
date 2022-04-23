const URL_QUIZZ = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
let contadorDisplay = 0;

contadorDisplay = 0;

let arrayRespostas = [0, 1, 2, 3];






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
    console.log(quizzes);
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

    const telaPrincipal = document.querySelector('.container');
    const criaQuizz = document.querySelector('.sectionCriarQuizz');
    criaQuizz.classList.remove('escondido');
    telaPrincipal.classList.add('escondido');

}

function voltaTelaInicial(){
    const telaPrincipal = document.querySelector('.container');
    const criaQuizz = document.querySelector('.sectionCriarQuizz');
    criaQuizz.classList.add('escondido');
    telaPrincipal.classList.remove('escondido');
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