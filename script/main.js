// Variáveis

let foco = 30;
let descanso = 10;
let descansoLongo = 20;
const totalCiclos = 7;

const botaoStart = document.getElementById('start');
const botaoPause = document.getElementById('pause');
const botaoRetornar = document.getElementById('resume');
const botaoResetar = document.getElementById('reset');
const botaoAlarme = document.getElementById('alarme');

let min;
let seg;
let tempo;
let interval;
let i = 0;
let cicloAtual = 0;
let isPaused = false;
let tempoInicial;
let alarmeTocado = false;

//parâmetros iniciais

botaoPause.disabled = true;
botaoRetornar.disabled = true;


// Funções


function diminuirOTempo() {
  if (tempo > 0 && !isPaused) {
    botaoStart.disabled = true;
    botaoPause.disabled = false;
    tempo = tempo - 1;
    imprimeTempo(tempo);
  } else {
    if (i % 2 === 0 && i < totalCiclos) {
      clearInterval(interval);
      botaoStart.disabled = false;
      botaoPause.disabled = true;
      tocarAlarmeFoco();
      document.getElementById("titulo__principal").innerHTML = "Vamos Focar ?";
    } else if (i % 2 === 1 && i < totalCiclos) {
      clearInterval(interval);
      botaoStart.disabled = false;
      botaoPause.disabled = true;
      tocarAlarmeDescanso();
      document.getElementById("titulo__principal").innerHTML = "Vamos Descansar ?";
    } else if (i === totalCiclos) {
      clearInterval(interval);
      botaoStart.disabled = true;
      botaoPause.disabled = false;
      tocarAlarmeDescanso();
      document.getElementById("titulo__principal").innerHTML = "Descanso Longo!";
    }
  }
}

function start(tempoRecebido) {
  tempo = tempoRecebido;
  tempoInicial = tempoRecebido;
  interval = setInterval(() => diminuirOTempo(), 1000);
}

function imprimeTempo(tempo) {
  if (tempo - 1 >= -1) {
    min = parseInt(tempo / 60);
    seg = parseInt(tempo % 60);

    if (min < 10) {
      min = "0" + min;
      min = min.substr(0, 2);
    }

    if (seg <= 9) {
      seg = "0" + seg;
    }
    document.getElementById("minutes").innerText = min;
    document.getElementById("seconds").innerText = seg;
  }
}

function tocarAlarmeFoco() {
  let audio = document.getElementById('alarme__foco');
  document.getElementById('alarme').style.display = 'flex';
  audio.play();
}

function tocarAlarmeDescanso() {
  let audio = document.getElementById('alarme__descanso');
  document.getElementById('alarme').style.display = 'flex';
  audio.play();
}

function pararAlarme() {
  let audios = document.getElementsByTagName('audio');
  for (let i = 0; i < audios.length; i++) {
    audios[i].pause();
    audios[i].currentTime = 0;
    document.getElementById('alarme').style.display = 'none';
  }
}

function pausarRelogio() {
  isPaused = true;
  clearInterval(interval);
  botaoPause.disabled = true;
  botaoRetornar.disabled = false;
}

function retornarRelogio() {
  isPaused = false;
  interval = setInterval(() => diminuirOTempo(), 1000);
  botaoRetornar.disabled = true;
}

// Botões

botaoStart.addEventListener('click', () => {
  botaoStart.disabled = true;
  if (i % 2 === 0 && i < totalCiclos) {
    console.log(i, " foco");
    start(foco);
    botaoPause.disabled = false;
    i++;
  } else if (i % 2 === 1 && i < totalCiclos) {
    start(descanso);
    botaoPause.disabled = false;
    console.log(i, " Descanso");
    i++;
  } else if (i === totalCiclos) {
    start(descansoLongo);
    botaoStart.disabled = true;
    console.log(i, " descanso Longo");
  }
});

botaoAlarme.addEventListener('click', () => {
  pararAlarme();
  console.log('O alarme parou!');
});

botaoPause.addEventListener('click', () => {
  pausarRelogio();
});

botaoRetornar.addEventListener('click', () => {
  retornarRelogio();
});

// botaoResetar.addEventListener('click', () => {
//   resetarRelogio();
// });
