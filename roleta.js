let botaoEl = document.querySelector('#jogar');
let botaoVerificaEl = document.querySelector('#verificar');
let pontosEl = document.querySelector('#pontos');
let pontos = 0;

let botoesAssunto = document.querySelectorAll('.assunto');
let assuntoGeral = 'arcadismo';
let perguntas = null;
for(let assuntoEl of botoesAssunto)
{
  assuntoEl.addEventListener('click', function(event)
  {
    assuntoGeral = event.currentTarget.id;
    document.querySelector('.botao-pressionado').classList.remove('botao-pressionado')
    event.currentTarget.classList.add('botao-pressionado')
  })
}


fetch('perguntas.json')
  .then(r => r.json())
  .then(perguntasRecebidas);

function sorteiaPergunta()
{
  //poe a roleta para girar
  let roletaEl = document.querySelector('#roleta');
  roletaEl.classList.add('girando');

  // espera o tempo da roleta girar... quando ela termina, sorteia uma pergunta
  // e a coloca no DOM
  setTimeout(function() {
    // faz a roleta parar de girar
    roletaEl.classList.remove('girando');

    // sorteia a pergunta e a remove do vetor de perguntas sobre aquele assunto (geral)
    let indicePerguntaSorteada = Math.floor(Math.random() * perguntas[assuntoGeral].length);
    let perguntaSorteada = perguntas[assuntoGeral][indicePerguntaSorteada];
    perguntas[assuntoGeral].splice(indicePerguntaSorteada, 1);

    // coloca a pergunta sorteada no DOM (enunciado e opções)
    let enunciadoEl = document.querySelector('#enunciado')
    enunciadoEl.innerHTML = perguntaSorteada.enunciado;
    let opcoes = document.querySelectorAll('[name="questao"]');
    for(let i = 0; i < opcoes.length; i++)
    {
      let opcaoEl = opcoes[i];
      let labelEl = opcaoEl.nextElementSibling;
      labelEl.innerHTML = perguntaSorteada.opcoes[i];
      opcaoEl.value = 0;
    }
    opcoes[perguntaSorteada.correta].value = 1;
  }, 3000)

}

function perguntasRecebidas(p)
{
  perguntas = p;
  botaoEl.addEventListener('click', sorteiaPergunta);
  botaoVerificaEl.addEventListener('click', verificaResposta);
}

function verificaResposta()
{
  let opcaoClicada = document.querySelector('[name="questao"]:checked');
  if(opcaoClicada != null)
  {
    if(opcaoClicada.value == 1)
    {
      pontos++
      event.currentTarget.remove();
      pontosEl.innerHTML = pontos + "/10";
      alert('Você acertou a questão! Irra! :)');
    }
    else {
      {
        event.currentTarget.remove();
        pontosEl.innerHTML = pontos + "/10";
        alert('Que pena, você errou a questão! :(');
      }
    }
  }

  if (perguntas[assuntoGeral].length === 1) {
    atualizaPontuacao('balada', pontuacao);
    location.href = 'finalizou.html';;
    document.querySelector('#' + assuntoGeral).disabled = true;
  }
  localStorage.setItem('pontos', JSON.stringify(pontos));
}
