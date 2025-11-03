const newDiv = document.createElement("div");
newDiv.className = "class-div";
newDiv.id = "div-id";
document.body.appendChild(newDiv);

const editContainer = document.createElement('div');
editContainer.className = 'edit-container';
editContainer.style.display = 'none';
document.body.appendChild(editContainer);

const editInput = document.createElement("input");
editInput.type = "text";
editInput.className = "edit-input";
editInput.placeholder = "Press the new key and Enter";
editContainer.appendChild(editInput);

const keyA = document.createElement('button');
keyA.innerHTML = '<span>A</span><div class="edit-icon">✏️</div>';
keyA.className = 'button';
keyA.setAttribute('data-note', 'C4');
keyA.setAttribute('data-key', 'KeyA');
newDiv.appendChild(keyA);

const keyS = document.createElement('button');
keyS.innerHTML = '<span>S</span><div class="edit-icon">✏️</div>';
keyS.className = 'button';
keyS.setAttribute('data-note', 'D4');
keyS.setAttribute('data-key', 'KeyS')
newDiv.appendChild(keyS);

const keyD = document.createElement('button');
keyD.innerHTML = '<span>D</span><div class="edit-icon">✏️</div>';
keyD.className = 'button';
keyD.setAttribute('data-note', 'E4');
keyD.setAttribute('data-key', 'KeyD');
newDiv.appendChild(keyD);

const keyF = document.createElement('button');
keyF.innerHTML = '<span>F</span><div class="edit-icon">✏️</div>';
keyF.className = 'button';
keyF.setAttribute('data-note', 'F4');
keyF.setAttribute('data-key', 'KeyF');
newDiv.appendChild(keyF);

const keyG = document.createElement('button');
keyG.innerHTML = '<span>G</span><div class="edit-icon">✏️</div>';
keyG.className = 'button';
keyG.setAttribute('data-note', 'G4');
keyG.setAttribute('data-key', 'KeyG');;
newDiv.appendChild(keyG);

const keyH = document.createElement('button');
keyH.innerHTML = '<span>H</span><div class="edit-icon">✏️</div>';
keyH.className = 'button';
keyH.setAttribute('data-note', 'A4');
keyH.setAttribute('data-key', 'KeyH');
newDiv.appendChild(keyH);

const keyJ = document.createElement('button');
keyJ.innerHTML = '<span>J</span><div class="edit-icon">✏️</div>';
keyJ.className = 'button';
keyJ.setAttribute('data-note', 'B4');
keyJ.setAttribute('data-key', 'KeyJ');
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

const noteToKeyMap = {
    'C4': 'KeyA',
    'D4': 'KeyS',
    'E4': 'KeyD',
    'F4': 'KeyF',
    'G4': 'KeyG',
    'A4': 'KeyH',
    'B4': 'KeyJ'
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

let currentEditingNote = null;

function showEditInput(note, buttonElement) {
    currentEditingNote = note;
    const rect = buttonElement.getBoundingClientRect();

    editContainer.style.display = 'block';
    editContainer.style.position = 'absolute';
    editContainer.style.left = (window.innerWidth/2 - 125) + 'px';
    editContainer.style.top = (rect.bottom + 20) + 'px';
    editInput.value = '';
    editInput.focus();
    
    const currentKey = noteToKeyMap[note];
    const keyDisplay = currentKey.replace('Key', '');
    editInput.placeholder = `Current: ${keyDisplay}. press the new key`;
}

function hideEditInput() {
    editContainer.style.display = 'none';
    currentEditingNote = null;
}

function updateKeyBinding(note, newKey) {
    if (keyToNoteMap[newKey] && keyToNoteMap[newKey] !== note) {
        alert(`Key "${newKey.replace('Key', '')}" already used for another note!`);
        return false;
    }

    const oldKey = noteToKeyMap[note];
    if (oldKey) {
        delete keyToNoteMap[oldKey];
    }
    
    keyToNoteMap[newKey] = note;
    noteToKeyMap[note] = newKey;
    
    const button = document.querySelector(`[data-note="${note}"]`);
    if (button) {
        button.setAttribute('data-key', newKey);
    }
    
    const displayKey = newKey.replace('Key', '');
    button.querySelector('span').textContent = displayKey;
    
    return true;
}

editInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const newKey = editInput.value.trim().toUpperCase();
        if (newKey && currentEditingNote) {
            const keyCode = 'Key' + newKey;
            if (updateKeyBinding(currentEditingNote, keyCode)) {
                hideEditInput();
            }
        }
    } else if (event.key === 'Escape') {
        event.preventDefault();
        hideEditInput();
    } else {
        if (event.code && event.code.startsWith('Key')) {
            editInput.value = event.code.replace('Key', '');
            event.preventDefault();
        }
    }
});

keyA.addEventListener('mousedown', function() {
    if (editContainer.style.display !== 'block') {
        playNote('C4');
    }
});

keyA.addEventListener('mouseup', function() {
    stopNote('C4');
});

keyS.addEventListener('mousedown', function() {
    if (!editContainer.style.display !== 'block') {
        playNote('D4');
    }
});

keyS.addEventListener('mouseup', function() {
    stopNote('D4');
});

keyD.addEventListener('mousedown', function() {
    if (!editContainer.style.display !== 'block') {
        playNote('E4');
    }
});

keyD.addEventListener('mouseup', function() {
    stopNote('E4');
});

keyF.addEventListener('mousedown', function() {
    if (!editContainer.style.display !== 'block') {
        playNote('F4');
    }
});

keyF.addEventListener('mouseup', function() {
    stopNote('F4');
});

keyG.addEventListener('mousedown', function() {
    if (!editContainer.style.display !== 'block') {
        playNote('G4');
    }
});

keyG.addEventListener('mouseup', function() {
    stopNote('G4');
});

keyH.addEventListener('mousedown', function() {
    if (!editContainer.style.display !== 'block') {
        playNote('A4');
    }
});

keyH.addEventListener('mouseup', function() {
    stopNote('A4');
});

keyJ.addEventListener('mousedown', function() {
    if (!editContainer.style.display !== 'block') {
        playNote('B4');
    }
});

keyJ.addEventListener('mouseup', function() {
    stopNote('B4');
});

keys.forEach(button => {
    const editIcon = button.querySelector('.edit-icon');
    const note = button.getAttribute('data-note');
    
    editIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        showEditInput(note, button);
    });
});

keys.forEach(addHoverEffect);

document.addEventListener('keydown', function(event) {
    if (editContainer.style.display === 'block') {
        return;
    }
    const note = keyToNoteMap[event.code];
    if (note && !oscillators[note]) {
        playNote(note);
    }
});

document.addEventListener('keyup', function(event) {
    if (editContainer.style.display === 'block') {
        return;
    }
    
    const note = keyToNoteMap[event.code];
    if (note) {
        stopNote(note);
    }
});

document.addEventListener('click', function(event) {
    if (!editContainer.contains(event.target) && 
        !event.target.classList.contains('edit-icon') &&
        editContainer.style.display === 'block') {
        hideEditInput();
    }
});

