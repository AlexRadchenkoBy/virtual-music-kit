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
keyF.setAttribute('data-note', 'G4');
keyF.setAttribute('data-key', 'keyG');;
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
keyF.setAttribute('data-note', 'B4');
keyF.setAttribute('data-key', 'keyG');
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
    
    console.log(`Играет нота: ${note}`);
    
}