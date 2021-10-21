// Quering The Dom
const input = document.querySelector('.eq');
const output = document.querySelector('.output');
const numPad = document.querySelector('.num');
const sciencePad = document.querySelector('.science');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');

// Helping Varibles
let arr;

// Number Pad Functionalty
numPad.addEventListener('click', e => {
    // Numbers
    if (e.target.classList.contains('num-key')) {
        input.textContent += e.target.textContent;
        arr = input.textContent.split('');
    }
    
    // Math Operators
    if (e.target.classList.contains('op') && e.target.dataset.operator) {
        input.textContent += e.target.dataset.operator;
        arr = input.textContent.split('');
    }
    if (e.target.parentElement.classList.contains('op') && e.target.parentElement.dataset.operator) {
        input.textContent += e.target.parentElement.dataset.operator;
        arr = input.textContent.split('');
    }

    // Check Focus State
    if (!e.target.classList.contains('equal')) {
        focusState();
    }
});

// Science Pad
sciencePad.addEventListener('click', e => {
    if (e.target.dataset.change) {
        input.textContent += e.target.dataset.change;
        arr = input.textContent.split('');
        focusState();
    }
});

// Setting Screen Classes
function focusState() {
    input.classList.add('focus');
    output.textContent = '';
}

// Backspace Function
backspace.addEventListener('click', () => {
    if (arr && arr.length > 0) {
        arr.length -= 1;
        input.textContent = arr.join('');
    }
});

// Clear Function
clear.addEventListener('click', () => input.textContent = '');

// Equal Function
equal.addEventListener('click', () => {
    // Main Input
    let eq = input.textContent;

    // Check The Value To Calculate
    if (eq.includes('sin(')) {
        eq = eq.replace(/sin\(/g, 'Math.sin(');
    }
    if (eq.includes('cos(')) {
        eq = eq.replace(/cos\(/g, 'Math.cos(');
    }
    if (eq.includes('tan(')) {
        eq = eq.replace(/tan\(/g, 'Math.tan(');
    }
    if (eq.includes('log(')) {
        eq = eq.replace(/log\(/g, 'Math.log(');
    }
    if (eq.includes('^')) {
        eq = eq.replace(/\^/g, '**');
    }
    if (eq.includes('π')) {
        eq = eq.replace(/π/g, Math.PI);
    }

    // Try & Catch
    try {
        if (eval(eq).toString().length > 7) {
            output.textContent = eval(eq).toFixed(6);
        } else output.textContent = eval(eq);
    } catch (err) {
        output.textContent = 'Error';
    }
    
    // Class Focus State
    input.classList.remove('focus');
});