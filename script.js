const URL_QUIZZ = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
let regex = new RegExp(expression); //EXPRESSAO PARA VERIFICAR A URL.
let contadorDisplay = 0;
let qtdNiveis = 0;
contadorDisplay = 0;

let arrayRespostas_Numero = [];

telaCriaQuizz();

// Aqui nós estamos trocando o layout dos quizzes do usuário vazio pelo com conteúdo e vice-versa
function quizzesUsuarioLayout () {
    if (contadorDisplay >= 1) {
        let procuracao = document.querySelector(".quizzesVazioSuperior");
        procuracao.classList.add("escondido");
        procuracao = document.querySelector(".quizzesOutroLayout");
        procuracao.classList.remove("escondido");
    } else if (contadorDisplay === 0) {
        let procuracao = document.querySelector(".quizzesVazioSuperior");
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
    if(confirm('Tem certeza que deseja cancelar e voltar à pagina inicial do BUZZQUIZZ?')){
        location.reload();
    }
    
}

// Funçao que ativa ao clicar no quizz e coloca aquele quizz clicado no html
function clicarQuizz (element) {


    let requisicao = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${element}`)
    trocaDeEscondidos();

    requisicao.then(colocarNoDom);


}

function trocaDeEscondidos () {

    console.log("Funcionou");
    let quizz = document.querySelector(".quizzes");
    
    let criarQuizz = document.querySelector(".sectionCriarQuizz");

    let jogoQuiz = document.querySelector(".jogoDoQuiz");

    quizz.classList.add("escondido");
    criarQuizz.classList.add("escondido");
    jogoQuiz.classList.remove("escondido");

}

function colocarNoDom (response) {
    let parametro = response.data;
    let perguntas = "";

    let procura = document.querySelector(".jogoDoQuiz");
    procura.innerHTML = "" +
    `<div class="banner"> 
    <div class="gradientebanner">
        <span>${parametro.title}</span>
    </div>
    <img class="bannerquizz" src="${parametro.image}" alt="Imagem carregando">
</div>`;

    for (let i = 0; i < parametro.questions.length; i++) {
        let perguntaAtual = parametro.questions[i];
        

        arrayRespostas_Numero = parametro.questions[i].answers;
        arrayRespostas_Numero = shuffleArray(arrayRespostas_Numero);

        //Já colocamos o titulo geral do questionário agora escreveremos cada pergunta com as suas respostas aleatórias
        perguntas += 
        `
        <div class="pergunta1">
        <div class="titulopergunta opaco" style="background-color: ${perguntaAtual.color};">
            <span>${perguntaAtual.title}</span>
        </div>`;
        for (let t = 0; t < arrayRespostas_Numero.length; t++) {
            
            perguntas += `
            
            <div class="resposta" onclick="clicarResposta(this, ${arrayRespostas_Numero[t].isCorrectAnswer})">
                <img src="${arrayRespostas_Numero[t].image}" alt="Imagem carregando" class="imgRespostas">
                <h6>${arrayRespostas_Numero[t].text}</h6>
            </div>`;
            
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
    const sectionCriaQuizz = document.querySelector('.quizzes');

    sectionCriaQuizz.innerHTML =`<div class="secao3-container">
                
                <h4>Comece pelo começo</h4>
                <div class="input-blocks">
                    <input class='inputQuizz' id="input1" type="text" maxlength="65" placeholder="Título do seu Quizz aqui">
                    <input class='inputQuizz' id="input2" type="url" placeholder="URL do banner do seu quizz">
                    <input class='inputQuizz' id="input3" type="number" placeholder="Quantidade de perguntas do quizz">
                    <input class='inputQuizz' id="input4" type="number" placeholder="Quantidade de niveis do quizz">

                    <button class="btn-criarquizz" onclick="telaCriaQuizz2()">Prosseguir para criar perguntas</button>
                    <h7 onclick="voltaTelaInicial()">VOLTAR A TELA INICIAL BUZZQUIZZ</h7>
                </div>
   
    </div>`

    qtdPerguntasGlobal = document.getElementById('input3').value;
    

}

function telaCriaQuizz2(){
    
    //ESSA FUNCAO ESTA RENDIRIZANDO A PROXIMA PAGINA DE CRIACAO COM OS VALORES DINAMICOS RECEBIDOS DO INPUT DA TELA ANTERIOR.
    
    const inputTitulo = document.getElementById('input1').value;
    const inputURL = document.getElementById('input2').value;
    const inputQtdPerguntas = document.getElementById('input3').value;
    const inputQtdNiveis = document.getElementById('input4').value;

    let controle = 0;

    if (inputTitulo.length < 20){
        alert ("Título do quiz deve ter no mínimo 20 e no máximo 65 caracteres");
    } else controle += 1;
    if (!inputURL.match(regex)){   
        alert ("URL da Imagem: deve ter formato de URL");
    } else controle += 1;
    if ((!Number.isInteger(inputQtdPerguntas)) && (inputQtdPerguntas < 3)){   
        alert ("Quantidade de perguntas: no mínimo 3 perguntas");
    } else controle += 1;
    if (inputQtdNiveis < 2) {   
        alert ("Quantidade de níveis: no mínimo 2 níveis");
    } else controle += 1;
    
    if (controle == 4){
        telaCriarPerguntas(inputQtdPerguntas);
    } 

    return qtdNiveis = inputQtdNiveis;
}

function telaCriarPerguntas(qtdPerguntas){
   // AQUI ESTAMOS INDO PARA A PAGINA DE DEFINICAO DAS PERGUNTAS.
    const sectionCriaQuizz = document.querySelector('.sectionCriarQuizz');
    sectionCriaQuizz.classList.add('escondido');

    const perguntas = document.querySelector('.sectionCriarQuizz2');
    perguntas.classList.remove('escondido');

    perguntas.innerHTML += `<h4>Crie as suas perguntas</h4>`

    for(let i=0; i < qtdPerguntas; i++){

            perguntas.innerHTML += `
            <div class="secao3-container">
                    
                <div class="perguntasCreate">
                    
                    <div class="perguntaMinimizada" id="${i+1}">
                        <h4>Pergunta ${i+1}</h4>
                        <ion-icon onclick='expandirPergunta(${i+1})' name="create-outline"></ion-icon>
                    </div>

                    <section class="inputsPerguntas escondido">
                        <input class="inputCriacaoPerguntas" type="text" id="textoPergunta${i+1}" placeholder="Texto da pergunta">
                        <input class="inputCriacaoPerguntas" type="text" id="cordeFundo${i+1}" placeholder="Cor de fundo da pergunta">
                        
                        <h4>Resposta Correta</h4>
                        <input class="inputCriacaoPerguntas" type="text" id="respostaCorreta${i+1}" placeholder="Resposta Correta">
                        <input class="inputCriacaoPerguntas" type="url" id="urlImagem${i+1}" placeholder="URL da imagem">

                        <h4>Respostas Incorretas</h4>
                        <input class="inputCriacaoPerguntas" type="text" id="incorretaA${i+1}" placeholder="Resposta Incorreta 1">
                        <input class="inputCriacaoPerguntas" type="url" id="urlIncorretaA${i+1}" placeholder="URL da imagem 1">
                        
                        <input class="inputCriacaoPerguntas" type="text" id="incorretaB${i+1}" placeholder="Resposta Incorreta 2">
                        <input class="inputCriacaoPerguntas" type="url" id="urlIncorretaB${i+1}" placeholder="URL da imagem 2">
                        
                        <input class="inputCriacaoPerguntas" type="text" id="incorretaC${i+1}" placeholder="Resposta Incorreta 3">
                        <input class="inputCriacaoPerguntas" type="url" id="urlIncorretaC${i+1}" placeholder="URL da imagem 3">
                    </section>
                       
                </div>
            </div>`
    }

        perguntas.innerHTML += `<button class="btn-criarquizz" onclick="validandoPerguntas(${qtdPerguntas})">Prosseguir para criar Níveis</button>
        <h7 onclick="voltaTelaInicial()">VOLTAR A TELA INICIAL QUIZZ</h7>`
        
}
function validandoPerguntas(qtdPerguntas){

    let controleA, controleB, controleC = false;
    let verificaDados = 0;

    for (let i=0;i<qtdPerguntas; i++){
        
        const textoPergunta = document.getElementById(`textoPergunta${i+1}`).value;
        const cordeFundo = document.getElementById(`cordeFundo${i+1}`).value;
        const respostaCorreta = document.getElementById(`respostaCorreta${i+1}`).value;
        const urlImagem = document.getElementById(`urlImagem${i+1}`).value;
    
        // RESPOSTAS INCORRETAS AGORA...
        const respostaIncorreta1 = document.getElementById(`incorretaA${i+1}`).value;
        const urlIncorreta1 = document.getElementById(`urlIncorretaA${i+1}`).value;
    
        const respostaIncorreta2 = document.getElementById(`incorretaB${i+1}`).value;
        const urlIncorreta2 = document.getElementById(`urlIncorretaB${i+1}`).value;
    
        const respostaIncorreta3 = document.getElementById(`incorretaC${i+1}`).value;
        const urlIncorreta3 = document.getElementById(`urlIncorretaC${i+1}`).value;

        if (textoPergunta.length < 20){
            alert(`VOCÊ ESTA COM PROBLEMAS NA PERGUNTA > ${i+1} \n \n
            Por favor entre com o texto de forma correta (MINIMO 20 CARACTERES)`);
        } else verificaDados ++;
        if (cordeFundo.length !== 6){
            alert(`VOCÊ ESTA COM PROBLEMAS NA PERGUNTA > ${i+1} \n \n
           ENTRE COM UM VALOR DE COR VALIDO (LETRAS DE A - F *MAX 6 CARACTERES*)`);
        }else verificaDados ++;
        if (respostaCorreta == ''){
            alert(`VOCÊ ESTA COM PROBLEMAS NA PERGUNTA > ${i+1} \n \n
           ENTRE COM UM VALOR VALIDO PARA O TEXTO DA RESPOSTA...`);
        } else verificaDados ++;
         if (!urlImagem.match(regex)){   
            alert(`VOCÊ ESTA COM PROBLEMAS NA PERGUNTA > ${i+1} \n \n
            Por favor entre com um valor valido de URL de IMAGEM...`);
        }else verificaDados ++;

        //iniciando o teste boleano.
        if(respostaIncorreta1.length > 0) {
            controleA = true;  
        }
        if (controleA){
            if (!urlIncorreta1.match(regex)){   
                alert(`VOCÊ ESTA COM PROBLEMAS NA URL DA RESPOSTA ERRADA > ${i+1} \n \n
                Por favor entre com um valor valido de URL de IMAGEM...`);
            }
        } 
        if(respostaIncorreta2.length > 0) {
            controleB = true;  
        }
        if (controleB){
            if (!urlIncorreta2.match(regex)){   
                alert(`VOCÊ ESTA COM PROBLEMAS NA URL DA RESPOSTA ERRADA > ${i+2} \n \n
                Por favor entre com um valor valido de URL de IMAGEM...`);
            }
        }
        if(respostaIncorreta3.length > 0) {
            controleC = true;  
        }
        if (controleC){
            if (!urlIncorreta3.match(regex)){   
                alert(`VOCÊ ESTA COM PROBLEMAS NA URL DA RESPOSTA ERRADA > ${i+3} \n \n
                Por favor entre com um valor valido de URL de IMAGEM...`);
            }
        }

        if (((controleA) || (controleB) || (controleC)) && verificaDados == qtdPerguntas*4){
            console.log('Parabens passou tem todas as etapas, agora vou chamar os niveis para preenchimento.')
            decidindoNiveis(controleA);
        }

}
 


}

function decidindoNiveis(){
    // AQUI ESTAMOS INDO PARA A PAGINA DE DEFINICAO DOS NIVEIS.
     
     const sectionCriaQuizz = document.querySelector('.sectionCriarQuizz');
     sectionCriaQuizz.innerHTML = ' ';
     sectionCriaQuizz.classList.remove('escondido');
 
     const perguntas = document.querySelector('.sectionCriarQuizz2');
     perguntas.classList.add('escondido');
 
     sectionCriaQuizz.innerHTML += `<h4>Agora, decida os seus níveis!</h4>`
      
     for(let i=0; i < qtdNiveis; i++){
 
        sectionCriaQuizz.innerHTML += `
             <div class="secao3-container">
                     
                 <div class="perguntasCreate">
                     
                     <div class="perguntaMinimizada" id="${i+1}">
                         <h4>Nivel ${i+1}</h4>
                         <ion-icon onclick='expandirPergunta(${i+1})' name="create-outline"></ion-icon>
                     </div>
 
                     <section class="inputsPerguntas escondido">
                         <input class="inputCriacaoPerguntas" id="tituloNivel${i+1}" type="text" placeholder="Titulo do nivel">
                         <input class="inputCriacaoPerguntas" type="number" id="acertoMin${i+1}" placeholder="% de acerto minima">
                         <input class="inputCriacaoPerguntas" type="text" id="urlNivel${i+1}" placeholder="URL da imagem do nível">
                         <input class="inputDescription" type="text" id="descricaoNivel${i+1}" placeholder="Descrição do nível">
                        
                     </section>
                        
                 </div>
             </div>`
     }
 
     sectionCriaQuizz.innerHTML += `<button class="btn-criarquizz" onclick="enviarQuizz()">Finalizar envio do QUIZ</button>
     <h7 onclick="voltaTelaInicial()">CANCELAR ENVIO DO QUIZZ</h7>`
         
 }

 function enviarQuizz(){

    let contador = 0;
    let controleAcertoMin = false;

    for(let i=0; i < qtdNiveis; i++){
    
        const tituloNivel = document.getElementById(`tituloNivel${i+1}`).value;
        const acertoMin = document.getElementById(`acertoMin${i+1}`).value;
        const urlNivel = document.getElementById(`urlNivel${i+1}`).value;
        const descricaoNivel = document.getElementById(`descricaoNivel${i+1}`).value;
       
    
        if (tituloNivel.length < 10){
            alert(`VOCÊ ESTA COM PROBLEMAS NO NIVEL > ${i+1} \n \nPor favor o titulo do nivel tem que ter no minimo 10 caracteres...`);
        } else contador ++; 
        if ((!Number.isInteger(acertoMin)) && (acertoMin > 100)){
           
            alert(`VOCÊ ESTA COM PROBLEMAS NO NIVEL > ${i+1} \n \n
            Por favor insira os dados corretamente [ 0 A 100 ]`);

        } else if (acertoMin == 0){
            controleAcertoMin = true;
            contador ++
        } else contador ++;
        if (!urlNivel.match(regex)){   
            alert(`VOCÊ ESTA COM PROBLEMAS NO NIVEL > ${i+1} \n\n
            URL da Imagem: deve ter formato de URL`);
        } else contador ++;
        if (descricaoNivel.length < 30){
            alert(`VOCÊ ESTA COM PROBLEMAS NO NIVEL > ${i+1} \n \n
            Por favor a descrição precisa ter no minimo 30 caracteres preencha de maneira correta.`);
        }else contador ++;
        
       
    } // final do for
   
    if ((contador == qtdNiveis*4) && (controleAcertoMin == true)){ //verificando se existe pelo menos 1 nivel que tenha o 0%;
        console.log('Conseguiu com sucesso');
        quizzFinalizado(contador);
    } else {
        alert('Por favor você precisa colocar pelo menos um nivel com o valor de Acerto minimo 0%.');
    }

}// fim da funcao envia quizz

function quizzFinalizado(){
    const sectionCriaQuizz = document.querySelector('.sectionCriarQuizz');
    sectionCriaQuizz.classList.add('escondido');

    const perguntas = document.querySelector('.sectionCriarQuizz2');
    perguntas.innerHTML = '';
    perguntas.classList.remove('escondido');

    perguntas.innerHTML = `<h7> PARABENS VC CONSEGUIU COM SUCESSO BOLODINHO.`




}


function expandirPergunta(id){
    //aqui estamos expandindo as perguntas
    const iconeClicado = document.getElementById(id).nextElementSibling;
    iconeClicado.classList.toggle('escondido');
}

function clicarResposta (elemento, condicional) {
   let elementoPai = elemento.parentNode;
    elementosFilhos = elementoPai.childNodes;
    console.log(elementosFilhos);

    for(let i = 3; i < elementosFilhos.length; i = i + 2){
        console.log(i);
        elementosFilhos[i].classList.add("esbranquicado"); 
    }
    
    if(condicional === true) {
    elemento.classList.add("correto");
    elemento.classList.add("opaco");
    } else if (condicional === false) {
        elemento.classList.add("errado");
        elemento.classList.add("opaco");
    }
    


}
