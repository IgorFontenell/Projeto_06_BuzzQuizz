const URL_QUIZZ = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
let contadorDisplay = 0;

contadorDisplay = 0;






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
    console.log(quizzes);
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










