function atualizaPontuacao(fase, pontuacao) {
  const pontuacaoSalvaNoLocalStorage = JSON.parse(localStorage.getItem('pontuacao')) || {};
  let pontuacaoNessaFase = pontuacaoSalvaNoLocalStorage[fase] || 0;

  if (pontuacao > pontuacaoNessaFase) {
    pontuacaoNessaFase = pontuacao;
  }

  pontuacaoSalvaNoLocalStorage[fase] = pontuacaoNessaFase;

  localStorage.setItem('pontuacao', JSON.stringify(pontuacaoSalvaNoLocalStorage));
}
