const foco = 30;
const descanso = 10;
const descansoLongo = 20;

let min; 
let seg;
let tempo;
let interval;
let i = 0;

function diminuirOTempo () {
  
  if(tempo > 0){
    document.getElementById('start').disabled = true;
    tempo = tempo -1;
    imprimeTempo(tempo);
  }else {

    if(i % 2 === 0 && i < 7) {
      clearInterval(interval);
      document.getElementById('start').disabled = false;
      tocarAlarmeFoco();
      document.getElementById("titulo__principal").innerHTML= "Vamos Focar ?";


    } else if(i % 2 === 1 && i < 7) {
      clearInterval(interval);
      document.getElementById('start').disabled = false;
      tocarAlarmeDescanso();
      document.getElementById("titulo__principal").innerHTML= "Vamos Descansar ?";
    } else {
      document.getElementById('start').disabled = true;
    }

  };

};

function start (tempoRecebido) {
  tempo = tempoRecebido;
  interval = setInterval(() => diminuirOTempo(), 1000);
  
};

function imprimeTempo(tempo) {

  if((tempo -1) >= -1) {

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
  };
};

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

document.getElementById('start').addEventListener('click', () => {

  if(i % 2 === 0 && i < 7) {
    console.log(i , " foco");
    start(foco);
    i++;
  } else if(i % 2 === 1 && i < 7) {
    start(descanso);
    console.log(i , " Descanso");
    i++;
  } else {
    start(descansoLongo);
    console.log(i , " descanso Longo");
    document.getElementById('start').disabled = true;
  }

});

document.getElementById('alarme').addEventListener('click', () => {
  pararAlarme();
  console.log('o alarme parou!')

});

