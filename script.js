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

function activateButton(note) {
    const button = document.querySelector(`[data-note="${note}"]`);
    if (button) {
        button.classList.add('active');
        button.classList.remove('hover');
    }
}

function deactivateButton(note) {
    const button = document.querySelector(`[data-note="${note}"]`);
    if (button) {
        button.classList.remove('active');
    }
}

function addHoverEffect(button) {
    button.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('hover');
        }
    });
    
    button.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });
}

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

     activateButton(note);
}

function stopNote(note) {
    if (!oscillators[note]) {
        return;
    }
    oscillators[note].stop(audioContext.currentTime + 0.1);
    delete oscillators[note];

    deactivateButton(note);
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

keyA.addEventListener('mousedown', function() {
    playNote('C4');
});

keyA.addEventListener('mouseup', function() {
    stopNote('C4');
});

keyS.addEventListener('mousedown', function() {
    playNote('D4');
});

keyS.addEventListener('mouseup', function() {
    stopNote('D4');
});

keyD.addEventListener('mousedown', function() {
    playNote('E4');
});

keyD.addEventListener('mouseup', function() {
    stopNote('E4');
});

keyF.addEventListener('mousedown', function() {
    playNote('F4');
});

keyF.addEventListener('mouseup', function() {
    stopNote('F4');
});

keyG.addEventListener('mousedown', function() {
    playNote('G4');
});

keyG.addEventListener('mouseup', function() {
    stopNote('G4');
});

keyH.addEventListener('mousedown', function() {
    playNote('A4');
});

keyH.addEventListener('mouseup', function() {
    stopNote('A4');
});

keyJ.addEventListener('mousedown', function() {
    playNote('B4');
});

keyJ.addEventListener('mouseup', function() {
    stopNote('B4');
});

keys.forEach(addHoverEffect);

document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyA') {
        playNote('C4');
    }
    if (event.code === 'KeyS') {
        playNote('D4');
    }
    if (event.code === 'KeyD') {
        playNote('E4');
    }
    if (event.code === 'KeyF') {
        playNote('F4');
    }
    if (event.code === 'KeyG') {
        playNote('G4');
    }
    if (event.code === 'KeyH') {
        playNote('A4');
    }
    if (event.code === 'KeyJ') {
        playNote('B4');
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyA') {
        stopNote('C4');
    }
    if (event.code === 'KeyS') {
        stopNote('D4');
    }
    if (event.code === 'KeyD') {
        stopNote('E4');
    }
    if (event.code === 'KeyF') {
        stopNote('F4');
    }
    if (event.code === 'KeyG') {
        stopNote('G4');
    }
    if (event.code === 'KeyH') {
        stopNote('A4');
    }
    if (event.code === 'KeyJ') {
        stopNote('B4');
    }
});

