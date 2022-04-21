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