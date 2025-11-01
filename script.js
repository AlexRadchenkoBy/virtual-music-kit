const newDiv = document.createElement("div");

newDiv.className = "class-div";
newDiv.id = "div-id";

document.body.appendChild(newDiv);

const keyA = document.createElement('button');
keyA.textContent = 'A';
keyA.className = 'button';
keyA.setAttribute('data-note', 'C4');
keyA.setAttribute('data-key', 'keyA');
newDiv.appendChild(keyA);

const keyS = document.createElement('button');
keyS.textContent = 'S';
keyS.className = 'button';
keyS.setAttribute('data-note', 'D4');
keyS.setAttribute('data-key', 'keyS')
newDiv.appendChild(keyS);

const keyD = document.createElement('button');
keyD.textContent = 'D';
keyD.className = 'button';
keyD.setAttribute('data-note', 'E4');
keyD.setAttribute('data-key', 'keyD');
newDiv.appendChild(keyD);

const keyF = document.createElement('button');
keyF.textContent = 'F';
keyF.className = 'button';
keyF.setAttribute('data-note', 'F4');
keyF.setAttribute('data-key', 'keyF');
newDiv.appendChild(keyF);

const keyG = document.createElement('button');
keyG.textContent = 'G';
keyG.className = 'button';
keyG.setAttribute('data-note', 'G4');
keyG.setAttribute('data-key', 'keyG');;
newDiv.appendChild(keyG);

const keyH = document.createElement('button');
keyH.textContent = 'H';
keyH.className = 'button';
keyH.setAttribute('data-note', 'A4');
keyH.setAttribute('data-key', 'keyH');
newDiv.appendChild(keyH);

const keyJ = document.createElement('button');
keyJ.textContent = 'J';
keyJ.className = 'button';
keyJ.setAttribute('data-note', 'B4');
keyJ.setAttribute('data-key', 'keyJ');
newDiv.appendChild(keyJ);

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const oscillators = {};


const keyToNoteMap = {
    'KeyA': 'C4',
    'KeyS': 'D4',
    'KeyD': 'E4',
    'KeyF': 'F4',
    'KeyG': 'G4',
    'KeyH': 'A4',
    'KeyJ': 'B4',
};

const keys = document.querySelectorAll('.button');

function playNote(note) {
    const frequency = getFrequency(note);
    if (oscillators[note]) {
        return;
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

    oscillator.start(audioContext.currentTime);
    oscillators[note] = oscillator;
}

function stopNote(note) {
    if (!oscillators[note]) {
        return;
    }
    oscillators[note].stop(audioContext.currentTime + 0.1);
    delete oscillators[note];
}

function getFrequency(note) {
    const frequencies = {
      'C4': 261.63,
      'D4': 293.66,
      'E4': 329.63,
      'F4': 349.23,
      'G4': 392.00,
      'A4': 440.00,
      'B4': 493.88
    };
    return frequencies[note];
}