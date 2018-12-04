const pontos = JSON.parse(localStorage.getItem('pontos'));

document.querySelector('.pontuacao').innerHTML = pontos;
