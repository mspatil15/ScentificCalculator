// Calculator State Variables
let currentInput = '0';
let previousInput = '';
let operator = '';
let waitingForNewNumber = false;
let angleMode = 'deg'; // 'deg' or 'rad'
let history = '';

// DOM Elements
const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

// Display Management
function updateDisplay() {
    display.textContent = currentInput;
    display.classList.remove('error');
}

function updateHistory() {
    historyDisplay.textContent = history;
}

// Number Input
function inputNumber(num) {
    if (waitingForNewNumber) {
        currentInput = num;
        waitingForNewNumber = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

// Operator Input
function inputOperator(op) {
    if (operator && !waitingForNewNumber) {
        calculate();
    }
    
    previousInput = currentInput;
    operator = op;
    waitingForNewNumber = true;
    history = `${previousInput} ${op}`;
    updateHistory();
}

// Scientific Functions
function inputFunction(func) {
    try {
        let result;
        const value = parseFloat(currentInput);
        
        switch(func) {
            case 'sin':
                result = Math.sin(angleMode === 'deg' ? degToRad(value) : value);
                break;
            case 'cos':
                result = Math.cos(angleMode === 'deg' ? degToRad(value) : value);
                break;
            case 'tan':
                result = Math.tan(angleMode === 'deg' ? degToRad(value) : value);
                break;
            case 'log':
                result = Math.log(value);
                break;
            case 'log10':
                result = Math.log10(value);
                break;
            case 'sqrt':
                result = Math.sqrt(value);
                break;
            case 'cbrt':
                result = Math.cbrt(value);
                break;
            case 'factorial':
                result = factorial(Math.floor(value));
                break;
            case 'Math.PI':
                result = Math.PI;
                break;
            case 'Math.E':
                result = Math.E;
                break;
            default:
                return;
        }
        
        validateResult(result);
        currentInput = formatResult(result);
        waitingForNewNumber = true;
        history = `${func}(${value})`;
        updateHistory();
        updateDisplay();
    } catch (error) {
        displayError();
    }
}

// Mathematical Helper Functions
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function factorial(n) {
    if (n < 0) throw new Error('Invalid input for factorial');
    if (n === 0 || n === 1) return 1;
    if (n > 170) throw new Error('Number too large for factorial');
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function validateResult(result) {
    if (isNaN(result) || !isFinite(result)) {
        throw new Error('Invalid operation');
    }
}

// Special Operations
function reciprocal() {
    try {
        const value = parseFloat(currentInput);
        if (value === 0) throw new Error('Division by zero');
        
        const result = 1 / value;
        validateResult(result);
        currentInput = formatResult(result);
        waitingForNewNumber = true;
        history = `1/${value}`;
        updateHistory();
        updateDisplay();
    } catch (error) {
        displayError();
    }
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = currentInput.startsWith('-') 
            ? currentInput.substring(1) 
            : '-' + currentInput;
        updateDisplay();
    }
}

// Main Calculator Function
function calculate() {
    if (operator && previousInput !== '' && !waitingForNewNumber) {
        try {
            const prev = parseFloat(previousInput);
            const curr = parseFloat(currentInput);
            let result;

            switch (operator) {
                case '+':
                    result = prev + curr;
                    break;
                case '-':
                    result = prev - curr;
                    break;
                case '*':
                    result = prev * curr;
                    break;
                case '/':
                    if (curr === 0) throw new Error('Division by zero');
                    result = prev / curr;
                    break;
                case '%':
                    result = prev % curr;
                    break;
                case '^':
                    result = Math.pow(prev, curr);
                    break;
                default:
                    return;
            }

            validateResult(result);
            history = `${previousInput} ${operator} ${currentInput} =`;
            currentInput = formatResult(result);
            operator = '';
            previousInput = '';
            waitingForNewNumber = true;
            updateHistory();
            updateDisplay();
        } catch (error) {
            displayError();
        }
    }
}

// Utility Functions
function formatResult(result) {
    // Handle very large or very small numbers
    if (Math.abs(result) > 1e15 || (Math.abs(result) < 1e-10 && result !== 0)) {
        return result.toExponential(8);
    }
    
    // Round to prevent floating point errors
    const rounded = Math.round(result * 1e10) / 1e10;
    return rounded.toString();
}

// Clear Functions
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    waitingForNewNumber = false;
    history = '';
    updateDisplay();
    updateHistory();
}

function clearEntry() {
    currentInput = '0';
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Mode Toggle
function toggleMode(mode) {
    angleMode = mode;
    document.getElementById('degBtn').classList.toggle('active', mode === 'deg');
    document.getElementById('radBtn').classList.toggle('active', mode === 'rad');
}

// Error Handling
function displayError() {
    currentInput = 'Error';
    display.classList.add('error');
    display.textContent = currentInput;
    waitingForNewNumber = true;
    operator = '';
    previousInput = '';
    history = '';
    updateHistory();
    
    // Clear error after 2 seconds
    setTimeout(() => {
        if (currentInput === 'Error') {
            clearAll();
        }
    }, 2000);
}

// Keyboard Event Handler
function handleKeyboardInput(event) {
    const key = event.key;
    
    // Prevent default for specific keys
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
    }
    
    // Number keys
    if (key >= '0' && key <= '9') {
        inputNumber(key);
    }
    // Decimal point
    else if (key === '.') {
        if (!currentInput.includes('.')) {
            inputNumber('.');
        }
    }
    // Basic operators
    else if (['+', '-', '*', '/'].includes(key)) {
        inputOperator(key);
    }
    // Equals
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    // Clear operations
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearAll();
    }
    else if (key === 'Backspace') {
        backspace();
    }
    // Modulo
    else if (key === '%') {
        inputOperator('%');
    }
    // Power (using ^ key)
    else if (key === '^') {
        inputOperator('^');
    }
}

// Event Listeners
document.addEventListener('keydown', handleKeyboardInput);

// Initialize Calculator
function initializeCalculator() {
    updateDisplay();
    updateHistory();
    
    // Set focus to calculator for immediate keyboard input
    document.querySelector('.calculator').setAttribute('tabindex', '0');
    document.querySelector('.calculator').focus();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCalculator);

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        inputNumber,
        inputOperator,
        inputFunction,
        calculate,
        clearAll,
        clearEntry,
        backspace,
        toggleMode,
        reciprocal,
        toggleSign
    };
}