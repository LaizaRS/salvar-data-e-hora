const botaoEntrada = document.getElementById('entrada');
const botaoIntervalo = document.getElementById('intervalo');
const botaoRetorno = document.getElementById('retorno');
const botaoSaida = document.getElementById('saida');

const entradaP = document.getElementById("entrada-p");
const intervaloP = document.getElementById("intervalo-p");
const retornoP = document.getElementById("retorno-p");
const saidaP = document.getElementById("saida-p");

// Declare a variável tipoEvento como global
let tipoEvento = '';

function formatarDataHora() {
  const dataAtual = new Date();

  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); 
  const ano = dataAtual.getFullYear();
  const horas = String(dataAtual.getHours()).padStart(2, '0');
  const minutos = String(dataAtual.getMinutes()).padStart(2, '0');

  const dataFormatada = `${dia}-${mes}-${ano}`;
  const horaFormatada = `${horas}:${minutos}`;

  return `${dataFormatada} ${horaFormatada}`;
}

const url = 'http://demo3119932.mockable.io/ponto';

mostrarPontoRegistrado(entradaP,'Entrada');
mostrarPontoRegistrado(intervaloP, 'Intervalo');
mostrarPontoRegistrado(retornoP, 'Retorno');
mostrarPontoRegistrado(saidaP, 'Saida');

function mostrarPontoRegistrado(element, tipoEvento) {
  var pontoData = localStorage.getItem('ponto' + tipoEvento);
  pontoData = JSON.parse(pontoData);
  element.textContent = pontoData ? pontoData.data_registro : null;
}

botaoEntrada.addEventListener('click', () => {
  tipoEvento = 'Entrada';
  realizarPost();
 
  entradaP.textContent = formatarDataHora();
});

botaoIntervalo.addEventListener('click', () => {
  tipoEvento = 'Intervalo';
  realizarPost();
  intervaloP.textContent = formatarDataHora();
});

botaoRetorno.addEventListener('click', () => {
  tipoEvento = 'Retorno';
  realizarPost();
  retornoP.textContent = formatarDataHora();
});

botaoSaida.addEventListener('click', () => {
  tipoEvento = 'Saida';
  realizarPost();
  saidaP.textContent = formatarDataHora();
});

function realizarPost() {
  const data = {
    data_registro: formatarDataHora(),
    tipo_evento: tipoEvento,
  };

  localStorage.setItem('ponto' + data.tipo_evento, JSON.stringify(data));

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Ocorreu um erro :', error);
    });
}
