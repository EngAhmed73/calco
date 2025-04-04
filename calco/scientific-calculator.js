// Scientific Calculator Functions
let scientificExpression = '';

function scientificCalc(value) {
    const display = document.getElementById('scientific-display');
    scientificExpression += value;
    display.value = scientificExpression;
}

function calculateScientific() {
    const display = document.getElementById('scientific-display');
    try {
        // Replace mathematical constants and functions
        let expression = scientificExpression
            .replace(/π/g, 'Math.PI')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/√\(/g, 'Math.sqrt(')
            .replace(/\^/g, '**');

        const result = eval(expression);
        display.value = Number.isInteger(result) ? result : result.toFixed(8);
        scientificExpression = display.value;
    } catch (error) {
        display.value = 'Error';
        scientificExpression = '';
    }
}

function clearScientific() {
    const display = document.getElementById('scientific-display');
    scientificExpression = '';
    display.value = '';
}

function backspaceScientific() {
    const display = document.getElementById('scientific-display');
    scientificExpression = scientificExpression.slice(0, -1);
    display.value = scientificExpression;
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Number keys and operators
    if (/[\d+\-*/.()]/.test(key)) {
        scientificCalc(key);
    }
    // Enter key for calculation
    else if (key === 'Enter') {
        calculateScientific();
    }
    // Backspace key
    else if (key === 'Backspace') {
        backspaceScientific();
    }
    // Escape key for clear
    else if (key === 'Escape') {
        clearScientific();
    }
}); 